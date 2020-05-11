const mongoose = require('mongoose');
const AccountsSchema = require('../models/accounts.model');

const AccountsModel = mongoose.model('Accounts', AccountsSchema);

exports.insert = async function(doc) {
    const docToSave = new AccountsModel(doc);
    return await docToSave.save();
}

// Retrieve all Accounts from the database with a regex
exports.findAllWithRegex = async (regex) => {
  return AccountsModel.find({ title: { $regex: new RegExp(regex), $options: "i" } });
};

// Find a single Account
exports.findOne = async (condition) => {
  return await AccountsModel.findOne(condition).lean();
};

// Update an Account by the id in the request
exports.updateOneById = async (id, update) => {
  return await Accounts.findByIdAndUpdate(id, update, { useFindAndModify: false });
};