'use strict';

angular.module('frontEndApp')
  .controller('SourceCtrl', function ($scope) {
    $scope.items = [{
      subItems: [],
      isVisible: false,
      name: 'atrac',
      size: null,
      revision: '47b154c3ed',
      age: '3 days',
      lastAuthor: 'akun',
      log: 'first commit'
    }, {
      subItems: [],
      isVisible: false,
      name: 'mindmap',
      size: null,
      revision: '57b154c3ed',
      age: '1 day',
      lastAuthor: 'akun',
      log: 'code format'
    }];

    $scope.toggle = function (item) {
      item.isVisible = item.isVisible == false ? true : false;
      item.subItems = [{
        subItems: [],
        name: 'README',
        size: '1K',
        revision: '58b154c3ed',
        age: '1 day',
        lastAuthor: 'akun',
        log: 'init'
      }, {
        subItems: [],
        name: '.jshint',
        size: '12K',
        revision: '58c154c3ed',
        age: '1 day',
        lastAuthor: 'akun',
        log: 'init'
      }];
    };
  })
  .controller('SourceFileCtrl', function ($scope) {
    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      readOnly: 'nocursor',
      mode: 'xml'
    };
    $scope.code = '<?php echo "Hello World"; ?>';
  });
