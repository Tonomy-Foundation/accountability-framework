#!/bin/bash

# Use on server Ubuntu 18

# Docker already installed on AWS Ubuntu 18 image

# Docker Compose
sudo apt update
sudo apt install docker-compose -y
sudo usermod -aG docker ${USER}

# nvm with latest node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

## Reboot and then run
# nvm install node v13.12.0
# sudo ln -s -f $NVM_DIR"/versions/node/v13.12.0/bin/npm" /usr/bin/npm
# sudo ln -s -f $NVM_DIR"/versions/node/v13.12.0/bin/node" /usr/bin/node