#!/bin/bash

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

. ../../config.sh

SCRIPT="cd eosio-react-app; git pull origin devops; ./start.sh"
echo $SCRIPT

SSH_LOCATION="ubuntu@"$SERVER_DOMAIN
chmod 400 ../keys/ec2.pem
ssh -o "StrictHostKeyChecking no" -i ../keys/ec2.pem "ubuntu@"$SERVER_DOMAIN "${SCRIPT}"