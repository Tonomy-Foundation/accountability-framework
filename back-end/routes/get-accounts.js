const fetch = require('node-fetch');
const settings = require('../settings');
const accounts = require("../controllers/accounts.controller.js");
const winston = require('winston');


/* GET acounts listing. */
module.exports = function (req, res, next) {
  if (!req.body.account_name) {
    res.status(400).send({ message: 'req body should contain all the data!' });
    return;
  }
  // 1 calling blockchain API
  // TODO: replace below fetch call with eosio object
  const account_name = req.body.account_name
  const blockchainData = fetch(`http://localhost:8888/v1/chain/get_account`, {
    method: 'POST', timeout: 150, body: `account_name=${account_name}`
  })
    .then(res => res.json())
    .then(response => {
      winston.log('debug', response);
      if (response.code === 500) {
        throw new Error(response.message);
      }
    });
  // 2 get data from mongodb
  const dbData = accounts.findOne({ accountName: account_name });
  // TODO: no need of promise.all as one is async another one is eosio object
  Promise.all([blockchainData, dbData]).then(response => {
    const [blockchainResponse, dbResponse] = response;
    if (!dbResponse || !blockchainResponse) {
      res.status(404).send({ message: "Not found Account with account name " + account_name });
    }

    const additionalInfo = {
      accountType: dbResponse.accountType,
      organizations: dbResponse.organizations
    };

    res.json({ ...blockchainResponse, ...additionalInfo });
  }).catch(err => {
    winston.log('debug', err);
    res
      .status(500)
      .send({ message: "Error retrieving Account with account name=" + account_name })
  });
};
