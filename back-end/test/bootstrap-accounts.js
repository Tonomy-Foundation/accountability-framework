const Eosio = require('../services/Eosio');
const settings = require('../settings');

(async function main() {
    console.log("starting blockchain initialization");

    const eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    
    const eosio = new Eosio();
    await eosio.login(eosioAccount);
    
    console.log("fin")
})();
// # Create some people accounts
// cleos wallet import --private-key $PKEY_JACK
// cleos create account eosio jack $KEY_JACK

// cleos wallet import --private-key $PKEY_KIRSTEN
// cleos create account eosio kirsten $KEY_KIRSTEN

// cleos wallet import --private-key $PKEY_MATEJ
// cleos create account eosio matej $KEY_MATEJ

// cleos wallet import --private-key $PKEY_YVO
// cleos create account eosio yvo $KEY_YVO

// # Create some other entities
// PERMISSION1='{"permission":{"actor":"'
// PERMISSION2='","permission":"'
// PERMISSION3='"},"weight":1}'    
// addPerson() {
//     PERMISSION=$PERMISSION1$1$PERMISSION2$2$PERMISSION3
// }
// app() {
//     DATA1='{"creator":"jack","name":"app","owner":{"threshold":2,"keys":[],"accounts":['
//     DATA2='],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":['
//     DATA3='],"waits":[]}}'
//     DATA=$DATA1
    
//     addPerson "jack" "active"
//     DATA=$DATA$PERMISSION','
//     addPerson "kirsten" "active"
//     DATA=$DATA$PERMISSION','
//     addPerson "matej" "active"
//     DATA=$DATA$PERMISSION$DATA2
    
//     addPerson "jack" "active"
//     DATA=$DATA$PERMISSION','
//     addPerson "kirsten" "active"
//     DATA=$DATA$PERMISSION','
//     addPerson "matej" "active"
//     DATA=$DATA$PERMISSION$DATA3
//     echo $DATA
// }

// app
// cleos push action eosio "newaccount" $DATA -p jack@active

// OWNER="yvo"
// DATA='{"creator":"'$OWNER'","name":"gov","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

// OWNER="jack"
// DATA='{"creator":"'$OWNER'","name":"test1","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

// DATA='{"creator":"'$OWNER'","name":"test2","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

// DATA='{"creator":"'$OWNER'","name":"test3","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

// DATA='{"creator":"'$OWNER'","name":"test4","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

// DATA='{"creator":"'$OWNER'","name":"test5","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
// cleos push action eosio "newaccount" $DATA -p $OWNER"@active"