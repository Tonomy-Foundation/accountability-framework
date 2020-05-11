const accountController = require('../controllers/accounts.controller');

module.exports = async function(req, res, next) {
  if (!req.body.accountName ||
    !req.body.name ||
    !req.body.accountType ||
    !req.body.organizations ||
    (req.body.organizations && req.body.organizations.some(org => !(org.accountName || org.name)))
  ) {
    res.status(400);
    res.send({ message: 'Req body should contain all the data!' });
    return;
  }

  const newAccount = await accountController.insert({
    accountName: req.body.accountName,
    name: req.body.name,
    accountType: req.body.accountType,
    organizations: req.body.organizations,
  });

  console.log('new account created', newAccount);
  res.send(success);
}