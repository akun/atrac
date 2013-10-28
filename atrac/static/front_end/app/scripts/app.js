'use strict';

angular.module('frontEndApp', ['ngResource', 'ngRoute', 'ui.codemirror'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TicketListCtrl'
      })
      .when('/ticket/new', {
        templateUrl: 'views/new_ticket.html',
        controller: 'TicketAddCtrl'
      })
      .when('/ticket/edit/:id', {
        templateUrl: 'views/edit_ticket.html',
        controller: 'TicketEditCtrl'
      })
      .when('/source', {
        templateUrl: 'views/source.html',
        controller: 'SourceCtrl'
      })
      .when('/source/path/:path*', {
        templateUrl: 'views/source_file.html',
        controller: 'SourceFileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
