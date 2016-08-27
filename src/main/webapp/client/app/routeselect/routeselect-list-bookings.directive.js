(function(angular) {
  'use strict';

  angular
    .module('app.routeselect')
    .directive('listBookings', listBookings);

    listBookings.$inject = ['$state'];
    function listBookings($state) {
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
          scope.goSearch = function() {
            $state.go('routeselect', {}, { reload: true });
          };

          scope.selectBooking = function(booking) {
            console.log('Booking: ', booking);
          };

          scope.makeBooking = function(booking) {
            $state.go('booking', { o: booking });
          };
        }
      };
    }

}(angular));
