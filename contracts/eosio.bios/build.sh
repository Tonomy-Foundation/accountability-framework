#!/bin/bash

docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/eosio.bios/include -R resource -contract eosio.bios -o /var/repo/contracts/eosio.boot/eosio.boot.wasm /var/repo/contracts/eosio.boot/src/eosio.bios.cpp