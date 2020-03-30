#!/bin/bash

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

. ../../config.sh

eval "$(ssh-agent -s)"	
chmod 400 ../keys/ec2-ssh	
ssh-add ../keys/ec2-ssh

SCRIPT="cd eosio-react-app; git pull origin devops; ./start.sh"
echo $SCRIPT

ssh -o "StrictHostKeyChecking no" "ubuntu@"$SERVER_DOMAIN "${SCRIPT}"