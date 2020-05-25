#!/bin/bash

echo "Node env"
echo "$NODE_ENV"

if [ "$NODE_ENV" == "production" ]
then
    npm run-script build
    serve -s build
else
    npm run-script docker
fi