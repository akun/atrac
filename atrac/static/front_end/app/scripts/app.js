'use strict';

angular.module('frontEndApp', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.codemirror', 'angularFileUpload'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ticket/create', {
        templateUrl: 'views/ticket_create.html',
        controller: 'TicketCreateCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TicketReadCtrl'
      })
      .when('/ticket/update/:id', {
        templateUrl: 'views/ticket_update.html',
        controller: 'TicketUpdateCtrl'
      })
      .when('/source', {
        templateUrl: 'views/source/source.html',
        controller: 'SourceCtrl'
      })
      .when('/source/path/:path*', {
        templateUrl: 'views/source/source_file.html',
        controller: 'SourceFileCtrl'
      })
      .when('/ci', {
        templateUrl: 'views/ci.html',
        controller: 'SourceFileCtrl'
      })
      .when('/admin', {
        redirectTo: '/admin/type'
      })
      .when('/admin/type', {
        templateUrl: 'views/admin/type.html',
        controller: 'AdminTypeReadCtrl'
      })
      .when('/admin/type/update/:id', {
        templateUrl: 'views/admin/type_update.html',
        controller: 'AdminTypeUpdateCtrl'
      })
      .when('/admin/milestone', {
        templateUrl: 'views/admin/nav.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/category', {
        templateUrl: 'views/admin/nav.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/version', {
        templateUrl: 'views/admin/nav.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
