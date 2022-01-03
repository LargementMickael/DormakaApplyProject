# Mern Docker

## Containers

* `client` with React on `https://localhost:3000` route
* `server` with Express on `https://localhost:5000` route

## Usage

`npm i -g rimraf typescript react-scripts`, and `docker-compose up -d`
* Or from root directory
`npm run build`, then :  
`npm run start` to launch server and client;
`npm run start_client` to launch client with non-working server;
`npm run test` to test each sides;
`npm run test_coverage` to get tests coverage;