const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const settings = require('./settings');
const routes = require('./routes');
const blockchainProxy = require('./middleware/blockchainProxy');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Blockchain proxy
// Use the following array for paths that should not be proxied to the blockchain
const blockchainPathBlacklist = ['/new-account']
app.use(function(req, res, next) {
  if (!blockchainPathBlacklist.includes(res.path)) {
    blockchainProxy(req, res.next);
  }
  next();
});

// Extended and additional API endpoints
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.toString());
});

try {
  mongoose.connect(settings.URL.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (rej) => {
    if (rej) {
      console.error(rej.message);
      process.exit();
    }
    console.log("Connected to database");
    
    app.listen(4000, () => {
      console.log("Server listening on port 4000");
    });
  });
} catch (err) {
  console.error(err)
  process.exit();
}