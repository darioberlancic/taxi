(function(angular) {
  'use strict';

  angular
    .module('app.common')
    .config(function($stateProvider, $urlRouterProvider, stripeProvider) {
      $stateProvider

          .state('routeselect', {
            url: '/routeselect',
            templateUrl: 'app/routeselect/routeselect.html',
            controller: 'RouteSelectController'
          })

      // route to show our basic form (/form)
          .state('form', {
              url: '/form',
              templateUrl: 'app/form.html',
              controller: 'formController'
          })

          // nested states
          // each of these sections will have their own view
          // url will be nested (/form/profile)
          .state('form.transport', {
              url: '/transport',
              templateUrl: 'app/form-transport.html'
          })

          .state('form.route', {
              url: '/route?route',
              templateUrl: 'app/form.html',
              controller: 'formController'
              //
              //controller: function ($scope, $stateParams) {
              //    $scope.routeId = $stateParams.route;
              //}

          })

          // url will be /form/interests
          .state('form.details', {
              url: '/details',
              templateUrl: 'app/form-details.html'
          })

          // Search book by url of the routes
          .state('form.bookByRoutes', {
            url: '/routes/:name',
            templateUrl: 'app/form.searchByRoute.html',
            controller: 'searchByRoute',
            controllerAs: 'vm'
          })

          // url will be /form/interests
          .state('form.summary', {
              url: '/summary',
              templateUrl: 'app/form-summary.html'
          })

          // url will be /form/payment
          .state('form.payment', {
              url: '/payment',
              templateUrl: 'app/form-payment.html'
          })

          // url will be /form/confirmation
          .state('form.confirmation', {
              url: '/confirmation',
              templateUrl: 'app/form-confirmation.html'
          });

      // catch all route
      // send users to the form page
      //$urlRouterProvider.otherwise('/form/transport');

      $urlRouterProvider.otherwise(function ($injector, $location) {
          var searchObject = $location.search().route;
          return '/routeselect';
      });

    });

}(angular));
