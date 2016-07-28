"use strict";
var chai = require('chai');
var mysql = require('mysql');
var expect = chai.expect;


var config = {host: 'localhost', user: 'root', password: '', database: 'my_schema'};
var globalId = "-12345678";

describe('Botkit MySQL Storage', function() {

  var Storage;

  beforeEach(function() {
    Storage = require('../src/index.js');
  });

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
});