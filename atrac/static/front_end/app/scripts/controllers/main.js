'use strict';

angular.module('frontEndApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
  })
  .controller('MainCtrl', function ($scope, $resource) {
    $scope.tickets = [];
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
