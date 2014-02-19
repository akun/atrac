'use strict';

angular.module('frontEndApp')
  .controller('SourceCtrl', function ($scope, $resource) {
    var formatNode = function (node) {
      if (node.kind === 'file') {
        node.url = '#/source/path/' + node.path;
        node.icon = 'icon-file';
      } else if (node.kind === 'folder') {
        node.url = '#/source';
        node.icon = 'icon-folder-close';
      }
      node.isVisible = false;
      node.subNodes = [];
    };

    var Source = $resource('/a/source/read');
    Source.get({}, function (data) {
      $scope.nodes = data.result.nodes;
      angular.forEach($scope.nodes, function (node) {
        formatNode(node);
      });
    });

    $scope.toggle = function (node) {
      node.isVisible = node.isVisible === false ? true : false;
      var Source = $resource('/a/source/read/:path');
      Source.get({path: node.path}, function (data) {
        node.subNodes = data.result.nodes;
        angular.forEach(node.subNodes, function (node) {
          formatNode(node);
        });
      });
    };
  })
  .controller('SourceFileCtrl', function ($scope, $routeParams, $resource) {
    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      readOnly: 'nocursor',
      mode: 'xml'
    };

    var Source = $resource('/a/source/read/:path', {path: '@path'});
    Source.get({path: $routeParams.path}, function (data) {
      $scope.code = data.result.content;
    });
  });
