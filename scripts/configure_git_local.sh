#!/bin/bash

eval "$(ssh-agent -s)"
# ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f keys/ec2-ssh > keys/ec2-ssh.pub
ssh-add keys/ec2-ssh

git remote add ec2 ubuntu@ec2-3-9-189-125.eu-west-2.compute.amazonaws.com:/home/ubuntu/project.git/
git push -u ec2 master
