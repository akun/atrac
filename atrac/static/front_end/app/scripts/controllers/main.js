'use strict';

angular.module('frontEndApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
  })
  .controller('MainCtrl', function ($scope) {
    $scope.tickets = [{
      'id': 10,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 9,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 8,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 7,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 6,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 5,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 4,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 3,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 3,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 2,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }, {
      'id': 1,
      'type': '缺陷',
      'status': '关闭',
      'priority': '高',
      'summary': '添加不能成功',
      'assigned': 'user1',
      'milestone': '2.0.0',
    }];
  });
