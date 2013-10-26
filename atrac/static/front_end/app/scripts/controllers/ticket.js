'use strict';

angular.module('frontEndApp')
  .factory('TicketFactory', function ($resource) {
      return $resource('/a/ticket/add', {}, {
          create: {
            method: 'POST'
          }
      });
  })
  .controller('TicketAddCtrl', function ($scope, $resource, TicketFactory, $location) {
    var Ticket = $resource('/a/ticket/add');

    Ticket.get({}, function (data) {
      $scope.ticket = {};
      angular.forEach(['type', 'milestone', 'version', 'category'], function (item, i) {
        var attrName = item + 's'
        var attrValues = data.result[attrName];
        angular.forEach(attrValues, function (v, i) {
          if (v.default) {
            $scope.ticket[item] = v.name;
          }
        });
        $scope[attrName] = attrValues;
      });
      $scope.assigneds = data.result.assigneds;
      $scope.ccs = data.result.ccs;
    });

    $scope.save = function () {
      TicketFactory.create($scope.ticket);
      $location.path('/');
    };
  })
  .controller('TicketCtrl', function ($scope) {
    $scope.ticket = {
      id: 10,
      summary: '添加可以预览',
      reporter: 'user4',
      assigned: 'user2',
      description: '需要解析格式的文字'
    };
  })
  .controller('TicketListCtrl', function ($scope, $resource) {
    $scope.tickets = [];
    var Ticket = $resource('/a/ticket/list');
    Ticket.query(function (tickets) {
      angular.forEach(tickets, function (ticket) {
        this.push({
          id: ticket.id,
          type: '改进',
          status: '分派',
          priority: '低',
          summary: ticket.summary,
          assigned: 'user3',
          milestone: '2.1.0'
        });
      }, $scope.tickets);
    });
  });
