#!/bin/bash

docker exec -it eosio pkill nodeos
docker-compose down
sudo rm ../temp/eosio/* -R
docker-compose up -d

cd ../contracts/eosio.boot
./build.sh

cd ../contracts/eosio.bios.default
./build.sh

# allow for block production to start
sleep 10

docker exec -it eosio /bin/bash /var/repo/blockchain/activate_features.sh