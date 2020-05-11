const express = require('express');
const router = express.Router();
const asyncRouter = require('./middleware/asyncRouter');

const home = require('./routes/home');
const newAccount = require('./routes/new-account');
const getAccounts = require('./routes/get-accounts');

// Blockchain API extensions
router.post('/new-account', asyncRouter(newAccount));

// New API endpoints
router.get('/', asyncRouter(home));
router.get("/get-accounts", asyncRouter(getAccounts));

module.exports = router;
  