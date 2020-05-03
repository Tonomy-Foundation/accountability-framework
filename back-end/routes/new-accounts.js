var express = require('express');
const fetch = require('node-fetch');
const settings = require('../settings');
const mongoose = require('mongoose');
var router = express.Router();

var accountsSchema = new mongoose.Schema(
  {
    // account name 1 to 14 chars with 1-5 numbers
    accountName: String,
    // business entity name, diff btw name and account name is, name corresponds to company name but accountName is kind of username
    // example: name: Facebook LLC, accountName: facebook
    name: String,
    // account type: person/organization
    accountType: {
      type: String,
      enum: ['person', 'organization'],
    },
    // detailf of a person/organization, is member of another organization?
    organizations: [{
      name: String,
      accountName: String
    }],
  },
  { timestamps: true }
);

var Accounts = mongoose.model('accounts', accountsSchema);

router.post('/', function (req, res, next) {
  var newAccount = new Accounts({
    accountName: 'jack',
    name: 'Jack Tanner',
    accountType: 'person',
    organizations: [{
      accountName: 'blockstalk',
      name: 'jack from blockstalk',
    }],
  });
  newAccount.save().then(success => {
    console.log('new account created', success);
    res.json(success);
  }, accountError => {
    console.log('new account creation failed', accountError);
    throw accountError;
  }).catch(next);
});

module.exports = router;
