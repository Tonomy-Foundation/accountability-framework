# Social accountability

App to ...

## Prerequisites

- Linux debian distribution
- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Use install script _should work_ for debian distributions to install prerequesits as needed.

`./scripts/local/install_software.sh`

## Initialize project

Install all npm packages for FE and BE, and then initialize the blockchain with bootstrap account. You should only need to redo this once before the first time you run. You may also wish to reset and initialize if:

- bootstrap-accounts.js or other blockchain initialization fails
- smart contracts are changed
- the blockchain gets too big on your computer

```
./app.sh init
or
./app.sh init fast # same as above but does not reinstall software
or
./app.sh init superfast # same as above but does not recompile smart contract
```

---------

IMPORTANT: The first time you run the app, it will initialize the blockchain, executing the following two files. If there is an errer displayed during this then try run the `./app.sh init fast` again.

- `blockchain/init_reset_eosio.sh` - resets the blockchain and initializes an eosio v2.0 blockchain node with a system contract
- `back-end/test/bootstrap-accounts.js` - creates initial accounts and contracts on the blockchain with corresponding database information


## Run

`./app.sh up`

The following services will run

- http://localhost:3000:   React app
- http://localhost:4000:   Nodejs express middleware API
- http://localhost:8080:   Dfuse blockchain API and block explorer
- http://localhost:8081:   Dfuse blockchain dashboard
- http://localhost:8888:   Nodeos http API
- http://localhost:27017:  Mongodb database
- https://local.bloks.io/?nodeUrl=localhost:8888&systemDomain=eosio: bloks.io localblock explorer

### Production 

For production start

`./app.sh up prod`

This will run the react app on port 5000 with an optimized build

### Run front and back end

You can also run the back-end and front-end out of docker for debugging by running `npm start` in their respective folders. See README.md for the local folder for more details. Services will be run on ports 3001 and 4001 for front and back end respectively.

## Stop

`./app.sh down`

## Reset

Resets ALL blockchain history, mongodb data and logs!

`./app.sh reset`