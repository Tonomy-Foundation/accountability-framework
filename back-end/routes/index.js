var express = require('express');
var router = express.Router();

const accounts = require("../controllers/accounts.controller.js");
const getAccounts = require('./get-accounts');
/* GET root route */
router.get('/', function (req, res, next) {
  res.send('hiiii');
});

// Create a new accounts
router.post("/new-account", accounts.create);

// Retrieve all accountss
router.get("/get-accounts", getAccounts);

// Retrieve all published accountss
// router.get("/published", accounts.findAllPublished);

// Retrieve a single accounts with id
// router.get("/get-account/:id", accounts.findOne);

// Update a accounts with id
// router.put("/:id", accounts.update);

// Delete a accounts with id
// router.delete("/:id", accounts.delete);

// Create a new accounts
// router.delete("/", accounts.deleteAll);

module.exports = router;
