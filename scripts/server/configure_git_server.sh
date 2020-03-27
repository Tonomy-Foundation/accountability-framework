#!/bin/bash

cd $HOME
git clone https://github.com/Conscious-Cities/eosio-react-app.git
cat eosio-react-app/scripts/keys/ec2-ssh.pub >> ~/.ssh/authorized_keys

mkdir $HOME/project.git
cd $HOME/project.git
git init --bare

cp $HOME/eosio-react-app/scripts/server/post-receive $HOME/project.git/hooks/
chmod +x $HOME/project.git/hooks/post-receive

# NOW RUN configure_git_local.sh

git worktree add $HOME/working-tree-project.git devops
