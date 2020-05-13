const accountController = require('../controllers/accounts.controller');

/* GET acounts listing. */
module.exports = async function (req, res, next) {
  if (!req.body.account_name) {
    res.status(400);
    res.send({ message: 'req body should contain all the data!' });
    return;
  }

  // Data from blockchain proxy middleware is already added to body
  // const blockchainData = res.body;

  // Get data from mongodb
  const accountDoc = await accountController.findOne({ accountName: account_name });
  if (!accountDoc) {
    res.status(404);
    res.send({ message: "Not found account with account name " + account_name });
    return; // not sure if this is needed...
  }

  accountDocInfo = {
    accountType: accountDoc.accountType,
    organizations: accountDoc.organizations
  };
  req.blockchainResSent = true;
  res.send(...res.blockchainRes, ...accountDocInfo);
};