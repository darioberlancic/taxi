// create our angular app and inject ngAnimate and ui-router
// =============================================================================

    angular.module('app', [
      'app.common',
      'app.routeselect',
      'app.booking'
    ])

    .run(['GAuth', '$http', 'GData', '$state', '$rootScope', '$window','$location',
        function (GAuth, $http, GData, $state, $rootScope, $window, $location) {

            var session = {url:$location.absUrl()};
            console.log('url='+session.url);
            $http.post(getBase($window) + 'rest/api/session.get', session)
                .then(function (response) {
                    Stripe.setPublishableKey(response.data.stripePublishable);
                });
        }
    ])

    // our controller for the form
    // =============================================================================
    .controller('formController', ['$scope', 'GApi', '$http', '$state', '$window', '$filter', 'stripe', '$timeout', 'dataService',
        function ($scope, GApi, $http, $state, $window, $filter, stripe, $timeout, dataService) {

            $scope.bookingPaid = false;
            $scope.active1 = true;
            $scope.active2 = false;
            $scope.active3 = false;
            $scope.active4 = false;

            $scope.dateStatus = {
                opened: false
            };

            $scope.booking = {
                   flightNo: 'EZ123',
                   email: 'info@xyz.com',
                   date: new Date(),
                   name: 'Peter Hall',
                   // shareWanted: true,
                   landingTime: '12:00 pm',
                   flightNo: 'QX23',
                pax: 1,
                surfboards: 0
            };

            // Available routes
            $scope.availableRoutes = dataService.getBookings();

            $scope.processing = false;
            $scope.asyncStart = null;
            $scope.selectedStart = null;
            $scope.selectedEnd = null;
            $scope.selectedroute = null;

            $scope.onSelectStart = function ($item, $model, $label) {
                $scope.selectedStart = $item.name;
                $scope.selectedStartId = $item.id;

            };

            $scope.onSelectEnd = function ($item, $model, $label) {

                $scope.selectedEndId = $item.id;
                $scope.selectedEnd = $item.name;

                $scope.selectedEndId == undefined ? $scope.errMessage = 'Please select dropoff place': null;
                $scope.selectedStartId == undefined ? $scope.errMessage = 'Please select pickup place': null;

                if ($scope.errMessage){
                  $timeout(function(){
                    $scope.errMessage = null;
                  }, 2000);
                }

                // $scope.selectedEnd = $item.name;
                // $scope.selectedEndId = $item.id;

                $scope.noroutefound = null;
                $scope.result = $scope.availableRoutes.filter(function(route){
                  var condition = false;
                  if (route.startPoint == $scope.selectedStartId && route.endPoint == $scope.selectedEndId){
                    condition = true;
                    route.startroute = $scope.selectedStart;
                    route.endroute = $scope.selectedEnd;
                  }
                  return condition;
                })
                if ($scope.result.length == 0){
                  $scope.noroutefound = 'No route found, sorry. Send an email to dispatch@taxisurfr.com and we will arrange one.';
                  $timeout(function(){
                    $scope.noroutefound = null;
                  }, 4000);
                }
            };

            $scope.addBooking = function (dateText) {
                $scope.booking.dateText = $filter('date')($scope.booking.date, 'fullDate');
                $scope.booking.routeId = $scope.route.data.id;
                $http.post(getBase($window) + 'rest/api/booking', $scope.booking)
                    .then(function (response) {
                        $scope.booking = response;
                    });
            };


            $scope.charge = function () {
                $scope.processing = true;
                $scope.payment = {};
                $scope.payment.card = {
                    number: '4242424242424242',
                    cvc: '123',
                    exp_month: '08',
                    exp_year: '19'
                };
                return stripe.card.createToken($scope.payment.card)
                    .then(function (response) {
                        console.log('token created for card ending in ', response.card.last4);
                        var payment = angular.copy($scope.payment);
                        payment.card = void 0;
                        payment.token = response.id;
                        payment.bookingId = $scope.booking.data.id;
                        // payment.bookingId = 451;
                        return $http.post(getBase($window) + 'rest/api/payment',
                            payment).then(function (response) {
                            $scope.bookingPaid = response.data.ok;

                            if (response.data.ok===true){
                                    console.log('payment succeeded!')
                                $state.go('form.confirmation');
                                }else{
                                    console.log('processing error!')
                                    $scope.paymentError = response.data.error;
                                }
                        });
                    })
                    .catch(function (err) {
                        $scope.processing = true;
                        if (err.type && /^Stripe/.test(err.type)) {
                            console.log('Stripe error: ', err.message);
                        }
                        else {
                            console.log('Other error occurred, possibly with your API', err.message);
                        }
                    });
            };

            // function to process the form

            $scope.processForm = function (status, response) {
                $scope.processing = true;
                if (response.error) {
                    // there was an error. Fix it.
                    $scope.paymentError = response.error.message;
                    $scope.processing = false;
                    throw new Error($scope.paymentError);
                } else {
                    // got stripe token, now charge it or smt
                    $scope.session = {cardToken: response.id, bookingId: $scope.booking.id};
                    GApi.execute('taxisurfr', 'booking.pay', $scope.session)
                        .then(function (response) {
                            $scope.processing = false;
                            $scope.booking = response;
                            if ($scope.booking.status === 'PAID') {
                                $scope.bookingPaid = true;
                                $state.go('form.confirmation');
                            } else {
                                $scope.paymentError = $scope.booking.stripeRefusal;
                            }
                        });
                }
            };

            $scope.onSelect = function ($item, $model, $label) {
                $scope.route = $item;
                $scope.booking.route = $scope.route.id;
                $scope.imgSrc = getBase($window) + 'imageservice?image=' + $scope.route.image;
            };

            $scope.ignoreEnter = function (event) {
                event.preventDefault();
            };

            $scope.addSession = function () {
                return GApi.execute('taxisurfr', 'session.new', {
                    reference: $scope.reference,
                    route: $scope.route,
                    start: $scope.route.start,
                    end: $scope.route.end
                })
                    .then(function (response) {
                        $scope.session = response;
                        $scope.active2 = true;
                    });
            };

            $scope.resetRoute = function () {
                $scope.route = null;
            };


            $scope.addPayment = function () {
                $scope.active4 = true;
            };

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.toggleMin = function () {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.maxDate = new Date(2020, 5, 22);

            $scope.open = function ($event) {
                $scope.status.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.status = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 2);
            $scope.events =
                [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];

            $scope.getDayClass = function (date, mode) {
                $scope.booking.dateText = new Date(date).setHours(0, 0, 0, 0);
            };

            $scope.points = dataService.getPoints();

        }
    ])

    //
    .controller('PaymentCtrl', ['$scope',
        function ($scope) {
            $scope.handleStripe = function (status, response) {
                if (response.error) {
                    // there was an error. Fix it.
                    console.log('error:' + response);
                } else {
                    // got stripe token, now charge it or smt
                    token = response.id;
                    console.log('success:' + token);
                }
            };
        }
    ])
    .controller('searchByRoute', ['$stateParams', 'dataService', function($stateParams, dataService) {
      // Available routes
      this.availableRoutes = dataService.getBookings();
      this.points = dataService.getPoints();

      this.searchByRoute = function(){
        this.result = this.availableRoutes.filter(function(route){
          var condition = false;
          if (route.name == $stateParams.name){
            condition = true;
            for(var i in this.points){
              if (this.points[i].id == route.startPoint){
                route.startroute = this.points[i].name
              }
              if (this.points[i].id == route.endPoint){
                route.endroute = this.points[i].name
              }
            }
          }
          return condition;
        }.bind(this))
      }.bind(this);
      this.searchByRoute();
    }])

    .directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === 'true') {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    )

    .directive('focusOn', function ($timeout) {
        return function (scope, elem, attr) {
            scope.$on(attr.focusOn, function (e) {
                elem[0].focus();
            });
        };
    })
;


function sendError(errorMessage, stackTrace, cause, href) {
    try {
        // use our traceService to generate a stack trace var stackTrace = traceService.print({e: exception});
        // use AJAX (in this example jQuery) and NOT // an angular service such as $http
        jQuery.ajax({
            type: 'POST',
            url: '/taxisurfr/logging',
            contentType: 'application/json',
            data: angular.toJson({
                url: href,
                message: errorMessage,
                type: 'exception',
                stackTrace: stackTrace,
                cause: ( cause || '')
            })
        });
    } catch (loggingError) {
        console.log('Error server-side logging failed');
        console.log(loggingError);
    }
}

var getBase = function (window) {
    console.log(window.location.hostname);
    console.log(window.location.port);
    if (window.location.hostname === 'localhost') {
        //return '//localhost:3000/';
        return 'http://localhost:8080/taxisurfr-1.0/';
        //return 'https://taxigangsurf.appspot.com/';
    } else {

        return 'https://taxisurfr-taxisurfr.rhcloud.com/';
        //return 'https://gobygang.appspot.com/';
    }
};
