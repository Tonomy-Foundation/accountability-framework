#!/bin/bash

echo "Resetting blockchain state and history"

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

docker-compose exec eosio pkill nodeos
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

cd ../eosio.bios
./build.sh

cd ../todolist
./build.sh

cd ../eosio.token
./build.sh

# allow for block production to start
echo "Waiting for blockchain node to start"
sleep 5

docker-compose exec eosio /bin/bash /var/repo/blockchain/activate_features.sh

docker-compose exec back-end npm run-script bootstrap