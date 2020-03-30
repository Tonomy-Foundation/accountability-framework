#!/bin/bash

docker exec -it eosio pkill nodeos
docker-compose down
sudo rm ../temp/eosio/* -R
docker-compose up -d

cd ../contracts/eosio.boot
./build.sh

cd ../eosio.bios.default
./build.sh

# allow for block production to start
sleep 5

docker-compose exec eosio /bin/bash /var/repo/blockchain/activate_features.sh