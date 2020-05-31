#!/bin/bash

REACT_APP_NODE_ENV=development docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/eosio.boot/include -R resource -contract eosio.boot -o /var/repo/contracts/eosio.boot/eosio.boot.wasm /var/repo/contracts/eosio.boot/src/eosio.boot.cpp