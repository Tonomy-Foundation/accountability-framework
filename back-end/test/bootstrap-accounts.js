const Eosio = require('../services/Eosio');
const settings = require('../settings');

(async function main() {
    console.log("starting blockchain initialization");

    let eosioAccount = {
        pkey: settings.eosio.accounts.eosio.pkey,
        name: "eosio",
        permission: "active"
    }
    
    const eosio = new Eosio();
    await eosio.login(eosioAccount);
    await eosio.myapi.deploy("eosio", "../contracts/eosio.bios");
    console.log("eosio.bios contract deployed");

    await eosio.login(eosioAccount);
    
    let data = newperson("eosio", "yvo", settings.eosio.accounts.yvo.pubkey, settings.eosio.accounts.yvo.pubkey);
    await eosio.myapi.transact("eosio", "newperson", data);
    console.log("Person yvo created");

    data = neworg("eosio", "gov", ["yvo"], 0.66);
    await eosio.myapi.transact("eosio", "neworg", data)
    console.log("Organization gov created");

    data = newperson("eosio", "jack", settings.eosio.accounts.jack.pubkey);
    await eosio.myapi.transact("eosio", "newperson", data)
    console.log("Person jack created");

    data = newperson("eosio", "kirsten", settings.eosio.accounts.kirsten.pubkey);
    await eosio.myapi.transact("eosio", "newperson", data)
    console.log("Person kirsten created");

    data = newperson("eosio", "matej", settings.eosio.accounts.matej.pubkey);
    await eosio.myapi.transact("eosio", "newperson", data)
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
})();

function newperson(creator, name, key, owner="gov") {
    let data = {
        creator: creator,
        name: name,
        owner: {
            threshold:1,
            keys:[],
            accounts:[{
                permission: {
                    actor:"gov",
                    permission:"active"
                },
                weight:1
            }],
            waits:[]
        },
        active: {
            threshold:1,
            keys:[{
                key: key,
                weight: 1
            }],
            accounts:[],
            waits:[]
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
            threshold: Math.min(Math.floor(owners.length * thresholdPercent)+1, owners.length),
            keys:[],
            accounts:[],
            waits:[]
        },
        active: {
            threshold:1,
            keys:[],
            accounts:[],
            waits:[]
        }
    }
    
    for (owner of owners) {
        data.owner.accounts.push({
            permission: {
                actor: owner,
                permission:"active"
            },
            weight:1
        })
        data.active.accounts.push({
            permission: {
                actor: owner,
                permission:"active"
            },
            weight:1
        })
    }
    return data;
}
// # Create some people accounts
// cleos create account eosio jack $KEY_JACK
// cleos create account eosio kirsten $KEY_KIRSTEN
// cleos create account eosio matej $KEY_MATEJ
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