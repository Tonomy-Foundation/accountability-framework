const Eosio = require('../services/Eosio');

let eosio = new Eosio();

async function main() {
    const response = await eosio.dfuseClient.stateTable("eosio.token", "jack", "accounts");
    const balance = response.rows[0].json.balance;
    console.log("jack has a balance of " + balance);
    process.exit(0)
}
main();

