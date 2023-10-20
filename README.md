# Dans Job Portal - Backend

## Description

Job portal app created with MERN stack in mind using NodeJS (express) and MongoDB (mongoose). This backend app will manage authentication, job pagination, filter, and integrations to the frontend app and was built using Typescript.

## Features

- Simple user registration and login
- Job listing with pagination
- Job listing filter with `keyword search`, `location`, and `full time`
- Job details lookup based on job `id`

## Installation

```sh
// Clone the project repo
git clone git@gitlab.com:dansmp-ht-2/wilta.alvin/dans-recruitment-backend.git

// Initialize and installing the project
cd dans-recruitment-backend
npm install
```

## Usage

to run server with dev settings use `npm run dev`

build server with `npm run build`

start server with `npm start`

start test with `npm run test`

## Technical Features

- Basic authentication with **jwt** and **bcrypt** (login, register)
- Basic document creation using MongoDB as database with **mongoose**
- Separate configuration for development and prod environment
- Logging formatter with **pino**
- [ ] Unit testing with **mocha** and **chai**

## API Endpoints

| Method | Route          | Functionalities            | Queries/Parameters                                                                                                    | Require Auth? |
| ------ | -------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| GET    | /positions/:id | Get specific job           | N/A                                                                                                                   | &check;       |
| GET    | /ticket        | Fetch all available ticket | Queries: <br> -`page`: int <br> -`limit`: int <br> -`search`: str <br> -`location`: str <br> -`full_time`: str (bool) | &check;       |
| POST   | /auth/register | Register new user          | Params: <br> -`username`: str <br> -`password`: str                                                                   | &cross;       |
| POST   | /auth/login    | User login                 | Params: <br> -`username`: str <br> -`password`: str                                                                   | &cross;       |
| POST   | /auth/logout   | User logout                | N/A                                                                                                                   | &check;       |

## Layers in the server

[HTTP Endpoint] &rlarr; _[Middleware]_ &rlarr; [Controller] &rlarr; [Service] &rlarr; _[Mongoose Hooks]_ &rlarr; [Database]

Functionalities of each folder:
Folder Name | Description | Functionalities
------------|-------------|----------------
config | Constants for server configuration | declaring database url, environment, etc
constants | Reusable constants | Declaring constants that'll be used repeatedly
middlewares | Express middlewares | for repeated functions on multiple APIs, e.g. jwt/cookie authentication, session validation, etc
routes | All API routes | All routes and their respective middleware and callbacks
controller | Layer between _HTTP Request_ (or _middleware_) and services | Interface for handling req/res before sending it to worker (services)
services | API worker | All necessary operations before/after querying to database, make sure to THROW any errors, logging are optional whether you want to log it on controller or service for better debugging
interfaces | Typing for mongoose schema | Interface for typescript's typing to mongoose schemas
utils | functions to support services | All functions that can be separated from services to make it modular
models | field attribute of database schema | All hooks and schema structure will be defined here, e.g. whether if a field is required or not, reference to other models, etc
