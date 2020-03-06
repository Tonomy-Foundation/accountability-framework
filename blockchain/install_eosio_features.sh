#!/bin/bash
nodeos -e -p eosio --data-dir /data/data-dir --config-dir /var/config --disable-replay-opts --plugin eosio::producer_api_plugin >> nodeos.log 2>&1 &

# allow for block production to start
sleep 20

# Create a new wallet with the eosio and other keys
cleos wallet create --file ./wallet.txt
# eosio EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
cleos wallet import --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
# EOS6yRF1fKEzLireL2hzU1AhKkPwQ5UFcaXKK2TzYzMv5612an8ij
cleos wallet import --private-key 5Juf3PjcRDWmdgq4Tt84P69rRAYFJqw6GAMMCUYJHaXW7QoXFgP
# EOS7pu6NTNja3bDiGb3dimM5MBfFxrf6GGGvFYwf84JHeoUjsDpZw
cleos wallet import --private-key 5JXLJuTcbu6jJ6JAnhmkdH7grdzsUGnfp1iZaUeDJf2Z46EKLUW

# Enable protocol feature pre-activation PREACTIVATE_FEATURE for eosio.contract v1.8+
curl -X POST http://127.0.0.1:8888/v1/producer/schedule_protocol_feature_activations -d '{"protocol_features_to_activate": ["0ec7e080177b2c02b278d5088611686b49d739925a92d9bfcacd7fc6b74053bd"]}'

# Load the eosio.boot contract so with activate action
# https://eosio.stackexchange.com/questions/5235/error-while-deploying-eosio-system-contract-to-eosio-account-while-setting-up-a
cd ./eosio.contracts/contracts/eosio.boot
eosio-cpp -abigen -I include -R resource -contract eosio.boot -o eosio.boot.wasm src/eosio.boot.cpp
cleos set contract eosio ./ eosio.boot.wasm eosio.boot.abi -p eosio@active

# Activate the WTMSIG_BLOCK_SIGNATURES feature for eosio.contract v1.9+
cleos push action eosio activate '{"feature_digest":"299dcb6af692324b899b39f16d5a530a33062804e41f09dc97e9f156b4476707"}' -p eosio@active

# Activate the GET_SENDER intrinsic
cleos push action eosio activate '{"feature_digest":"f0af56d2c5a48d60a4a5b5c903edfb7db3a736a94ed589d0b797df33ff9d3e1d"}' -p eosio@active
