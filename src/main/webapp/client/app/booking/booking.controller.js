(function(angular, _) {
  'use strict';

  angular
    .module('app.booking')
    .controller('BookingController', BookingController);

    BookingController.$inject = ['$scope', '$stateParams', 'localStorageService'];
    function BookingController($scope, $stateParams, localStorageService) {

      if (localStorageService.isSupported) {
        var val = localStorageService.get('selectBooking');
        if ($stateParams.o) {
          localStorageService.set('selectedBooking', $stateParams.o);
        }
      }

      var lis1 = $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        console.log('state change started...');
      });

      // Datepicker options...
      $scope.datepickerOptions = {};

      // Selected booking...
      $scope.selectedBooking = localStorageService.get('selectedBooking');

      // Booking data model...
      $scope.booking = {
        flightNo: $scope.selectedBooking.flightNo,
        landingTime: $scope.selectedBooking.landingTime,
        date: '',
        name: '',
        email: '',
        passengers: '',
        surfboards: '',
        requirements: ''
      };

      // Cleanup...
      $scope.$on('$destroy', function() {
        lis1();
      });

    }

}(angular, _));
