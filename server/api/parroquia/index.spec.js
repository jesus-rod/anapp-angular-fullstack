'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var parroquiaCtrlStub = {
  index: 'parroquiaCtrl.index',
  show: 'parroquiaCtrl.show',
  create: 'parroquiaCtrl.create',
  upsert: 'parroquiaCtrl.upsert',
  patch: 'parroquiaCtrl.patch',
  destroy: 'parroquiaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var parroquiaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './parroquia.controller': parroquiaCtrlStub
});

describe('Parroquia API Router:', function() {
  it('should return an express router instance', function() {
    expect(parroquiaIndex).to.equal(routerStub);
  });

  describe('GET /api/parroquias', function() {
    it('should route to parroquia.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'parroquiaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/parroquias/:id', function() {
    it('should route to parroquia.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'parroquiaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/parroquias', function() {
    it('should route to parroquia.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'parroquiaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/parroquias/:id', function() {
    it('should route to parroquia.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'parroquiaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/parroquias/:id', function() {
    it('should route to parroquia.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'parroquiaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/parroquias/:id', function() {
    it('should route to parroquia.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'parroquiaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
