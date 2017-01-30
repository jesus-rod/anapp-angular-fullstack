'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mediaCtrlStub = {
  index: 'mediaCtrl.index',
  show: 'mediaCtrl.show',
  create: 'mediaCtrl.create',
  upsert: 'mediaCtrl.upsert',
  patch: 'mediaCtrl.patch',
  destroy: 'mediaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mediaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './media.controller': mediaCtrlStub
});

describe('Media API Router:', function() {
  it('should return an express router instance', function() {
    expect(mediaIndex).to.equal(routerStub);
  });

  describe('GET /api/media', function() {
    it('should route to media.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mediaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/media/:id', function() {
    it('should route to media.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mediaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/media', function() {
    it('should route to media.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mediaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/media/:id', function() {
    it('should route to media.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mediaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/media/:id', function() {
    it('should route to media.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mediaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/media/:id', function() {
    it('should route to media.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mediaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
