#!/bin/bash

cd ./back-end
npm install

cd ../front-end
npm install

cd ../blockchain
./init_reset_eosio.sh