#!/bin/bash

SCRIPT = "git pull devops; ./redeploy.sh"
ssh -o "StrictHostKeyChecking no" "ubuntu@"$SERVER_DOMAIN"/eosio-react-app/" $SCRIPT