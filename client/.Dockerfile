# *** Dockerfile for React client Kodify project ***

FROM node:16-stretch-slim

# Create and set App directory
WORKDIR /usr/app

#Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#Copy app to container
COPY . .

# Expose on port 3000
EXPOSE 3000

# Run yarn start
CMD [ "yarn","start" ]