#!/bin/bash

ARG1=$1
ARG2=$2

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

function startdocker {
    ENV=$1
    echo "REACT_APP_NODE_ENV"
    echo "$ENV"

    cd "$PARENT_PATH"
    REACT_APP_NODE_ENV=$ENV docker-compose up -d

    # TODO should remove logs process each time
    # kill $(ps aux | grep -i "docker-compose logs" | awk '{print $2}')
    echo "Starting logging script with sudo privledges"
    sudo bash -c "REACT_APP_NODE_ENV=$ENV docker-compose logs -f -t >> '$PARENT_PATH/temp/docker-compose.log' &"
}

function start {
    ENV=$1
    startdocker $ENV
    upprint
}

function stop {
    cd "$PARENT_PATH"
    REACT_APP_NODE_ENV=development docker-compose down
}

function install {
    cd "$PARENT_PATH"
    docker-compose build

    cd "$PARENT_PATH/back-end"
    npm install

    cd "$PARENT_PATH/front-end"
    npm install
}

function init {
    SUPERFAST=$1
    reset
    startdocker "docker"

    cd "$PARENT_PATH/blockchain"
    ./init_reset_eosio.sh $SUPERFAST

    upprint
}

function help {
    echo ""
    echo "Usage:"
    echo "    app.sh [commands]"
    echo ""
    echo "Commands:"
    echo "    init           - installs all containers and packages, starts services and initalizes the blockchain"
    echo "    init fast      - starts services and initalizes the blockchain"
    echo "    init superfast - initializes the blockchain"
    echo "    install        - installs all containers and packages"
    echo "    up             - starts application components through docker compose"
    echo "    up prod        - starts application execution on production server"
    echo "    down           - stops application components gracefully"
    echo "    reset          - resets all application data including blockchain history and database"
}

function upprint {
    echo ""
    echo "Services running"
    echo "http://localhost:3000 - React app"
    echo "http://localhost:4000 - Express middleware service"
    echo "http://localhost:8080 - Dfuse blockchain API"
    echo "http://localhost:8081 - Dfuse blockchain dashboard"
    echo "http://localhost:8888 - Nodeos blockchain API"
    echo ""
    echo "For logs check the temp/* directory for *.log file"
    echo "Also call docker-compose logs"
}

function reset {
    stop
    echo "This will reset the blockchain and all databases!!!"
    read -p "Do you want to continue (y/n)? " CHOICE
    if [ "$CHOICE" == 'y' ]; then
        if [ -d "$PARENT_PATH/temp" ]
        then
            sudo rm "$PARENT_PATH/temp" -R
        fi
    else
        exit 1
    fi
}

if [ -z "$ARG1" ]; then
    help
elif [ "$ARG1" == "up" ]
then
    if [ -z "$ARG2" ]; then
        start "docker"
    elif [ "$ARG2" == "prod" ]; then
        stop
        start "production"
    else
        help
    fi
elif [ "$ARG1" == "down" ]; then
    stop
elif [ "$ARG1" == "init" ]; then
    if [ "$ARG2" == "fast" ]; then
        stop
        init
    elif [ "$ARG2" == "superfast" ]; then
        init "superfast"
    else
        stop
        install
        init
    fi
elif [ "$ARG1" == "reset" ]; then
    reset
elif [ "$ARG1" == "install" ]; then
    stop
    install
else
    help
fi