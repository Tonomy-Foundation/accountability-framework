#!/bin/bash

# Use on server Ubuntu 18

# Repo
git clone https://github.com/Conscious-Cities/eosio-react-app.git

# Check if Docker already installed on AWS Ubuntu 18 image
sudo systemctl status docker
sudo usermod -aG docker ${USER}

# If not
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install -y docker-ce
sudo systemctl status docker
sudo usermod -aG docker ${USER}

# Docker Compose
sudo apt update
sudo apt install docker-compose -y
sudo usermod -aG docker ${USER}
docker-compose --version

# nvm with latest node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# Close and open terminal again (via ssh)
nvm install node v13.12.0
sudo ln -s -f $NVM_DIR"/versions/node/v13.12.0/bin/npm" /usr/bin/npm
sudo ln -s -f $NVM_DIR"/versions/node/v13.12.0/bin/node" /usr/bin/node

# Good idea to restart the server