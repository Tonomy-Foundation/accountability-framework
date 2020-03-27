#!/bin/bash

. ../../config.sh
SSH_LOCATION="ubuntu@"$SERVER_DOMAIN

chmod 400 ../keys/ec2.pem
ssh -i ../keys/ec2.pem $SSH_LOCATION