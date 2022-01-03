# Mern Docker

## Containers

* `client` with React on `https://localhost:3000` route
* `server` with Express on `https://localhost:5000` route

## Usage

`docker-compose up -d` or for every container separately `docker-compose up -d client server`
* Or from root directory
`npm run build`, then :  
`npm run start` to launch server and client;
`npm run test` to test each sides;
`npm run test_coverage` to get tests coverage;