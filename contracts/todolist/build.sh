#!/bin/bash

docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/todolist/include -R resource -contract todolist -o /var/repo/contracts/todolist/todolist.wasm /var/repo/contracts/todolist/src/todolist.cpp