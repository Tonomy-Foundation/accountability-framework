#!/bin/bash

# RUN 1ST PART OF configure_git_server.sh

eval "$(ssh-agent -s)"
# ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f keys/ec2-ssh > keys/ec2-ssh.pub
chmod 400 ../keys/ec2-ssh
ssh-add ../keys/ec2-ssh

. ../../config.sh

git remote remove ec2
git remote add ec2 "ubuntu@"$SERVER_DOMAIN":/home/ubuntu/project.git"
git push -u ec2 master

# RUN 2ND PART OF configure_git_server.sh