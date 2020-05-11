const mongoose = require('mongoose');

module.exports = mongoose.Schema({
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