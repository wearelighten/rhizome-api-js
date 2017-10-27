"use strict";

/**
 * Buttress API -
 *
 * @file config.js
 * @description
 * @author Chris Bates-Keegan
 *
 */

const Buttress = require('../lib/buttressjs');
const TestSchema = require('./schema.json');
const ObjectId = require('mongodb').ObjectId;

class Config {
  constructor() {
    this._initialised = false;
  }

  init() {
    if (this._initialised === true) {
      return;
    }
    this._initialised = true;

    Buttress.init({
      buttressUrl: process.env.BUTTRESS_TEST_API_URL,
      appToken: process.env.BUTTRESS_TEST_SUPER_APP_KEY,
      schema: TestSchema
    });

    before(function(done) {
      Promise.all([
        Buttress.initSchema(),
        Buttress.Campaign.removeAll(),
        Buttress.User.removeAll(),
        Buttress.Person.removeAll(),
        Buttress.Token.removeAllUserTokens(),
        Buttress.Company.removeAll(),
        Buttress.Contactlist.removeAll(),
        Buttress.Call.removeAll(),
        Buttress.Task.removeAll(),
        Buttress.Notification.removeAll(),
        Buttress.Appointment.removeAll(),
        Buttress.Service.removeAll(),
        Buttress.Contract.removeAll()
      ])
        .then(() => done())
        .catch(err => {
          if (err.statusCode) {
            console.log(`${err.statusCode}: ${err.statusMessage}`);
            return;
          }
          console.log(err);
        });
    });

    after(function(done) {
      done();
    });
  }

  createCompanies() {
    const companies = [
      {
        name: 'Company 1',
        locations: [{
          id: (new ObjectId()).toHexString(),
          name: 'HQ',
          address: '123 Acacia Avenue, Brixton',
          city: 'London',
          postCode: 'SW9 4DW',
          phoneNumber: '0205 123123'
        }],
        contacts: [{
          id: (new ObjectId()).toHexString(),
          name: 'Bananaman',
          role: 'Superhero',
          email: 'bananas@man.com',
          mobile: '07777 777777'

        }]
      },
      {
        name: 'Company 2',
        locations: [{
          id: (new ObjectId()).toHexString(),
          name: 'HQ',
          address: '123 Acacia Avenue, Brixton',
          city: 'London',
          postCode: 'SW9 4DW',
          phoneNumber: '0205 123123'
        }],
        contacts: [{
          id: (new ObjectId()).toHexString(),
          name: 'Bananaman',
          role: 'Superhero',
          email: 'bananas@man.com',
          mobile: '07777 777777'
        }]
      },
      {
        name: 'Company 3',
        locations: [{
          id: (new ObjectId()).toHexString(),
          name: 'HQ',
          address: '123 Acacia Avenue, Brixton',
          city: 'London',
          postCode: 'SW9 4DW',
          phoneNumber: '0205 123123'
        }],
        contacts: [{
          id: (new ObjectId()).toHexString(),
          name: 'Bananaman',
          role: 'Superhero',
          email: 'bananas@man.com',
          mobile: '07777 777777'
        }]
      },
      {
        name: 'Company 4',
        locations: [{
          id: (new ObjectId()).toHexString(),
          name: 'HQ',
          address: '123 Acacia Avenue, Brixton',
          city: 'London',
          postCode: 'SW9 4DW',
          phoneNumber: '0205 123123'
        }],
        contacts: [{
          id: (new ObjectId()).toHexString(),
          name: 'Bananaman',
          role: 'Superhero',
          email: 'bananas@man.com',
          mobile: '07777 777777'
        }]
      },
      {
        name: 'Company 5',
        locations: [{
          id: (new ObjectId()).toHexString(),
          name: 'HQ',
          address: '123 Acacia Avenue, Brixton',
          city: 'London',
          postCode: 'SW9 4DW',
          phoneNumber: '0205 123123'
        }],
        contacts: [{
          id: (new ObjectId()).toHexString(),
          name: 'Bananaman',
          role: 'Superhero',
          email: 'bananas@man.com',
          mobile: '07777 777777'
        }]
      }
    ];
    return Buttress.Company.saveAll({companies: companies})
      .then(companyIds => {
        return Buttress.Company.bulkLoad(companyIds);
      })
      .catch(err => {
        console.log(err);
      });
  }

  createUser() {
    let userAppAuth = {
      app: 'google',
      id: '12345678987654321',
      name: 'Chris Bates-Keegan',
      token: 'thisisatestthisisatestthisisatestthisisatestthisisatest',
      email: 'test@test.com',
      profileUrl: 'http://test.com/thisisatest',
      profileImgUrl: 'http://test.com/thisisatest.png'
    };
    return Buttress.Auth.findOrCreateUser(userAppAuth)
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = new Config();
