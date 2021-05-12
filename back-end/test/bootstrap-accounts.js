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

    console.log("fin")
    process.exit(0)
};

Promise.resolve(main()).catch(err => {
    console.error(err)
    process.exit(1)
})

async function setupEosioAccount() {
    await eosio.myapi.deploy("eosio", "../contracts/eosio.bios");
    console.log("eosio.bios contract deployed");
    await accountController.insert({
        accountName: "eosio",
        name: "System governance",
        accountType: "organization"
    });
}