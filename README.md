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

(may require `sudo`)
'docker-compose build'

* If you install new software dependancies you may need to stop and build again

## Initialize and reset blockchain

Do this before first run to initialize blockchain

And also use if you need to reset the blockchain

`./blockchain/init_reset_eosio.sh`

## Run

Ensure that `npm install` has been run in all node project folders. If new packages are installed then stop docker-compose, and run again with scripts from this readme.
(may require `sudo`)
'docker-compose up -d'

## Stop

'docker exec -it eosio pkill nodeos && docker-compose down'

If you do not stop nodeos (eosio) properly then you may need to replay the blockchain #TODO