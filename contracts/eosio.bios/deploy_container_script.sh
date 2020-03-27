#!/bin/bash

DEPLOY_ACCOUNT=$1
NODE_LOCATION=$2

if [ "$DEPLOY_ACCOUNT" = "" ]
then
    echo "Usage: deploy.sh account local||server"
    echo "e.g. deploy.sh test1 local"
    echo "e.g. deploy.sh test2 server"
    exit 1
elif [ "$NODE_LOCATION" != "local" ] && [ "$NODE_LOCATION" != "server" ]
then
    echo "Usage: deploy.sh account local||server"
    echo "e.g. deploy.sh test1 local"
    echo "e.g. deploy.sh test2 server"
    exit 1
fi

. /var/repo/config.sh

WALLET_PASSWORD=$(</data/wallet.txt)
cleos wallet unlock --password $WALLET_PASSWORD

if [NODE_LOCATION != "local"]
then
    NODE_URL="http://localhost:8888"
else
    NODE_URL="http://"$SERVER_DOMAIN":8888"
fi
cleos -u $NODE_URL set contract $DEPLOY_ACCOUNT /var/repo/contracts/eosio.bios eosio.bios.wasm eosio.bios.abi -p $DEPLOY_ACCOUNT"@active"