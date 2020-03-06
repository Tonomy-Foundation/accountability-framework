#!/bin/bash

docker exec -it eosio /bin/sh pkill nodeos
docker exec -it eosio /bin/sh nodeos -e -p eosio --data-dir /data/data-dir --config-dir /var/config --disable-replay-opts --plugin eosio::producer_api_plugin >> nodeos.log 2>&1 &
curl -X POST http://127.0.0.1:8888/v1/producer/get_supported_protocol_features -d '{}' | jq

# if features not activated:
# 1. rm ../temp/eosio -R
# 2. activate features
# 2a. docker run eosio /bin/sh
# 3. start nodeos again