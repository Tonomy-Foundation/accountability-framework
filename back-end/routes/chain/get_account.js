const accountController = require('../../controllers/accounts.controller');
// Eosio instantiation
const Eosio = require('../../services/Eosio');
const eosio = new Eosio();

/* GET acounts listing. */
module.exports = async function (req, res) {
  const accountName = req.body.account_name;
  if (!accountName) {
    res.status(400);
    res.send({ message: 'req body should contain all the data!' });
    return;
  }
  // TODO: replace this with Dfuse API
  const accountDoc = await accountController.findOne({ accountName: accountName });
  // Alternative to mongoDB
  const query = `account:eosio action:neworg (data.active.accounts.permission.actor:${accountName} OR data.owner.accounts.permission.actor:${accountName})`;
  let transactionRes = await eosio.dfuseClient.searchTransactions(query);
  if (!accountDoc) {
    res.status(404);
    res.send({ message: `Not found account with account name ${accountName}` });
    return; // not sure if this is needed...
  }


  const accountInfo = transactionRes.transactions
    .filter(transaction => transaction.lifecycle.transaction_status === "executed" && transaction.lifecycle.pub_keys)
    .map(transaction => {
      const transactionItem = trxItem.lifecycle;
      const accountInfo = transactionItem.execution_trace.action_traces[0].act.account;
      return accountInfo;
    });

  // accountDocInfo = {
  //   accountType: accountDoc.accountType,
  //   name: accountDoc.name,
  //   organizations: accountDoc.organizations
  // };

  let retObj = req.addBlockchainRes(accountInfo);
  res.send(retObj);
};