# Social accountability

App to ...

## Prerequisites

- Linux debian distribution
- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Use install script _should work_ for debian distributions to install prerequesits as needed.

`./scripts/local/install_software.sh`

## Initialize project and reset blockchain

Do this before running the first time or if you need to reset the blockchain. Note this will reset the blockchain state back to having a few accounts with all app history deleted.

`./app.sh up reset`

This will call two files used to boostrap the blockchain and database:

- `blockchain/init_reset_eosio.sh` - resets the blockchain and initializes an eosio v2.0 blockchain node with a system contract
- `back-end/test/bootstrap-accounts.js` - creates initial accounts and contracts on the blockchain with corresponding database information

## Run

`./app.sh up`

The following services will run

- port 4000: nodejs express middleware API
- port 3000: react app
- port 8888: nodeos http API to eosio blockchain node
- port 27017: mongodb database

## Run front and back end

You can also run the back-end and front-end in a local environment by running `npm start` in their respective folders. See README.md for the local folder for more details. Services will be run on ports 3001 and 4001 for front and back end respectively.

### Production run
For production start

`./app.sh up prod`

This will run the react service on port 5000 with an optimized build

### Reinstall run
To (re)install npm packages and start

`./app.sh up install`

## Stop

`./app.sh down`

If the the blockchain nodeo does not exit properly then you may need to reset the blockchain (see "Initialize npm projects and blockchain").