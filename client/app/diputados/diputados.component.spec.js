'use strict';

describe('Component: DiputadosComponent', function() {
  // load the controller's module
  beforeEach(module('anappAngularFullstackApp.diputados'));

  var DiputadosComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DiputadosComponent = $componentController('diputados', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
