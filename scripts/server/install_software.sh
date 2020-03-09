#!/bin/bash

# Use on server Ubuntu 18

# Docker already installed on AWS Ubuntu 18 image

# Docker Compose
sudo apt update
sudo apt install docker-compose -y
sudo usermod -aG docker ${USER}
# May need to reboot machine for sudo usermod to take effects

# node
sudo apt install nodejs npm -y