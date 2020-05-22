#!/bin/bash

ARG1=$1
ARG2=$2

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

function start {
    cd "$PARENT_PATH"
    mkdir temp
    export NODE_ENV="development"
    docker-compose up -d

    # TODO should remove logs process each time
    docker-compose logs -f -t >> ./temp/docker-compose.log &
    
    INIT_FILE="$PARENT_PATH/temp/init"
    if [ -f "$INIT_FILE" ]
    then
        echo "Blockchain already initialized"
    else
        echo "Blockchain will now be initialized"
        echo ""
        cd "$PARENT_PATH/blockchain"
        ./init_reset_eosio.sh
        touch "$INIT_FILE"
    fi
    upprint
}
    
function stop {
    cd "$PARENT_PATH"
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
    echo "    up install - installs dependancies and starts application components through docker compose"
    echo "    up prod    - starts application execution on production server"
    echo "    down       - stops application components gracefully"
    echo "    reset      - resets all application data including blockchain history and database"
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
    echo "For logs check the temp/* directory for .log file"
    echo "Also call docker-compose logs"
}

function reset {
    echo "This will reset the blockchain and all databases!!!"
    read -p "Do you want to continue (y/n)? " CHOICE
    if [ "$CHOICE" == 'y' ]
    then
        sudo rm "$PARENT_PATH/temp" -R
        mkdir "$PARENT_PATH/temp"
    fi
}

if [ -z "$ARG1" ]
then
    help
elif [ "$ARG1" == "up" ]
then
    if [ -z "$ARG2" ]
    then
        export NODE_ENV="development"
        start
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
elif [ "$ARG1" == "reset" ]
then
    reset
else
    help
fi