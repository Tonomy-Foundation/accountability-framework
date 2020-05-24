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
  await accountController.insert({
    accountName: "eosio",
    name: "System account",
    accountType: "organization"
  });

  await eosio.login(eosioAccount);

  async function createNewPerson(accountName, name, key, organizations) {
    let data = newPersonData("eosio", accountName, key, key);
    await eosio.myapi.transact("eosio", "newperson", data);
    await accountController.insert({
      accountName: accountName,
      name: name,
      accountType: "person",
      organizations: organizations,
    });
    console.log("Person ", accountName, " created");
  }
  
  async function createNewOrg(accountName, name, owners, thresholdPercent) {
    let data = newOrgData("eosio", accountName, owners, thresholdPercent);
    await eosio.myapi.transact("eosio", "neworg", data);
    await accountController.insert({
      accountName: accountName,
      name: name,
      accountType: "organization"
    });
    console.log("Organization ", accountName, " created");
  }

  await createNewPerson("yvo", "Yvo Hunink", settings.eosio.accounts.yvo.pubkey, [{accountName: "gov", name: "The Ministry of The Hague"}]);

  const ccOrgs = [{accountName: "thenewfork", name: "The New Fork Partners"}]
  await createNewPerson("jack", "Jack Tanner", settings.eosio.accounts.jack.pubkey, ccOrgs);
  await createNewPerson("kirsten", "Kirsten Coppoolse", settings.eosio.accounts.kirsten.pubkey, ccOrgs);
  await createNewPerson("matej", "Matej Ondrejka", settings.eosio.accounts.matej.pubkey, ccOrgs);

  await createNewOrg("thenewfork", "The New Fork Partners", ["jack", "kirsten", "matej"], 0.66);
  await createNewOrg("gov", "The Ministry of The Hague", ["yvo"], 0.66);

  eosioAccount = {
    pkey: settings.eosio.accounts.jack.pkey,
    name: "thenewfork",
    permission: "active"
  }

  await eosio.login(eosioAccount);
  await eosio.myapi.deploy("todolist", "../contracts/todolist");
  console.log("todolist contract deployed to account thenewfork");

  console.log("fin")
  process.exit(0)
})();

function newPersonData(creator, name, key, owner = "gov") {
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

function newOrgData(creator, name, owners, thresholdPercent) {
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