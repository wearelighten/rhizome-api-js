"use strict";

/**
 * Buttress API -
 *
 * @file app.test.js
 * @description
 * @author Chris Bates-Keegan
 *
 */

const Buttress = require('../lib/buttressjs');
const Config = require('./config');

Config.init();

describe('@app-basics', function() {
  this.timeout(2000);

  before(function(done) {
    done();
  });

  after(function(done) {
    done();
  });

  describe('Basics', function() {
    it('should return the app schema', function(done) {
      Buttress.App
        .getSchema()
        .then(function(schema) {
          schema.length.should.equal(4);
          schema[2].collection.should.equal('services');
          schema[2].name.should.equal('service');
          schema[2].properties.appProp1.__type.should.equal('string');
          schema[2].properties.appProp1.__required.should.equal(true);
          schema[2].properties.appProp1.__allowUpdate.should.equal(true);
          schema[2].properties.appProp5.__default.should.equal('pending');
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
