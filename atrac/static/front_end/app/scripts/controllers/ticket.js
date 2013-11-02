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
  .directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
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
  .controller('TicketListCtrl', function ($scope, $resource, $routeParams) {
    //Pagination
    $scope.tickets = [];
    $scope.currentPage = 1;
    $scope.perPage = 20;
    $scope.maxSize = 5;
    var showTable = function() {
      var Ticket = $resource('/a/ticket/list/:page/:limit');
      Ticket.get({page: $scope.currentPage, limit: $scope.perPage}, function (data) {
        $scope.totalItems = data.count;
        $scope.tickets = [];
        angular.forEach(data.tickets, function (ticket) {
          this.push({
            id: ticket.id,
            short_id: ticket.id.substring(18, 24),
            type: ticket.type,
            status: '分派',
            priority: '低',
            summary: ticket.summary,
            assigned: ticket.assigned,
            milestone: ticket.milestone
          });
        }, $scope.tickets);
      });
    };

    $scope.selectPage = function (page) {
      $scope.currentPage = page;
      showTable();
    };
    showTable();

    var options = angular.element('#options');

    // Checkbox Select / Shift Select / Ctrl Select
    $scope.rowIds = {};
    $scope.firstRowId = null;
    $scope.lastRowId = null;
    var singleSelect = function ($index) {
      $scope.rowIds = [];
      $scope.rowIds[$index] = $scope.rowIds[$index] === true ? false : true;
    };
    $scope.selectRow = function ($event, $index) {
      if ($scope.firstRowId === null) {
        $scope.firstRowId = $index;
      }
      if ($event.shiftKey) {
        $scope.lastRowId = $index;

        $scope.rowIds = [];
        var start = Math.min($scope.firstRowId, $scope.lastRowId);
        var end = Math.max($scope.firstRowId, $scope.lastRowId);
        for (var i = start; i <= end; i++) {
          $scope.rowIds[i] = true;
        }
      } else {
        $scope.firstRowId = $index;
        $scope.lastRowId = null;

        if ($event.ctrlKey || angular.element($event.target).is('input[type="checkbox"]')) {
          $scope.rowIds[$index] = $scope.rowIds[$index] === true ? false : true;
        } else {
          singleSelect($index);
        }
      }
      options.hide();
    };

    // Batch Options
    $scope.showOptions = function ($event, $index) {
      singleSelect($index);

      options.css('left', $event.pageX);
      options.css('top', $event.pageY);
      options.show();
    };
  });
