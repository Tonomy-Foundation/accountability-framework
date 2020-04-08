#!/bin/bash

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

source ../../config.sh

if [ -z "$EC2_PEM" ]
then
    echo "Using existing key"
else
    echo "Adding server key"
    # echo $EC2_PEM
    echo $EC2_PEM > ../keys/ec2.pem
    chmod 400 ../keys/ec2.pem
fi

SCRIPT="cd eosio-react-app; git pull origin master; ./start.sh"
echo $SCRIPT

SSH_LOCATION="ubuntu@"$SERVER_DOMAIN
#ssh -o "StrictHostKeyChecking no" -i ../keys/ec2.pem $SSH_LOCATION "${SCRIPT}"
ssh -o "StrictHostKeyChecking no" -i ../keys/ec2.pem $SSH_LOCATION -v