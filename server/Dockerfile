# *** Dockerfile for NodeJS backend Dormakaba project ***
FROM node:17.3-slim

# Create and set App directory
WORKDIR /usr/app

#Copy package.json and install dependencies
COPY package*.json ./
RUN npm install npm && npm install

COPY . .

EXPOSE 5000

# Use nodemon
CMD [ "npm","run","serve"]