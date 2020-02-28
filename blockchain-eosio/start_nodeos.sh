#!/bin/bash

mkdir .eosio
mkdir ./.eosio/eosio\ 2.0.3

nodeos -e -p eosio --plugin eosio::http_plugin --plugin eosio::chain_plugin --plugin eosio::producer_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --data-dir $HOME/.eosio/eosio\ 2.0.3/data --config-dir $HOME/.eosio/eosio\ 2.0.3/config --http-server-address=0.0.0.0:8888 --access-control-allow-origin=* --http-validate-host=false --max-transaction-time=200 --disable-replay-opts --contracts-console --filter-on=* --filter-out=eosio:onblock: >> $HOME/.eosio/eosio\ 2.0.3/nodeos.log 2>&1 &
