#!/bin/bash

git clone https://github.com/theblockstalk/eosio-boilerplate.git
cat eosio-boilerplate/scripts/keys/ec2-ssh.pub >> ~/.ssh/authorized_keys

mkdir $HOME/project.git
cd $HOME/project.git
git init --bare
git worktree add $HOME/project.git-working-tree master

cp $HOME/eosio-boilerplate/scripts/post-receive $HOME/project.git/hooks/
chmod +x $HOME/project.git/hooks/post-receive