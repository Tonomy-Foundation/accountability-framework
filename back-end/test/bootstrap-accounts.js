const mongoose = require('mongoose');

const Eosio = require('../services/Eosio');
const settings = require('../settings');
const accountController = require('../controllers/accounts.controller');

(async function main() {
  console.log("starting blockchain initialization");

  let eosioAccount = {
    pkey: settings.eosio.accounts.eosio.pkey,
    name: "eosio",
    permission: "active"
  }
  await mongoose.connect(settings.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Connected to database");
  
  const eosio = new Eosio();
  await eosio.login(eosioAccount);
  await eosio.myapi.deploy("eosio", "../contracts/eosio.bios");
  console.log("eosio.bios contract deployed");

  await eosio.login(eosioAccount);

  let data = newperson("eosio", "yvo", settings.eosio.accounts.yvo.pubkey, settings.eosio.accounts.yvo.pubkey);
  await eosio.myapi.transact("eosio", "newperson", data);
  await accountController.insert({
    accountName: "yvo",
    name: "yvo",
    accountType: "person",
    organizations: [{
      accountName: "gov",
      name: "gov",
    }],
  });
  console.log("Person yvo created");

  data = neworg("eosio", "gov", ["yvo"], 0.66);
  await eosio.myapi.transact("eosio", "neworg", data)
  console.log("Organization gov created");

  data = newperson("eosio", "jack", settings.eosio.accounts.jack.pubkey);
  await eosio.myapi.transact("eosio", "newperson", data)
  await accountController.insert({
    accountName: "jack",
    name: "jack tanner",
    accountType: "person",
    organizations: [{
      accountName: "todolist",
      name: "todolist org",
    }],
  });
  console.log("Person jack created");

  data = newperson("eosio", "kirsten", settings.eosio.accounts.kirsten.pubkey);
  await eosio.myapi.transact("eosio", "newperson", data)
  await accountController.insert({
    accountName: "kirsten",
    name: "kirsten",
    accountType: "person",
    organizations: [{
      accountName: "todolist",
      name: "todolist org",
    }],
  });
  console.log("Person kirsten created");

  data = newperson("eosio", "matej", settings.eosio.accounts.matej.pubkey);
  await eosio.myapi.transact("eosio", "newperson", data)
  await accountController.insert({
    accountName: "matej",
    name: "matej",
    accountType: "person",
    organizations: [{
      accountName: "todolist",
      name: "todolist org",
    }],
  });
  console.log("Person matej created");

  data = neworg("eosio", "todolist", ["jack", "kirsten", "matej"], 0.66);
  await eosio.myapi.transact("eosio", "neworg", data)
  console.log("Organization todolist created");

  eosioAccount = {
    pkey: settings.eosio.accounts.jack.pkey,
    name: "todolist",
    permission: "active"
  }

  await eosio.login(eosioAccount);
  await eosio.myapi.deploy("todolist", "../contracts/todolist");
  console.log("todolist contract deployed");

  console.log("fin")
  process.exit(0)
})();

function newperson(creator, name, key, owner = "gov") {
  let data = {
    creator: creator,
    name: name,
    owner: {
      threshold: 1,
      keys: [],
      accounts: [{
        permission: {
          actor: "gov",
          permission: "active"
        },
        weight: 1
      }],
      waits: []
    },
    active: {
      threshold: 1,
      keys: [{
        key: key,
        weight: 1
      }],
      accounts: [],
      waits: []
    }
  }
  if (owner !== "gov") {
    data.owner.accounts = []
    data.owner.keys = [{
      key: owner,
      weight: 1
    }]
  }
  return data;
}

function neworg(creator, name, owners, thresholdPercent) {
  let data = {
    creator: creator,
    name: name,
    owner: {
      threshold: Math.min(Math.floor(owners.length * thresholdPercent) + 1, owners.length),
      keys: [],
      accounts: [],
      waits: []
    },
    active: {
      threshold: 1,
      keys: [],
      accounts: [],
      waits: []
    }
  }

  for (owner of owners) {
    data.owner.accounts.push({
      permission: {
        actor: owner,
        permission: "active"
      },
      weight: 1
    })
    data.active.accounts.push({
      permission: {
        actor: owner,
        permission: "active"
      },
      weight: 1
    })
  }
  return data;
}