'use strict';

angular.module('frontEndApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
  })
  .controller('MainCtrl', function ($scope, $resource) {
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

    var Ticket = $resource('/a/ticket/list');
    Ticket.query(function(tickets) {
      $.map(tickets, function(ticket) {
        $scope.tickets.push({
          id: ticket.id,
          type: '改进',
          status: '分派',
          priority: '低',
          summary: ticket.summary,
          assigned: 'user3',
          milestone: '2.1.0'
        });
      });
    });

  });
