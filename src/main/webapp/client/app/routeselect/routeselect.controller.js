(function(angular) {
  'use strict';

  angular
    .module('app.routeselect')
    .controller('RouteSelectController', RouteSelectController);

    RouteSelectController.$inject = ['$scope', 'dataService'];
    function RouteSelectController($scope, dataService) {
      // Props...
      $scope.routeSelected = false;

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
    }
}(angular));
