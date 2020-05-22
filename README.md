# Social accountability

App to ...

## Prerequisites

- Linux debian distribution
- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Use install script _should work_ for debian distributions to install prerequesits as needed.

`./scripts/local/install_software.sh`

## Run

`./app.sh up`

For production start

`./app.sh up prod`

To (re)install npm packages and start

`./app.sh up install`

---------

IMPORTANT: The first time you run the app, it will initialize the blockchain, executing the following two files. If there is an errer displayed during this then please use the reset script below.

- `blockchain/init_reset_eosio.sh` - resets the blockchain and initializes an eosio v2.0 blockchain node with a system contract
- `back-end/test/bootstrap-accounts.js` - creates initial accounts and contracts on the blockchain with corresponding database information

## Stop

`./app.sh down`

## Reset

If there are errors during the first time you run the app, or you wish to reset the blockchain history.

`./app.sh reset`