'use strict';

var app = require('../..');
import request from 'supertest';

var newMedia;

describe('Media API:', function() {
  describe('GET /api/media', function() {
    var medias;

    beforeEach(function(done) {
      request(app)
        .get('/api/media')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          medias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(medias).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/media', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/media')
        .send({
          name: 'New Media',
          info: 'This is the brand new media!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMedia = res.body;
          done();
        });
    });

    it('should respond with the newly created media', function() {
      expect(newMedia.name).to.equal('New Media');
      expect(newMedia.info).to.equal('This is the brand new media!!!');
    });
  });

  describe('GET /api/media/:id', function() {
    var media;

    beforeEach(function(done) {
      request(app)
        .get(`/api/media/${newMedia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          media = res.body;
          done();
        });
    });

    afterEach(function() {
      media = {};
    });

    it('should respond with the requested media', function() {
      expect(media.name).to.equal('New Media');
      expect(media.info).to.equal('This is the brand new media!!!');
    });
  });

  describe('PUT /api/media/:id', function() {
    var updatedMedia;

    beforeEach(function(done) {
      request(app)
        .put(`/api/media/${newMedia._id}`)
        .send({
          name: 'Updated Media',
          info: 'This is the updated media!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedia = {};
    });

    it('should respond with the updated media', function() {
      expect(updatedMedia.name).to.equal('Updated Media');
      expect(updatedMedia.info).to.equal('This is the updated media!!!');
    });

    it('should respond with the updated media on a subsequent GET', function(done) {
      request(app)
        .get(`/api/media/${newMedia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let media = res.body;

          expect(media.name).to.equal('Updated Media');
          expect(media.info).to.equal('This is the updated media!!!');

          done();
        });
    });
  });

  describe('PATCH /api/media/:id', function() {
    var patchedMedia;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/media/${newMedia._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Media' },
          { op: 'replace', path: '/info', value: 'This is the patched media!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMedia = {};
    });

    it('should respond with the patched media', function() {
      expect(patchedMedia.name).to.equal('Patched Media');
      expect(patchedMedia.info).to.equal('This is the patched media!!!');
    });
  });

  describe('DELETE /api/media/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/media/${newMedia._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when media does not exist', function(done) {
      request(app)
        .delete(`/api/media/${newMedia._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
