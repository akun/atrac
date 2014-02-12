'use strict';

angular.module('frontEndApp')
  .factory('TypeCreateFactory', function ($resource) {
    return $resource('/a/type/create', {}, {
      create: {
        method: 'POST'
      }
    });
  })
  .controller('AdminCtrl', function ($scope) {
    $scope.tmp = '';
  })
  .controller('AdminTypeReadCtrl', function ($scope, $resource, $location, TypeCreateFactory) {
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

    $scope.type = {};
    $scope.save = function () {
      TypeCreateFactory.create($scope.type, function (data) {
        var type = data.result.type;
        $scope.types.push({
          id: type.id,
          name: type.name
        });
        angular.element('#addType').modal('hide');
        $scope.type = {};
      });
    };
  });
