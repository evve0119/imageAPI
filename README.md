# imageAPI Documentation

<h2>Specification </h2>
<h3>Frontend: React</h3>
<h3>Backend: Express/Node.js</h3>
<h3>Database: Mongodb/Mongoose </h3>
<br/>

<h2>Demo video</h2>



<br/>


<h2>Initialize Project<h2>
<h3>With Docker</h3>
Open terminal and run the following steps:

1. To clean up previous docker image, please run

    `docker-compose down -v`


    `brew services stop mongodb-community`
2.
    `brew services start mongodb-community`

    `open -a docker`

    `cd imageAPI`

    `make run-dev` or `docker-compose up`

    Open browser, go to: http://localhost:3000/

<h3>Without Docker</h3>

1. Edit code in `server/index.js` and change the code as follow.

![Alt text](Screen%20Shot%202023-02-07%20at%2014.46.57.png)

2. You need to open two terminal, react, nodejs, mongodb need to be installed in advance.

    First terminal:

    `cd imageAPI/server`

    `npm install`

    `npm run start`

    Second terminal:

    `cd imageAPI/client`

    `npm install`

    `npm start`

    Open browser, go to: http://localhost:3000/

<br/>

<h2>Dockerfile</h2>

<h3>Frontend/ Backend image - node:16-slim</h3>

https://github.com/nodejs/docker-node/blob/3f8018043408490439723ed3b71ab5578d69ea70/16/buster-slim/Dockerfile

Database - mongo:4.4-bionic

https://hub.docker.com/layers/amd64/mongo/4.4.0-bionic/images/sha256-ebd31eaac273a9544a33387aa859b0a8676565340a40fc824fa7bda686f462f1?context=explore

<br/>

<h2>Structure Diagram</h2>

![Alt text](imageAPI.png)
