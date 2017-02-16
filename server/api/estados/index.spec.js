'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var estadosCtrlStub = {
  index: 'estadosCtrl.index',
  show: 'estadosCtrl.show',
  create: 'estadosCtrl.create',
  upsert: 'estadosCtrl.upsert',
  patch: 'estadosCtrl.patch',
  destroy: 'estadosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var estadosIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './estados.controller': estadosCtrlStub
});

describe('Estados API Router:', function() {
  it('should return an express router instance', function() {
    expect(estadosIndex).to.equal(routerStub);
  });

  describe('GET /api/estados', function() {
    it('should route to estados.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'estadosCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/estados/:id', function() {
    it('should route to estados.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'estadosCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/estados', function() {
    it('should route to estados.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'estadosCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/estados/:id', function() {
    it('should route to estados.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'estadosCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/estados/:id', function() {
    it('should route to estados.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'estadosCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/estados/:id', function() {
    it('should route to estados.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'estadosCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
