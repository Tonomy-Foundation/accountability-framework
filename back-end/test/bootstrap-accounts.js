const mongoose = require('mongoose');

const Eosio = require('../services/Eosio');
const settings = require('../settings');
const accountController = require('../controllers/accounts.controller');

let eosio = new Eosio();

async function main() {
    console.log("starting blockchain initialization");

    await mongoose.connect(settings.mongodb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to database");
    // Set up the system contract
    let eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    await eosio.login(eosioAccount);
    await setupEosioAccount();

    // Create some people
    eosio = new Eosio()
    await eosio.login(eosioAccount);
    await createNewPerson("yvo", "Yvo Hunink", settings.eosio.accounts.yvo.pubkey);
    await createNewPerson("hidde", "Hidde Kamst", settings.eosio.accounts.hidde.pubkey);
    await createNewPerson("tijn", "Tijn Kyuper", settings.eosio.accounts.tijn.pubkey);

    await createNewPerson("jack", "Jack Tanner", settings.eosio.accounts.jack.pubkey);
    await createNewPerson("kirsten", "Kirsten Coppoolse", settings.eosio.accounts.kirsten.pubkey);
    await createNewPerson("matej", "Matej Ondrejka", settings.eosio.accounts.matej.pubkey);

    // Create some new orgs
    await createNewOrg("thenewfork", "The New Fork Partners", ["jack", "kirsten", "matej"], 0.66);
    await createNewOrg("gov", "The Ministry of The Hague", ["hidde", "tijn", "yvo"], 0.66), [{ accountName: "eosio", name: "System governance" }, { accountName: "eosio.token", name: "System currency" }];
    await createNewOrg("eosio.token", "System currency", ["gov"], 0.66);

    // Update the system contract to be controlled by the government
    await updateEosioAuth();

    // Create the token contract and mint tokens to government
    await deploySetupToken();

    // Send some Euros around!
    await transferTokens("gov", "yvo", 350, "", settings.eosio.accounts.yvo.pkey);
    await transferTokens("gov", "hidde", 450, "", settings.eosio.accounts.yvo.pkey);
    await transferTokens("gov", "tijn", 500, "", settings.eosio.accounts.yvo.pkey);
    await transferTokens("gov", "thenewfork", 3000, "", settings.eosio.accounts.yvo.pkey);
    await transferTokens("thenewfork", "jack", 600, "", settings.eosio.accounts.jack.pkey);
    await transferTokens("thenewfork", "kirsten", 600, "", settings.eosio.accounts.jack.pkey);
    await transferTokens("thenewfork", "matej", 600, "", settings.eosio.accounts.jack.pkey);
    await transferTokens("kirsten", "jack", 50, "Bonus", settings.eosio.accounts.kirsten.pkey);
    await transferTokens("matej", "jack", 100, "Sneaky tip!", settings.eosio.accounts.matej.pkey);

    // Vote on some policies
    await voteOnPolicy("yvo", 1, "yes", settings.eosio.accounts.yvo.pkey);
    await voteOnPolicy("hidde", 1, "no", settings.eosio.accounts.hidde.pkey);
    await voteOnPolicy("hidde", 32, "abstain", settings.eosio.accounts.hidde.pkey);
    await voteOnPolicy("matej", 32, "yes", settings.eosio.accounts.matej.pkey);
    await voteOnPolicy("kirsten", 32, "no", settings.eosio.accounts.kirsten.pkey);
    await voteOnPolicy("matej", 1, "yes", settings.eosio.accounts.matej.pkey);

    console.log("fin")
    process.exit(0)
};

Promise.resolve(main()).catch(err => {
    console.error(err)
    process.exit(1)
})

async function voteOnPolicy(voter, policyId, vote, key) {
    eosioAccount = {
        pkey: key,
        name: voter,
        permission: "active"
    }
    await eosio.login(eosioAccount);
    await eosio.myapi.transact("eosio", "policyvote", {
        voter: voter,
        policy_id: policyId,
        vote: vote
    });
    console.log(voter + " voted " + vote + " in policy #" + policyId);
}

async function transferTokens(from, to, amount, memo, key) {
    eosioAccount = {
        pkey: key,
        name: from,
        permission: "active"
    }
    await eosio.login(eosioAccount);
    quant = amount.toString() + ".00 EUR";
    await eosio.myapi.transact("eosio.token", "transfer", {
        from: from,
        to: to,
        quantity: quant,
        memo: memo
    });
    console.log("Transfered " + quant + " from " + from + " to " + to);
}

async function deploySetupToken() {
    eosioAccount = {
        pkey: settings.eosio.accounts.yvo.pkey,
        name: "eosio.token",
        permission: "active"
    }
    await eosio.login(eosioAccount);
    await eosio.myapi.deploy("eosio.token", "../contracts/eosio.token");
    console.log("Token contract deployed");

    await eosio.myapi.transact("eosio.token", "create", {
        issuer: "gov",
        maximum_supply: "1000000000.00 EUR"
    });

    eosioAccount = {
        pkey: settings.eosio.accounts.yvo.pkey,
        name: "gov",
        permission: "active"
    }
    await eosio.login(eosioAccount);
    await eosio.myapi.transact("eosio.token", "issue", {
        to: "gov",
        quantity: "10000.00 EUR",
        memo: ""
    });
}

async function setupEosioAccount() {
    await eosio.myapi.deploy("eosio", "../contracts/eosio.bios");
    console.log("eosio.bios contract deployed");
    await accountController.insert({
        accountName: "eosio",
        name: "System governance",
        accountType: "organization"
    });
}

async function updateEosioAuth() {
    eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    await eosio.login(eosioAccount);
    let data = {
        account: "eosio",
        permission: "active",
        parent: "owner",
        auth: {
            accounts: [{
                permission: { actor: "gov", permission: "active" },
                weight: 1
            }],
            keys: [],
            threshold: 1,
            waits: []
        }
    }
    await eosio.myapi.transact("eosio", "updateauth", data);

    eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "owner"
    }
    await eosio.login(eosioAccount);
    data = {
        account: "eosio",
        permission: "owner",
        parent: "",
        auth: {
            accounts: [{
                permission: { actor: "gov", permission: "owner" },
                weight: 1
            }],
            keys: [],
            threshold: 1,
            waits: []
        }
    }
    await eosio.myapi.transact("eosio", "updateauth", data);
}

async function createNewPerson(accountName, name, key) {
    const data = newPersonData("eosio", accountName, key, key);
    await eosio.myapi.transact("eosio", "newperson", data);
    await accountController.insert({
        accountName: accountName,
        name: name,
        accountType: "person",
    });
    console.log("Person ", accountName, " created");
}

async function createNewOrg(accountName, name, owners, thresholdPercent) {
    const data = newOrgData("eosio", accountName, owners, thresholdPercent);
    await eosio.myapi.transact("eosio", "neworg", data);
    let updateAccount = {
        accountName: accountName,
        name: name,
        accountType: "organization",
    }
    await accountController.insert(updateAccount);
    console.log("Organization ", accountName, " created");
}

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