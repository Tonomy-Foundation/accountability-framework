# Social accountability

App to ...

## Prerequisites

- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Install script _should work_ for debian linux distributions

`./scripts/local/install_software.sh`

## Initialize project and reset blockchain

Do this before running the first time or if you need to reset the blockchain. Note this will reset the blockchain state back to having a few accounts with all app history deleted.

`./redeploy.sh`

## Run

IMPORTANT to run with the `-d` command!

`docker-compose up -d`

## Stop

Note that BOTH commands are needed to safely stop the application, otherwise the blockchain node does not exit properly.

`docker exec -it eosio pkill nodeos & docker-compose down`

If the the blockchain nodeo does not exit properly then you may need to reset the blockchain (see "Initialize npm projects and blockchain")

If new packages are installed then you may need to stop and run again.
