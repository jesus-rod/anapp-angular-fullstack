'use strict';

var app = require('../..');
import request from 'supertest';

var newEstados;

describe('Estados API:', function() {
  describe('GET /api/estados', function() {
    var estadoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/estados')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          estadoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(estadoss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/estados', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/estados')
        .send({
          name: 'New Estados',
          info: 'This is the brand new estados!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEstados = res.body;
          done();
        });
    });

    it('should respond with the newly created estados', function() {
      expect(newEstados.name).to.equal('New Estados');
      expect(newEstados.info).to.equal('This is the brand new estados!!!');
    });
  });

  describe('GET /api/estados/:id', function() {
    var estados;

    beforeEach(function(done) {
      request(app)
        .get(`/api/estados/${newEstados._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          estados = res.body;
          done();
        });
    });

    afterEach(function() {
      estados = {};
    });

    it('should respond with the requested estados', function() {
      expect(estados.name).to.equal('New Estados');
      expect(estados.info).to.equal('This is the brand new estados!!!');
    });
  });

  describe('PUT /api/estados/:id', function() {
    var updatedEstados;

    beforeEach(function(done) {
      request(app)
        .put(`/api/estados/${newEstados._id}`)
        .send({
          name: 'Updated Estados',
          info: 'This is the updated estados!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEstados = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEstados = {};
    });

    it('should respond with the updated estados', function() {
      expect(updatedEstados.name).to.equal('Updated Estados');
      expect(updatedEstados.info).to.equal('This is the updated estados!!!');
    });

    it('should respond with the updated estados on a subsequent GET', function(done) {
      request(app)
        .get(`/api/estados/${newEstados._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let estados = res.body;

          expect(estados.name).to.equal('Updated Estados');
          expect(estados.info).to.equal('This is the updated estados!!!');

          done();
        });
    });
  });

  describe('PATCH /api/estados/:id', function() {
    var patchedEstados;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/estados/${newEstados._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Estados' },
          { op: 'replace', path: '/info', value: 'This is the patched estados!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEstados = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEstados = {};
    });

    it('should respond with the patched estados', function() {
      expect(patchedEstados.name).to.equal('Patched Estados');
      expect(patchedEstados.info).to.equal('This is the patched estados!!!');
    });
  });

  describe('DELETE /api/estados/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/estados/${newEstados._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when estados does not exist', function(done) {
      request(app)
        .delete(`/api/estados/${newEstados._id}`)
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
