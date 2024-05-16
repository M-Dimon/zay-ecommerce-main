# Zay eCommerce

## Setup

**Prerequisites**

* A database connection

1. Clone the project
2. Install dependencies with command `npm install`
3. Change database connection in `config/database.js`
4. Migrate and seed database by running `npm run db:reset`
5. Now run the project by running the command `npm start`
6. Check that the server is running by visitting `/status` and check that products are loaded by visitting `/shop`

## Commands

### Run in production mode

All commands can be found `./package.json`

```sh
npm start
```

### Run in development mode

```sh
npm run dev
```

### Migrate database

```sh
npm run db:migrate
```

### Seed database

```sh
npm run db:seed
```

## Environment Variables

The environment variables should be created on the server runtime

* `PORT` The active port the container is listening on
* `DB_HOSTNAME` The datbase host address
* `DB_USERNAME` The username for the database connection
* `DB_PASSWORD` The password for the database connection
* `DB_DATABASE` The database name

