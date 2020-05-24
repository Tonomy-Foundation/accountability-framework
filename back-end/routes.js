const express = require('express');
const router = express.Router();
const asyncRouter = require('./middleware/asyncRouter');

const home = require('./routes/home');
const newAccount = require('./routes/new-account');
const getAccount = require('./routes/chain/get_account');
const getActions = require('./routes/history/get_actions');

// Blockchain API extensions
router.get('/', asyncRouter(home));
router.post("/v1/chain/get_account", asyncRouter(getAccount));
router.post("/v1/history/get_actions", asyncRouter(getActions));

// New API endpoints
router.post('/new-account', asyncRouter(newAccount));

module.exports = router;
  