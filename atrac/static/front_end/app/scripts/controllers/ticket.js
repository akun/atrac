'use strict';

angular.module('frontEndApp')
  .factory('TicketCreateFactory', function ($resource) {
    return $resource('/a/ticket/create', {}, {
      create: {
        method: 'POST'
      }
    });
  })
  .factory('TicketUpdateFactory', function ($resource) {
    return $resource('/a/ticket/update/:id', {}, {
      update: {
        method: 'POST',
        params: {id: '@id'}
      }
    });
  })
  .factory('TicketDeleteFactory', function ($resource) {
    return $resource('/a/ticket/delete/:ids', {}, {
      delete: {
        method: 'POST',
        params: {ids: '@ids'}
      }
    });
  })
  .directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        if (angular.element(event.target).is('a')) {
          return;
        }
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
  })
  .controller('TicketCreateCtrl', function ($scope, $resource, TicketCreateFactory, $location) {
    var Ticket = $resource('/a/ticket/create');

    Ticket.get({}, function (data) {
      $scope.ticket = {};
      angular.forEach(['type', 'milestone', 'version', 'category'], function (item) {
        var attrName = item + 's';
        var attrValues = data.result[attrName];
        angular.forEach(attrValues, function (v) {
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
      TicketCreateFactory.create($scope.ticket);
      $location.path('/');
    };
  })
  .controller('TicketReadCtrl', function ($scope, $resource) {
    //Pagination
    $scope.tickets = [];
    $scope.currentPage = 1;
    $scope.perPage = 20;
    $scope.maxSize = 5;
    var showTable = function() {
      var Ticket = $resource('/a/ticket/read/:page/:limit');
      Ticket.get({page: $scope.currentPage, limit: $scope.perPage}, function (data) {
        $scope.totalItems = data.count;
        $scope.tickets = [];
        angular.forEach(data.tickets, function (ticket) {
          this.push({
            id: ticket.id,
            shortId: ticket.id.substring(18, 24),
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
      if (angular.element($event.target).is('a')) {
        return;
      }

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
      if ($scope.rowIds[$index] !== true) {
        singleSelect($index);
      }

      options.css('left', $event.pageX);
      options.css('top', $event.pageY);
      options.show();
    };
  })
  .controller('TicketUpdateCtrl', function ($scope, $resource, $routeParams, TicketUpdateFactory, $location) {
    var Ticket = $resource('/a/ticket/update/:id');
    Ticket.get({id: $routeParams.id}, function (data) {
      data.result.ticket.shortId = data.result.ticket.id.substring(18, 24);
      $scope.ticket = data.result.ticket;
      angular.forEach(['types', 'milestones', 'versions', 'categorys'], function (attrName) {
        $scope[attrName] = data.result[attrName];
      });
      $scope.assigneds = data.result.assigneds;
      $scope.ccs = data.result.ccs;
      $scope.save = function () {
        TicketUpdateFactory.update($scope.ticket);
        $location.path('/');
      };
    });
  })
  .controller('TicketMenuCtrl', function ($scope, TicketDeleteFactory, $location) {
    $scope.deleteTickets = function () {
      var tickedIds = [];
      angular.forEach(angular.element('table input[type="checkbox"]:checked'), function (checkbox) {
        this.push(angular.element(checkbox).val());
      }, tickedIds);
      TicketDeleteFactory.delete(tickedIds.join());
      $location.path('/ok');
    };
  });
