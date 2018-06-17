"use strict";
var chai = require('chai');
var expect = chai.expect;
var Storage = require('../src/index.js');

function copy(data) {
  return JSON.parse(JSON.stringify(data));
}

function testDataRetrievingAndManipulation(scope, id, initialData, keyToUpdate, done) {
  var storage = Storage({
    host: 'localhost',
    user: 'root',
    password: 'p@ssw0rd',
    database: 'tests'
  });

  storage[scope].save(initialData, function (err) {
    expect(err).to.be.null;
    storage[scope].get(id, function (err, actualData) {
      expect(actualData).to.deep.equal(initialData);

      var newData = copy(initialData);
      newData[keyToUpdate] = 'andNewValue';
      storage[scope].save(newData, function (err) {
        expect(err).to.be.null;
        storage[scope].all(function (err, data) {
          expect(err).to.be.null;
          expect(data.length).to.be.equal(1);
          expect(data[0]).to.deep.equal(newData);
          done();
        })
      });
    })
  });
}

describe('Botkit MySQL Storage', function() {

  describe('module configuration', function () {
    it('should throw an error when configuration is null', function () {
      expect(Storage).to.throw(Error, 'Need to provide MySQL connection information.');
    });

    it('should throw an error when MySQL host is null', function () {
      expect( (function() {Storage({});})).to.throw(Error, 'Need to provide MySQL connection information.');
    });
  });

  describe('Interface test', function () {
    it('storage should adhere to the interface', function () {
      expect(Storage({host:'localhost'}).teams.get).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).teams.save).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).teams.all).to.not.equal(undefined);

      expect(Storage({host:'localhost'}).channels.get).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).channels.save).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).channels.all).to.not.equal(undefined);

      expect(Storage({host:'localhost'}).users.get).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).users.save).to.not.equal(undefined);
      expect(Storage({host:'localhost'}).users.all).to.not.equal(undefined);
    });
  });

  describe('Data retrieving and manipulation', function () {

    it('channel data should be created, retrieved, updated and deleted', function(done) {
        var id = 'channelId';
        var initialData = {
            id: id,
            testField: 'testValue',
            testNumericField: 99
        };

        testDataRetrievingAndManipulation('channels', id, initialData, 'testField', done);
    });

    it('user data should be created, retrieved, updated and deleted', function(done) {
        var id = 'userId';
        var initialData = {
            id: id,
            access_token: 'some_access_token',
            scopes: '[]',
            team_id: 'teamId',
            user: 'username'
        };

        testDataRetrievingAndManipulation('users', id, initialData, 'access_token', done);
    });

    it('team data should be created, retrieved, updated and deleted', function(done) {
        var id = 'teamId';
        var initialData = {
            id: id,
            createdBy: 'userId',
            name: 'testName',
            url: 'teamUrl',
            token: 'someToken',
            bot: 'myBot',
        };

        testDataRetrievingAndManipulation('teams', id, initialData, 'token', done);
    });

  });
});