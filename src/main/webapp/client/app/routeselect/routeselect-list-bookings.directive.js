(function(angular) {
  'use strict';

  angular
    .module('app.routeselect')
    .directive('listBookings', listBookings);

    listBookings.$inject = [];
    function listBookings() {
      return {
        restrict: 'E',
        templateUrl: 'app/routeselect/routeselect-list-bookings.html',
        replace: true,
        controller: ListBookingsController,
        bindToController: true
      };

      ListBookingsController.$inject = ['$scope', 'dataService'];
      function ListBookingsController($scope, dataService) {
        $scope.$on('routeSelected', function(e, data) {
          console.log('Event: routeSelected', data);
          // Calling data service to retrieve available bookings...
          var bookings = dataService.getBookings(data.startPointId, data.endPointId);

          if (bookings.length < 1) {
            $scope.isBookingsAvailable = false;
          }
          else {
            $scope.isBookingsAvailable = true;
            $scope.bookings = bookings;
          }

          // Setting booking...
          $scope.selectBooking = function(booking) {
            console.log('Booking: ', booking);
            // ...
          };

        });
      }
    }

}(angular));
