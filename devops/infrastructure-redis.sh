#!/usr/bin/env bash

if [ "$(docker ps -aq -f name=redis)" ]; then

    echo "Redis container exists, starting ..."

    docker start redis

else

    echo "Creating Redis container ..."

    docker run --name redis --network linz -d redis:4.0-alpine

fi
