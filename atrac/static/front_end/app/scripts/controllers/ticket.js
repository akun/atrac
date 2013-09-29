'use strict';

angular.module('frontEndApp')
  .controller('TicketCtrl', function ($scope) {
    $scope.ticket = {
      id: 10,
      summary: '添加可以预览',
      reporter: 'user4',
      assigned: 'user2',
      description: '需要解析格式的文字'
    };
  });
