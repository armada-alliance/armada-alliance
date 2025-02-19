#!/bin/bash
# 1- Install npm packages
npm install react-popper --save
npm install
# # 2 - Load environmental variables
# set -a && source .env && set +a
# 3 - Execute pre-build tasks to generate static data 
node src/scripts/tasks/all.js
# 4 - Launch Next dev (pass openssl-legacy-provider as NODE_OPTIONS if Node version >= 18) 
NODE_OPTIONS=--openssl-legacy-provider npm run dev

echo "Press [CTRL+C] to stop.."
while true
do
    sleep 3600
done