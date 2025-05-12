#!/bin/sh

npm init -y
npm install express
npm install mongoose
npm install nodemon
mkdir src
mkdir src/controller
mkdir src/database
mkdir src/middlewares
mkdir src/models
mkdir src/routes
mkdir src/services
touch .env
touch .gitignore
touch src/app.js