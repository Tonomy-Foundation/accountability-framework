#!/bin/bash

# Use on server Ubuntu 18

# Docker already installed on AWS Ubuntu 18 image

# Docker Compose
sudo apt update
sudo apt install docker-compose -y
sudo usermod -aG docker ${USER}
# May need to reboot machine for sudo usermod to take effects

# nvm with latest node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install node