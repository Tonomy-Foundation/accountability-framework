const express = require('express');
const router = express.Router();
const asyncRouter = require('./middleware/asyncRouter');

const home = require('./routes/home');
const newAccount = require('./routes/new-account');
const getAccounts = require('./routes/get-accounts');

// Blockchain API extensions
router.post("/get-accounts", asyncRouter(getAccounts));
router.get('/', asyncRouter(home));

// New API endpoints
router.post('/new-account', asyncRouter(newAccount));

module.exports = router;
  