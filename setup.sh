#!/bin/bash
#docker exec -it eosio pkill nodeos && docker-compose down
#sudo rm -R ./temp/eosio
#docker-compose up -d

#sleep 15
install_eosio_boot() {
    git clone --branch add-boot-contract https://github.com/EOSIO/eosio.contracts.git
    # ./temp/eosio.contracts

}

docker-compose run -it install_eosio_boot
#eosio-cdt cd /var/repo/temp/eosio.contracts/contracts/eosio.boot && eosio-cpp -abigen -I include -R resource -contract eosio.boot -o eosio.boot.wasm src/eosio.boot.cpp
