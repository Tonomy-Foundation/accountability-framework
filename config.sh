#!/bin/bash

echo "Creating shared environment variables"
export SERVER_DOMAIN="ec2-35-178-206-104.eu-west-2.compute.amazonaws.com"
export SERVER_HTTPS_DOMAIN=""

export REACT_APP_SERVER_DOMAIN="$SERVER_DOMAIN"