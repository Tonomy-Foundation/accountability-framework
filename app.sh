#!/bin/bash

ARG1=$1
ARG2=$2

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

function start {
    cd "$PARENT_PATH"
    mkdir temp
    docker-compose up -d
}

function stop {
    cd "$PARENT_PATH"
    docker exec -it eosio pkill nodeos
    docker-compose down
}

function install {
    cd "$PARENT_PATH"
    docker-compose build

    cd "$PARENT_PATH/back-end"
    npm install

    cd "$PARENT_PATH/front-end"
    npm install
}

function help {
    echo ""
    echo "Usage:"
    echo "    app.sh [commands]"
    echo ""
    echo "Commands:"
    echo "    up         - starts application components through docker compose"
    echo "    up reset   - starts application components through docker compose and initializes and resets the blockchain and database"
    echo "    up install - installs dependancies and starts application components through docker compose"
    echo "    up prod    - starts application execution on production server"
    echo "    down       - stops application components gracefully"
}

if [ -z "$ARG1" ]
then
    help
elif [ "$ARG1" == "up" ]
then
    if [ -z "$ARG2" ]
    then
        stop
        export NODE_ENV="development"
        start
        sleep 5
        xdg-open http://localhost:3000
        xdg-open https://local.bloks.io/account/eosio?nodeUrl=localhost%3A8888&systemDomain=eosio
    elif [ "$ARG2" == "reset" ]
    then
        stop
        install
        cd "$PARENT_PATH/blockchain"
        export NODE_ENV="development"
        ./init_reset_eosio.sh
    elif [ "$ARG2" == "install" ]
    then
        stop
        install
        export NODE_ENV="development"
        start
    elif [ "$ARG2" == "prod" ]
    then
        stop
        install
        export NODE_ENV="production"
        start
    else
        help
    fi
elif [ "$ARG1" == "down" ]
then
    stop
else
    help
fi