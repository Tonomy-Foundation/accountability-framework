#!/bin/bash

ARG1=$1

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

docker exec -it eosio pkill nodeos
docker-compose down

cd ./back-end
npm install

cd ../front-end
npm install

if [ "$ARG1" == "reset" ]
then
    cd ../blockchain
    export NODE_ENV="development"
    ./init_reset_eosio.sh
elif [ "$ARG1" == "prod" ]
then
    export NODE_ENV="production"
    docker-compose up -d
else
    export NODE_ENV="development"
    docker-compose up -d
    sleep 5
    xdg-open http://localhost:3000
    xdg-open https://local.bloks.io/account/eosio?nodeUrl=localhost%3A8888&systemDomain=eosio
fi