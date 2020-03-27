#!/bin/bash

docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/eosio.bios.default/include -R resource -contract eosio.bios -o /var/repo/contracts/eosio.bios.default/eosio.bios.wasm /var/repo/contracts/eosio.bios.default/src/eosio.bios.cpp