'use strict';

angular.module('frontEndApp', ['ngResource', 'ngRoute', 'ui.codemirror'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/source', {
        templateUrl: 'views/source.html',
        controller: 'SourceCtrl'
      })
      .when('/source/path/:path*', {
        templateUrl: 'views/source_file.html',
        controller: 'SourceFileCtrl'
      })
      .when('/new_ticket', {
        templateUrl: 'views/new_ticket.html',
        controller: 'NewTicketCtrl'
      })
      .when('/ticket/:id', {
        templateUrl: 'views/ticket.html',
        controller: 'TicketCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
