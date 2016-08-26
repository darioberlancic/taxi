(function(angular) {
  'use strict';

  angular
    .module('app.routeselect')
    .directive('listBookings', listBookings);

    listBookings.$inject = ['$timeout'];
    function listBookings($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'app/routeselect/routeselect-list-bookings.html',
        replace: true,
        scope: {
          bookings: '=',
          isBookingsAvailable: '=',
          pointName: '='
        },
        link: function link(scope, elem, attrs) {
          scope.selectBooking = function(booking) {
            console.log('Booking: ', booking);
          };
        }
      };
    }

}(angular));
