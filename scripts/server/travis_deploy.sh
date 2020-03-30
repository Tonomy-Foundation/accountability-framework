#!/bin/bash

. ../../config.sh

eval "$(ssh-agent -s)"	
chmod 400 ../keys/ec2-ssh	
ssh-add ../keys/ec2-ssh

SCRIPT="cd eosio-react-app; git pull origin devops; ./redeploy.sh"
echo $SCRIPT

ssh -o "StrictHostKeyChecking no" "ubuntu@"$SERVER_DOMAIN "${SCRIPT}"