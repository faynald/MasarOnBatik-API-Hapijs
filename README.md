# MasarOnBatik API - Hapi.js

`Hapi.js` is a `Node.js` framework for building web APIs, offering strong configuration tools and simplified development. With built-in features for routing, authentication, and error handling, it enables efficient creation of stable and scalable web services. If you are looking for expressjs version, go to this [repo](https://github.com/faynald/MasarOnBatik-API).

## Tech Stack
- Hapi.js - Node.js framework for building web APIs, offering strong configuration tools and simplified development.
- Sequelize - Node.js ORM for simplified interaction with relational databases like MySQL, PostgreSQL, and SQLite.
- MySQL - Popular relational database system widely used in Node.js development for database.
- Dotenv - Library used to manage environment variables in Node.js applications.
- UUID - Universally Unique Identifier used to generate unique identifiers in Node.js applications.
- Basic-ftp - Node.js module for basic file transfer operations using FTP protocol.

## Running project locally on Windows

You need to have [Node.js](https://nodejs.org) and [Xampp](https://www.apachefriends.org/) installed.

### Setup database and FTP
1. Start apache, mysql, and filezilla on Xampp Control Panel
2. Add new database on phpmyadmin
3. Add new user on filezilla 

### Create .env

```sh
# Database setup
DATABASE
DB_USERNAME
DB_PASSWORD
DB_HOST
DB_PORT
DB_DIALECT

# Your url: localhost or ip address
HOST

# Your filezilla setup
FTP_HOST
FTP_USERNAME
FTP_PASSWORD
```

### Install dependencies

```sh
npm install
```

### Run server

```sh
npm run start
```

## Make requests

Create user :

```sh
http POST http://localhost:5000/user nama='Farhan' email='farhan@gmail.com' password='farhan' telepon='081234567890'
```

Login :

```sh
http POST http://localhost:5000/user email='farhan@gmail.com' password='farhan'
```

## TO DO

- [X] Create README.md
- [ ] Add error handling for every routes
- [ ] Encrypt password
- [ ] JWT

## Contributing to Project

- Just fork this repository and contribute back using pull requests.
- Any contributions, large or small, major features, bug fixes, are welcomed and appreciated but will be thoroughly reviewed.

## Author

Created and maintained by Farhan Reynaldi ([@faynald](https://github.com/faynald)).
