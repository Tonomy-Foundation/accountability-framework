# Social accountability

App to ...

## Prerequisites

Linux or Mac

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

## Build

'docker-compose build'

* If you install new software dependancies you may need to stop and build again

## Initialize npm projects and blockchain

Do this before running the first time:

`./initialize.sh`

Do this if you need to reset the blockchain state

`./blockchain/init_reset_eosio.sh`

## Run

If new packages are installed then stop docker-compose, and run again.

'docker-compose up -d'

## Stop

'docker exec -it eosio pkill nodeos && docker-compose down'

If you do not stop nodeos (eosio) properly then you may need to replay the blockchain #TODO