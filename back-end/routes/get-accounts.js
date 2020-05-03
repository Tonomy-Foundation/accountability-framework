var express = require('express');
const fetch = require('node-fetch');
const settings = require('../settings');

var router = express.Router();
/* GET acounts listing. */
router.get('/', function (req, res, next) {
  // const account_name = req.body.account_name
  const account_name = 'jack';
  const blockchainData = fetch(`${settings.eosio.network}/v1/chain/get_account`, {
    method: 'POST', timeout: 150, body: `account_name=${account_name}`
  })
    .then(res => res.json())
    .then(response => {
      if (response.code === 500) {
        throw new Error(response.message);
      }
    })

  // const dbData = mongoose.find();  
  Promise.all([blockchainData]).then(response => {
    console.log(response);
    const [blockchainResponse] = response;
    const additionalInfo = {
      type: 'person',
      organizations: [{
        accountName: String,
        name: String
      }]
    };
    res.json({ ...blockchainResponse, ...additionalInfo });
  }).catch(next);
});

module.exports = router;
