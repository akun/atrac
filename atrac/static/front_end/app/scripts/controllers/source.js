'use strict';

angular.module('frontEndApp')
  .controller('SourceCtrl', function ($scope) {
    $scope.items = [{
      subItems: [],
      name: 'atrac',
      size: null,
      revision: '47b154c3ed',
      age: '3 days',
      last_author: 'akun',
      log: 'first commit'
    }, {
      subItems: [],
      name: 'mindmap',
      size: null,
      revision: '57b154c3ed',
      age: '1 day',
      last_author: 'akun',
      log: 'code format'
    }];

    $scope.toggle = function(item) {
      console.log(item.name);
      item.subItems = [{
        subItems: [],
        name: 'README',
        size: '1K',
        revision: '58b154c3ed',
        age: '1 day',
        last_author: 'akun',
        log: 'init'
      }, {
        subItems: [],
        name: '.jshint',
        size: '12K',
        revision: '58c154c3ed',
        age: '1 day',
        last_author: 'akun',
        log: 'init'
      }];
    };
  });
