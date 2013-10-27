'use strict';

angular.module('frontEndApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
      var path = $location.path();
      if (route === '/') {
        return route === path;
      } else {
        return path.indexOf(route) === 0;
      }
    };
  });
