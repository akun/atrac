'use strict';

angular.module('frontEndApp')
  .controller('AdminCtrl', function ($scope) {
    $scope.tmp = '';
  })
  .controller('AdminTypeReadCtrl', function ($scope, $resource) {
    var Type = $resource('/a/type/read');
    Type.get({}, function (data) {
      $scope.types = [];
      angular.forEach(data.types, function (type) {
        this.push({
          id: type.id,
          name: type.name
        });
      }, $scope.types);
    });
  });
