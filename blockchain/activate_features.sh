# Create a new wallet with the eosio and other keys
cleos wallet create --file ./data/wallet.txt
# eosio EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
EOSIO_KEY=EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
cleos wallet import --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

# Enable protocol feature pre-activation PREACTIVATE_FEATURE for eosio.contract v1.8+
curl -X POST http://127.0.0.1:8888/v1/producer/schedule_protocol_feature_activations -d '{"protocol_features_to_activate": ["0ec7e080177b2c02b278d5088611686b49d739925a92d9bfcacd7fc6b74053bd"]}'

sleep 1

# Load the eosio.boot contract so with activate action
# https://eosio.stackexchange.com/questions/5235/error-while-deploying-eosio-system-contract-to-eosio-account-while-setting-up-a
cleos set contract eosio /var/repo/contracts/eosio.boot eosio.boot.wasm eosio.boot.abi -p eosio@active

# Activate the WTMSIG_BLOCK_SIGNATURES feature for eosio.contract v1.9+
cleos push action eosio activate '{"feature_digest":"299dcb6af692324b899b39f16d5a530a33062804e41f09dc97e9f156b4476707"}' -p eosio@active

cleos set contract eosio /var/repo/contracts/eosio.boot.default eosio.bios.wasm eosio.bios.abi -p eosio@active

# Activate the GET_SENDER intrinsic
cleos push action eosio activate '{"feature_digest":"f0af56d2c5a48d60a4a5b5c903edfb7db3a736a94ed589d0b797df33ff9d3e1d"}' -p eosio@active

# Create some people accounts
cleos wallet import --private-key 5K5cPZHgJaFHWt3Fy4vgzc2WfLw3cLE4E1x5c6A2kx1pjL3mEg4
cleos create account eosio jack EOS7Jj43XvkrBiNw8Q6zUECcGK9ktbMv8jz6Vjn1qAid93389mEgr

cleos wallet import --private-key 5Kbbe6k8TT5ejHVvy4iiy2qQvt3MF43oMF7j6GqiQ6FHRT1fVLz
cleos create account eosio kirsten EOS57RkHk6FVCstEPJbm3ezfJ9wSGtKytvx4fZGj72qHEbHvQjy4j

cleos wallet import --private-key 5JJY2YCoMRVVFrYv8SffzdjcvVneFqHWKRz2DsZRBfEZjRWNgEM
cleos create account eosio matej EOS59cUZp45bh7hX2Q6V9ebCdBShQXmr14ANG1VZ55mESLipeCsCE

cleos wallet import --private-key 5KHnMjLZ1jk2ScP4eGHufa8S6SJUSJWTpUqKgsGycVGxHZDCidB
cleos create account eosio yvo EOS7bNT2DxZVdH2kEoZFkeuWA5KoT5koDW8aeSzczPHSF4EX8WxQs

# Create some other entities
PERMISSION1='{"permission":{"actor":"'
PERMISSION2='","permission":"'
PERMISSION3='"},"weight":1}'    
addPerson() {
    PERMISSION=$PERMISSION1$1$PERMISSION2$2$PERMISSION3
}
app() {
    DATA1='{"creator":"jack","name":"app","owner":{"threshold":2,"keys":[],"accounts":['
    DATA2='],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":['
    DATA3='],"waits":[]}}'
    DATA=$DATA1
    
    addPerson "jack" "active"
    DATA=$DATA$PERMISSION','
    addPerson "kirsten" "active"
    DATA=$DATA$PERMISSION','
    addPerson "matej" "active"
    DATA=$DATA$PERMISSION$DATA2
    
    addPerson "jack" "active"
    DATA=$DATA$PERMISSION','
    addPerson "kirsten" "active"
    DATA=$DATA$PERMISSION','
    addPerson "matej" "active"
    DATA=$DATA$PERMISSION$DATA3
    echo $DATA
}

app
cleos push action eosio "newaccount" $DATA -p jack@active

OWNER="yvo"
DATA='{"creator":"'$OWNER'","name":"gov","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

OWNER="yvo"
DATA='{"creator":"'$OWNER'","name":"test1","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

DATA='{"creator":"'$OWNER'","name":"test2","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

DATA='{"creator":"'$OWNER'","name":"test3","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

DATA='{"creator":"'$OWNER'","name":"test4","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"

DATA='{"creator":"'$OWNER'","name":"test5","owner":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"owner"},"weight":1}],"waits":[]},"active":{"threshold":1,"keys":[],"accounts":[{"permission":{"actor":"'$OWNER'","permission":"active"},"weight":1}],"waits":[]}}'
cleos push action eosio "newaccount" $DATA -p $OWNER"@active"