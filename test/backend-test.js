'use strict';

process.env.NODE_ENV = 'test';
var models = require('../lib/models');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;//jshint ignore:line
chai.use(chaihttp);

describe('app backend testing', function () {
  var server;

  before(function (done) {
    require('../server')(function (srv) {
      server = srv;
      done();
    });
  });

  it('should create a user', function (done) {
    chai.request(server)
      .post('/api/v1/users')
      .send({"username": "test", "displayName": "test"})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username');
        done();
      });
  });

  it('should get user info', function (done) {
    chai.request(server)
      .get('/api/v1/users/test')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username');
        done();
      });
  });

  it('should create a bucket list', function (done) {
    chai.request(server)
      .post('/api/v1/buckets')
      .send({"userId": "1", "listType": "movie", "subjectId": "1234", "subjectInfo": {"thisIs": "a test1"}})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('userId');
        done();
      });
  });

  it('should update a bucket list', function (done) {
    chai.request(server)
      .put('/api/v1/buckets')
      .send({"id": "1", "userId": "1", "listType": "movie", "subjectId": "1234", "subjectInfo": {"thisIs": "a test2"}})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql([1]);
        done();
      });
  });

  it('should delete the user', function (done) {
    chai.request(server)
      .del('/api/v1/users/test')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  after(function (done) {
    models.sequelize.query('drop table users cascade;drop table bucket_lists;');
    done();
  });
});