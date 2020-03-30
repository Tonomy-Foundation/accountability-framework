#!/bin/bash

docker exec -it eosio pkill nodeos
docker-compose down

cd ./back-end
npm install

cd ../front-end
npm install

cd ../blockchain
./init_reset_eosio.sh