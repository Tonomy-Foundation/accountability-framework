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
    # Need to replace "_" with new line and "#" with space to get into correct .pem format from pure string env variable
    # EC2_PEM_1=`echo "$EC2_PEM"| tr "#" " "`
    # EC2_PEM_2=`echo "$EC2_PEM_1"| tr "_" "\n"`
    mkdir ../keys
    echo "$EC2_PEM" > ../keys/ec2.pem
    chmod 400 ../keys/ec2.pem
fi

SCRIPT="cd eosio-react-app; git pull origin master; ./start.sh prod"
echo "$SCRIPT"

SSH_LOCATION="ubuntu@"$SERVER_DOMAIN
echo "$SSH_LOCATION"
# ssh -o "StrictHostKeyChecking no" -i ../keys/ec2.pem $SSH_LOCATION "${SCRIPT}"
ssh -o "StrictHostKeyChecking no" -i ../keys/ec2.pem $SSH_LOCATION ls