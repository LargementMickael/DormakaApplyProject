# Mern Docker

## Containers

* `dormakaba_client` with React on `https://localhost:3000` route
* `dormakaba_server` with Express on `https://localhost:5000` route

## Usage

`npm i -g rimraf typescript react-scripts`, and `docker-compose up -d`
* Or from root directory
`npm run build`, then :  
`npm run start` to launch server and client;
`npm run start_client` to launch client with non-working server;
`npm run test` to test each sides;
`npm run test_coverage` to get tests coverage;

## Deployment on EC2 Instance (running on Ubuntu 20.04 LTS)

Generating .ppk key from .pem key using PuttyGen<br>
Connecting to instance using SSH protocol with Putty<br>
`sudo apt update` Update existing packages<br>
`git clone https://github.com/LargementMickael/DormakaApplyProject.git` Cloning project into instance<br>
`sudo apt install docker.io` Install Docker<br>
`sudo apt install docker-compose` Install Docker Compose<br>
`sudo docker-compose up` Install Docker<br>
Update inbound security group and add 3000 and 5000 ports if you want to access containers<br>