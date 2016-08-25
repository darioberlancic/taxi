(function(angular) {
  'use strict';

  angular
    .module('app.common')
    .directive('progressIndicator', progressIndicator);

    progressIndicator.$inject = [];
    function progressIndicator() {
      return {
        restrict: 'E',
        templateUrl: 'app/common/common-progress-indicator.html',
        replace: true,
        scope: {}
      };
    }
}(angular));
