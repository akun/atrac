'use strict';

angular.module('frontEndApp')
  .controller('NewTicketCtrl', function ($scope, $resource) {

    $scope.save = function() {
      var Ticket = $resource('/a/ticket/add');
      var ticket = new Ticket();
      ticket.summary = $scope.ticket.summary;
      ticket.$save()
    }

    $scope.types = [
      '缺陷',
      '改进/建议',
      '功能',
      '支持'
    ];
    $scope.milestones = [
      '1.0.0',
      '1.0.1',
      '1.0.2',
      '1.1.0',
      '2.0.0',
      '3.0.0',
      '4.0.0'
    ];
    $scope.versions = [
      '1.0.0',
      '1.0.1',
      '1.0.2',
      '1.1.0'
    ];
    $scope.categorys = [
      '模块1',
      '模块2',
      '模块3',
      '模块4'
    ];
    $scope.assigneds = [
      '<<我>>',
      'user1',
      'user2',
      'user3'
    ];
    $scope.ccs = [
      'user1',
      'user2',
      'user3'
    ];
  });
