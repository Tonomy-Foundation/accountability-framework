const db = require("../models");
const Accounts = db.accounts;

// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.accountName ||
    !req.body.name ||
    !req.body.accountType ||
    !req.body.organizations ||
    (req.body.organizations && req.body.organizations.some(org => !(org.accountName || org.name)))
  ) {
    res.status(400).send({ message: 'req body should contain all the data!' });
    return;
  }
  var newAccount = new Accounts({
    accountName: req.body.accountName,
    name: req.body.name,
    accountType: req.body.accountType,
    organizations: req.body.organizations,
  });

  newAccount.save().then(success => {
    console.log('new account created', success);
    res.send(success);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating new account.'
    });
  });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Accounts.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Account with an id
exports.findOne = (condition) => {
  return Accounts.findOne(condition);
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Accounts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Accounts with id=${id}. Maybe Accounts was not found!`
        });
      } else res.send({ message: "Accounts was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Accounts with id=" + id
      });
    });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Accounts.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Accounts with id=${id}. Maybe Accounts was not found!`
        });
      } else {
        res.send({
          message: "Accounts was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Accounts with id=" + id
      });
    });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
  Accounts.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Accountss were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Accounts
exports.findAllPublished = (req, res) => {
  Accounts.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};