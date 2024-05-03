#!/bin/bash

env=$(grep "ENV_EXEC=" .env | cut -d'=' -f2)

echo "> Running migrations..."
npm run typeorm migration:run 
echo "> Migrations concluded"

echo 

echo "> Running application..."
npm run start:"$env"
