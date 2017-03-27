'use strict';

describe('Component: AgendaComponent', function() {
  // load the controller's module
  beforeEach(module('anappAngularFullstackApp.agenda'));

  var AgendaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AgendaComponent = $componentController('agenda', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
