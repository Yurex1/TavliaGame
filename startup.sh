#!/bin/bash

pwd

ls ..

cd backend
node dist/src/main.js &

cd ../frontend
npm run start
