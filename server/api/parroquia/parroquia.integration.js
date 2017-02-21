'use strict';

var app = require('../..');
import request from 'supertest';

var newParroquia;

describe('Parroquia API:', function() {
  describe('GET /api/parroquias', function() {
    var parroquias;

    beforeEach(function(done) {
      request(app)
        .get('/api/parroquias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          parroquias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(parroquias).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/parroquias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/parroquias')
        .send({
          name: 'New Parroquia',
          info: 'This is the brand new parroquia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newParroquia = res.body;
          done();
        });
    });

    it('should respond with the newly created parroquia', function() {
      expect(newParroquia.name).to.equal('New Parroquia');
      expect(newParroquia.info).to.equal('This is the brand new parroquia!!!');
    });
  });

  describe('GET /api/parroquias/:id', function() {
    var parroquia;

    beforeEach(function(done) {
      request(app)
        .get(`/api/parroquias/${newParroquia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          parroquia = res.body;
          done();
        });
    });

    afterEach(function() {
      parroquia = {};
    });

    it('should respond with the requested parroquia', function() {
      expect(parroquia.name).to.equal('New Parroquia');
      expect(parroquia.info).to.equal('This is the brand new parroquia!!!');
    });
  });

  describe('PUT /api/parroquias/:id', function() {
    var updatedParroquia;

    beforeEach(function(done) {
      request(app)
        .put(`/api/parroquias/${newParroquia._id}`)
        .send({
          name: 'Updated Parroquia',
          info: 'This is the updated parroquia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedParroquia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParroquia = {};
    });

    it('should respond with the updated parroquia', function() {
      expect(updatedParroquia.name).to.equal('Updated Parroquia');
      expect(updatedParroquia.info).to.equal('This is the updated parroquia!!!');
    });

    it('should respond with the updated parroquia on a subsequent GET', function(done) {
      request(app)
        .get(`/api/parroquias/${newParroquia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let parroquia = res.body;

          expect(parroquia.name).to.equal('Updated Parroquia');
          expect(parroquia.info).to.equal('This is the updated parroquia!!!');

          done();
        });
    });
  });

  describe('PATCH /api/parroquias/:id', function() {
    var patchedParroquia;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/parroquias/${newParroquia._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Parroquia' },
          { op: 'replace', path: '/info', value: 'This is the patched parroquia!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedParroquia = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedParroquia = {};
    });

    it('should respond with the patched parroquia', function() {
      expect(patchedParroquia.name).to.equal('Patched Parroquia');
      expect(patchedParroquia.info).to.equal('This is the patched parroquia!!!');
    });
  });

  describe('DELETE /api/parroquias/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/parroquias/${newParroquia._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when parroquia does not exist', function(done) {
      request(app)
        .delete(`/api/parroquias/${newParroquia._id}`)
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
