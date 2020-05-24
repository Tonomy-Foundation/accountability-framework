const mongoose = require('mongoose');

const Eosio = require('../services/Eosio');
const settings = require('../settings');
const accountController = require('../controllers/accounts.controller');

async function main() {
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
    name: "System governance",
    accountType: "organization"
  });

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
  
  async function createNewOrg(accountName, name, owners, thresholdPercent, organizations) {
    let data = newOrgData("eosio", accountName, owners, thresholdPercent);
    await eosio.myapi.transact("eosio", "neworg", data);
    let updateAccount = {
      accountName: accountName,
      name: name,
      accountType: "organization",
    }
    if (organizations) updateAccount.organizations = organizations
    await accountController.insert(updateAccount);
    console.log("Organization ", accountName, " created");
  }
  
  // Create some people
  await createNewPerson("yvo", "Yvo Hunink", settings.eosio.accounts.yvo.pubkey, [{accountName: "gov", name: "The Ministry of The Hague"}]);

  const ccOrgs = [{accountName: "todolist", name: "The New Fork Partners"}]
  await createNewPerson("jack", "Jack Tanner", settings.eosio.accounts.jack.pubkey, ccOrgs);
  await createNewPerson("kirsten", "Kirsten Coppoolse", settings.eosio.accounts.kirsten.pubkey, ccOrgs);
  await createNewPerson("matej", "Matej Ondrejka", settings.eosio.accounts.matej.pubkey, ccOrgs);

  // Create some new orgs
  await createNewOrg("todolist", "The New Fork Partners", ["jack", "kirsten", "matej"], 0.66);
  await createNewOrg("gov", "The Ministry of The Hague", ["yvo"], 0.66), [{accountName: "eosio", name: "System governance"}, {accountName: "eosio.token", name: "System currency"}];
  await createNewOrg("eosio.token", "System currency", ["gov"], 0.66);
  
  // Update the system contract to be controlled by the government
  eosioAccount = {
    pkey: settings.eosio.accounts.eosio.pkey,
    name: "eosio",
    permission: "active"
  }
  await eosio.login(eosioAccount);
  const data = {
    account: "eosio",
    permission: "active",
    parent: "owner",
    auth: {
      accounts: [{
        permission: {actor: "gov", permission: "active"},
        weight: 1
      }],
      keys: [],
      threshold: 1,
      waits: []
    }
  }
  console.log(data)
  await eosio.myapi.transact("eosio", "updateauth", data);
  eosioAccount = {
    pkey: settings.eosio.accounts.eosio.pkey,
    name: "eosio",
    permission: "owner"
  }
  await eosio.login(eosioAccount);
  const data = {
    account: "eosio",
    permission: "owner",
    parent: "",
    auth: {
      accounts: [{
        permission: {actor: "gov", permission: "owner"},
        weight: 1
      }],
      keys: [],
      threshold: 1,
      waits: []
    }
  }
  await eosio.myapi.transact("eosio", "updateauth", data);

  // Create the token contract
  eosioAccount = {
    pkey: settings.eosio.accounts.ygo.pkey,
    name: "gov",
    permission: "active"
  }

  await eosio.login(eosioAccount);
  await eosio.myapi.deploy("gov", "../contracts/eosio.token");
  console.log("Token contract deployed");

  console.log("fin")
  process.exit(0)
};

Promise.resolve(main()).catch(err => {
  console.error(err)
  process.exit(1)
})

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