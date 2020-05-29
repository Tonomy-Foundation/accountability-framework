#!/bin/bash

docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/eosio.token/include -R resource -contract eosio.token -o /var/repo/contracts/eosio.token/eosio.token.wasm /var/repo/contracts/eosio.token/src/eosio.token.cpp