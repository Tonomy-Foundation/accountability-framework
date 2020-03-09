# Social accountability

App to ...

## Prerequisites

Linux debian distribution

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

Install docker, nodejs and npm using scripts

`./scripts/local/install_software.sh`

or

`./scripts/server/install_software.sh`

## Initialize npm projects and blockchain

Do this before running the first time

`./initialize.sh`

Do this if you need to reset the blockchain state

`./blockchain/init_reset_eosio.sh`

## Run

If new packages are installed then stop docker-compose, and run again.

`docker-compose up -d`

## Stop

`docker exec -it eosio pkill nodeos`

`docker-compose down`

If you do not stop nodeos (eosio) properly then you may need to replay the blockchain #TODO