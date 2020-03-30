#!/bin/bash

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

docker exec -it eosio pkill nodeos
docker-compose down

cd ./back-end
npm install

cd ../front-end
npm install

cd ../blockchain
./init_reset_eosio.sh