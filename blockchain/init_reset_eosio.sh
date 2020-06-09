#!/bin/bash

ARG1=$1

set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

# TODO
# - turn off state history plugin on Nodeos
# - change dfuse docker to control init from outside docker, put init in init script
# - turn off unnecessary dfuse services
# - change to allow for checking of keosd with errors
# - superfast init

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

if [ "$ARG1" == "superfast" ]; then
    echo "Skipping contract compilation and blockchain start"
else
    cd ../contracts/eosio.boot
    if [ -e eosio.boot.wasm ]
    then
        echo "eosio.boot already built"
    else
        ./build.sh
    fi

    cd ../eosio.bios
    ./build.sh

    cd ../eosio.token
    ./build.sh

    # allow for block production to start
    echo "Waiting 20s for blockchain node to start"
    sleep 20
fi

docker-compose exec dfuse /bin/bash /var/repo/blockchain/activate_features.sh
if [ $? -gt 0 ]
then
    exit 1
fi

docker-compose exec back-end npm run-script bootstrap
if [ $? -gt 0 ]
then
    exit 1
fi