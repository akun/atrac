'use strict';

angular.module('frontEndApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/new_ticket', {
        templateUrl: 'views/new_ticket.html',
        controller: 'NewTicketCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
