# *** Dockerfile for NodeJS backend Dormakaba project ***
FROM node:16-stretch-slim

# Create and set App directory
WORKDIR /usr/app

#Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

EXPOSE 5000

# Use nodemon
CMD [ "npm","run","serve"]