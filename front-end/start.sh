#!/bin/bash

echo "REACT_APP_NODE_ENV"
echo "$REACT_APP_NODE_ENV"

if [ "$REACT_APP_NODE_ENV" == "production" ]
then
    REACT_APP_NODE_ENV="$REACT_APP_NODE_ENV" npm run-script build
    serve -s build
else
    REACT_APP_NODE_ENV="$REACT_APP_NODE_ENV" npm run-script docker
fi