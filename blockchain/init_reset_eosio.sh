#!/bin/bash

docker exec -it eosio pkill nodeos
docker-compose down
sudo rm ../temp/eosio/* -R
docker-compose up -d

cd ../contracts/eosio.boot
if [ -e eosio.boot.wasm ]
then
    echo "eosio.boot already built"
else
    ./build.sh
fi

cd ../eosio.bios.default
if [ -e eosio.bios.wasm ]
then
    echo "eosio.bios already built"
else
    ./build.sh
fi

# allow for block production to start
echo "Waiting for blockchain node to start"
sleep 10

docker-compose exec eosio /bin/bash /var/repo/blockchain/activate_features.sh