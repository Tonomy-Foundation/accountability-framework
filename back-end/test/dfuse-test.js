const Eosio = require('../services/Eosio');

let eosio = new Eosio();

async function main() {
    const response = await eosio.dfuseClient.stateTable("eosio.token", "jack", "accounts")
    console.log(response);
    process.exit(0)
}
main();

