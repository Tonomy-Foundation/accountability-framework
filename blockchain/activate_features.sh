#!/bin/bash

source /var/repo/config.sh
# docker-compose exec dfuse /bin/bash /var/repo/blockchain/activate_features.sh

set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

echo "Running wallet"
keosd &
sleep 0.1

echo "Creating key wallet"
cleos wallet create --file /data/wallet.txt
sleep 0.1

echo "Adding eosio private key"
PKEY_EOSIO="5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
cleos wallet import --private-key $PKEY_EOSIO
sleep 0.1

echo "Enable protocol feature pre-activation PREACTIVATE_FEATURE for eosio.contract v1.8+"
curl -X POST http://127.0.0.1:8888/v1/producer/schedule_protocol_feature_activations -d '{"protocol_features_to_activate": ["0ec7e080177b2c02b278d5088611686b49d739925a92d9bfcacd7fc6b74053bd"]}'
echo ""
sleep 0.7

echo "Load the eosio.boot contract so with activate action"
# https://eosio.stackexchange.com/questions/5235/error-while-deploying-eosio-system-contract-to-eosio-account-while-setting-up-a
cleos set contract eosio /var/repo/contracts/eosio.boot eosio.boot.wasm eosio.boot.abi -p eosio@active
sleep 0.1

echo "Activate the WTMSIG_BLOCK_SIGNATURES feature for eosio.contract v1.9+"
cleos push action eosio activate '{"feature_digest":"299dcb6af692324b899b39f16d5a530a33062804e41f09dc97e9f156b4476707"}' -p eosio@active
sleep 0.1

echo "Activate the GET_SENDER intrinsic"
cleos push action eosio activate '{"feature_digest":"f0af56d2c5a48d60a4a5b5c903edfb7db3a736a94ed589d0b797df33ff9d3e1d"}' -p eosio@active
sleep 0.1