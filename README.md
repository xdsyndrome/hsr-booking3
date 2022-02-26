# hsr-booking3
 
### About the Project
Skeleton ticket booking website.

### Built With
* [React.js](https://reactjs.org/)

### Getting Started

#### Option 1: Running on Local Machine
* Clone Repository
* Run following command to start server
```
npm run build
npm run dev
```

* Open website via
http://localhost:3000/

#### Option 2: Running on Docker
* Build docker image
```
docker build -t tut3_2:latest .
```
* Run docker container
```
docker run --name container_tut -d -p 3000:3000 tut3_2:latest
```
