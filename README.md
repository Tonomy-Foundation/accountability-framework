# Social accountability

App to ...

## Prerequisites

- Linux debian distribution
- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Use install script _should work_ for debian distributions to install prerequesits as needed.

`./scripts/local/install_software.sh`

## Initialize project

Install all npm packages for FE and BE, and then initialize the blockchain with bootstrap account

`./app.sh init`

---------

IMPORTANT: The first time you run the app, it will initialize the blockchain, executing the following two files. If there is an errer displayed during this then please use the reset script below.

- `blockchain/init_reset_eosio.sh` - resets the blockchain and initializes an eosio v2.0 blockchain node with a system contract
- `back-end/test/bootstrap-accounts.js` - creates initial accounts and contracts on the blockchain with corresponding database information


## Run

`./app.sh up`

The following services will run

- port 4000: nodejs express middleware API
- port 3000: react app
- port 8888: nodeos http API to eosio blockchain node
- port 27017: mongodb database

### Production 

For production start

`./app.sh up prod`

This will run the react service on port 5000 with an optimized build

### Run front and back end

You can also run the back-end and front-end in a local environment by running `npm start` in their respective folders. See README.md for the local folder for more details. Services will be run on ports 3001 and 4001 for front and back end respectively.

## Stop

`./app.sh down`

## Reset

If there are errors during the first time you run the app, or you wish to reset the blockchain history.

`./app.sh reset`