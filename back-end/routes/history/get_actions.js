const accountController = require('../../controllers/accounts.controller');

//TODO  delete me as using dfuse search transactions instead...

/* GET acounts listing. */
module.exports = async function (req, res) {
  if (!req.body.account_name || !req.body.offset || !req.body.pos) {
    res.status(400);
    res.send({ message: 'req body should contain all the data!' });
    return;
  }

  const blockchainData = req.blockchainRes;

  for(let action of blockchainData.actions) {
    // TODO
    // get the raw transaction and then work out whih person account signed it!
    const auth = action.action_trace.act.authorization[0].actor;

    if (auth === "gov")
      action.action_trace.act.authorization[0].actor = "yvo"
    if (auth === "thenewfork")
      action.action_trace.act.authorization[0].actor = "jack"
  }

  // let retObj = req.addBlockchainRes(accountDocInfo);
  res.send(blockchainData);
};