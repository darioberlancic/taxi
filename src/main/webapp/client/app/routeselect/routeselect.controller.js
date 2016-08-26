(function(angular) {
  'use strict';

  angular
    .module('app.routeselect')
    .controller('RouteSelectController', RouteSelectController);

    RouteSelectController.$inject = ['$scope', '$window', '$state', '$stateParams', 'dataService'];
    function RouteSelectController($scope, $window, $state, $stateParams, dataService) {
      // Detect when state change start...
      var lis1 = $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if (toParams.pointName) {
          $window.location.reload();
        }
      });

      // If direct URL is enteres with :pointName show only list of available bookings...
      if ($state.params.pointName) {
        $scope.isSearchVisible = false;
        var pointId = dataService.getPointIdByName($state.params.pointName);
        if (pointId !== null) {
          var bookings = dataService.getBookingsById(pointId);
          $scope.pointName = dataService.getPointName(pointId).name;

          if (bookings.length < 1) {
            $scope.isBookingsAvailable = false;
          }
          else {
            $scope.isBookingsAvailable = true;
            $scope.bookings = bookings;
          }
        }
        else {
          console.log('Invalid point');
          $scope.isBookingsAvailable = false;
        }
      }
      // Search for available bookings depending on route user select...
      else {
        // Props...
        $scope.routeSelected = false;
        $scope.isSearchVisible = true;

        // Getting available points...
        $scope.points = dataService.getPoints();

        // Setting $scope value...
        $scope.onSelectStart = function($item) { // $model, $label
          $scope.selectedStart = $item;
        };

        // Setting $scope value...
        $scope.onSelectEnd = function($item) { // $model, $label
          $scope.selectedEnd = $item;
        };

        // Watching for $scope changes...
        $scope.$watchGroup(['selectedStart', 'selectedEnd'], function(newVal, oldVal) {
          // If route is selected...
          if ($scope.selectedStart && $scope.selectedEnd) {
            $scope.$emit('routeSelected', {
              startPointId: $scope.selectedStart.id,
              endPointId: $scope.selectedEnd.id
            });
            $scope.routeSelected = true;
          }
        });

        var lis2 = $scope.$on('routeSelected', function(e, data) {
          // Calling data service to retrieve available bookings...
          var bookings = dataService.getBookingsByRoute(data.startPointId, data.endPointId);

          if (bookings.length < 1) {
            $scope.isBookingsAvailable = false;
          }
          else {
            $scope.isBookingsAvailable = true;
            $scope.bookings = bookings;
          }
        });

        // Cleanup...
        $scope.$on('$destroy', function() {
          lis1();
          lis2();
        });
      }
    }
}(angular));
