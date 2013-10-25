'use strict';

angular.module('frontEndApp')
  .controller('TicketAddCtrl', function ($scope, $resource, $location) {
    var Ticket = $resource('/a/ticket/add')
    Ticket.get({}, function (data) {
      $scope.types = data.result.types;
      $scope.milestones = data.result.milestones;
      $scope.versions = data.result.versions;
      $scope.categorys = data.result.categorys;
      $scope.assigneds = data.result.assigneds;
      $scope.ccs = data.result.ccs;
    });

    $scope.save = function () {
      var Ticket = $resource('/a/ticket/add');
      var ticket = new Ticket();
      ticket.summary = $scope.ticket.summary;
      ticket.$save();
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
