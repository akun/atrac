'use strict';

angular.module('frontEndApp')
  .factory('TypeCreateFactory', function ($resource) {
    return $resource('/a/type/create', {}, {
      create: {
        method: 'POST'
      }
    });
  })
  .factory('TypeUpdateFactory', function ($resource) {
    return $resource('/a/type/update/:id', {}, {
      update: {
        method: 'POST',
        params: {id: '@id'}
      }
    });
  })
  .factory('TypeDeleteFactory', function ($resource) {
    return $resource('/a/type/delete/:id', {}, {
      delete: {
        method: 'POST',
        params: {id: '@id'}
      }
    });
  })
  .controller('AdminCtrl', function ($scope) {
    $scope.tmp = '';
  })
  .controller('AdminTypeReadCtrl', function ($scope, $resource, TypeCreateFactory, TypeUpdateFactory, TypeDeleteFactory) {
    var Type = $resource('/a/type/read');
    Type.get({}, function (data) {
      $scope.types = [];
      angular.forEach(data.types, function (type) {
        this.push(type);
      }, $scope.types);
    });

    $scope.type = {};
    $scope.save = function () {
      TypeCreateFactory.create($scope.type, function (data) {
        var type = data.result.type;
        $scope.types.unshift({
          id: type.id,
          name: type.name
        });
        angular.element('#addType').modal('hide');
        $scope.type = {};
      });
    };

    $scope.setDefault = function ($index) {
      var type = $scope.types[$index];
      type.default = true;
      TypeUpdateFactory.update(type);
    };

    $scope.delete = function ($index) {
      var type = $scope.types[$index];
      TypeDeleteFactory.delete(type.id);
      $scope.types.splice($index, 1);
    };
  })
  .controller('AdminTypeUpdateCtrl', function ($scope, $resource, $routeParams, $location, TypeUpdateFactory) {
    var Type = $resource('/a/type/update/:id');
    Type.get({id: $routeParams.id}, function (data) {
      $scope.type = data.result.type;
      $scope.save = function () {
        TypeUpdateFactory.update($scope.type);
        $location.path('/admin/type');
      };
    });
  });
