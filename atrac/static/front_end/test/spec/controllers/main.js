'use strict';

describe('Controller: TicketReadCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var TicketReadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TicketReadCtrl = $controller('TicketReadCtrl', {
      $scope: scope
    });
  }));

  it('test ticket read', function () {
  });
});
