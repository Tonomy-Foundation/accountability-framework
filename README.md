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

For production start

`./app.sh up prod`

To (re)install npm packages and start

`./app.sh up install`

## Stop

`./app.sh down`

If the the blockchain nodeo does not exit properly then you may need to reset the blockchain (see "Initialize npm projects and blockchain").