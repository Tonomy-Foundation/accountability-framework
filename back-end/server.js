const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const settings = require('./settings');
const routes = require('./routes');
const blockchainProxy = require('./middleware/blockchainProxy');
const asyncRouter = require('./middleware/asyncRouter');
const bodyParser = require('body-parser')

const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // unsure if still needed, as using body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text()); // needed to parse eosjs api into req.body
app.use(cookieParser());

// Blockchain proxy
// Use the following array for paths that should not be proxied to the blockchain
const blockchainPathBlacklist = ['/new-account']
app.use(asyncRouter(async function(req, res, next) {
  if (!blockchainPathBlacklist.includes(req.path)) {
    await blockchainProxy.pre(req, res, next);
  }
  next();
}));

// Extended and additional API endpoints
// app.use(routes);
app.post("/v1/chain/get_account", function (req, res) {
  const accountController = require('./controllers/accounts.controller');

  if (!req.body.account_name) {
    res.status(400);
    res.send({ message: 'req body should contain all the data!' });
    return;
  }

  // Get data from mongodb
  console.log("1")

  const fn = async function(obj) {
    await new Promise((res, rej) => {
      console.log("waiting 4s");
      setTimeout(() => {
        console.log("done")
        res()
      }, 4000)
    })
  }
  Promise.resolve(fn())

  Promise.resolve(accountController.findOne({ accountName: req.body.account_name }), (accountDoc) => {
    // control switches to next middleware here... before promise resolves
    console.log("2", accountDoc)
    
    res.send()
  })

  console.log('3')
})

// Return any blockchain data if not returned using a route
app.use(asyncRouter(async function(req, res, next) {
  if (!blockchainPathBlacklist.includes(req.path)) {
    await blockchainProxy.post(req, res, next);
  }
  next();
}));

// Error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.toString());
});

try {
  // mongoose.Promise = global.Promise;
  mongoose.connect(settings.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (rej) => {
    if (rej) {
      console.error(rej.message);
      process.exit();
    }
    console.log("Connected to database");
    
    app.listen(settings.port, () => {
      console.log("Server listening on port " + settings.port);
    });
  });
} catch (err) {
  console.error(err)
  process.exit();
}