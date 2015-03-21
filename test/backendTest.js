'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

describe('app backend testing', function() {
	var server;

	before(function(done) {
		require('../server')(true, function(srv) {
			server = srv;
			done();
		});
	});

	it('should work', function(done) {
		done();
	});

	it('should create a user', function(done) {
		chai.request(server)
		.post('/api/user')
		.send({"username":"test", "firstname":"test", "lastname":"last", "email":"test@test.com","password":"test"})
		.end(function(err, res) {
			console.dir(res.body);
			expect(err).to.eql(null);
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('username');
			done();
		});
	});

	it('should delete a user', function(done) {
		chai.request(server)
		.del('/api/user/test')
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res).to.have.status(200);
			done();
		});
	})
});