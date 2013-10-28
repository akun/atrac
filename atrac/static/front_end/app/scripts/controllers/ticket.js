'use strict';

angular.module('frontEndApp')
  .factory('TicketFactory', function ($resource) {
      return $resource('/a/ticket/add', {}, {
          create: {
            method: 'POST'
          }
      });
  })
  .factory('TicketEditFactory', function ($resource) {
      return $resource('/a/ticket/edit/:id', {}, {
          edit: {
            method: 'POST',
            params: {id: '@id'}
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
  .controller('TicketEditCtrl', function ($scope, $resource, $routeParams, TicketEditFactory, $location) {
    var Ticket = $resource('/a/ticket/edit/:id');
    Ticket.get({id: $routeParams.id}, function (data) {
      $scope.ticket = data.result.ticket;
      $scope.ticket['short_id'] = $scope.ticket.id.substring(18, 24);
      angular.forEach(['types', 'milestones', 'versions', 'categorys'], function (attrName, i) {
        $scope[attrName] = data.result[attrName];
      });
      $scope.assigneds = data.result.assigneds;
      $scope.ccs = data.result.ccs;
      $scope.save = function () {
        TicketEditFactory.edit($scope.ticket);
        $location.path('/');
      };
    });
  })
  .controller('TicketListCtrl', function ($scope, $resource) {
    $scope.tickets = [];
    var Ticket = $resource('/a/ticket/list');
    Ticket.query(function (tickets) {
      angular.forEach(tickets, function (ticket) {
        this.push({
          id: ticket.id,
          short_id: ticket.id.substring(18, 24),
          type: '改进',
          status: '分派',
          priority: '低',
          summary: ticket.summary,
          assigned: 'user3',
          milestone: ticket.milestone
        });
      }, $scope.tickets);
    });
  });
