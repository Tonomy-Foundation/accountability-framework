# Social accountability

App to ...

## Prerequisites

- [Docker Compose](http://docs.docker.com/compose/)
- [Nodejs and npm](https://nodejs.org) - suggested to use [nvm](https://github.com/nvm-sh/nvm)

Use install script _should work_ for debian distributions to install prerequesits

`./scripts/local/install_software.sh`

## Initialize project and reset blockchain

Do this before running the first time or if you need to reset the blockchain. Note this will reset the blockchain state back to having a few accounts with all app history deleted.

`./start.sh reset`

## Run

`./start.sh`

## Stop

`./stop.sh`

If the the blockchain nodeo does not exit properly then you may need to reset the blockchain (see "Initialize npm projects and blockchain").