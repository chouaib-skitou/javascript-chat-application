# Chat Application

# Project Launch Steps

This README outlines the steps required to get the project up and running on your local machine.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Download it from [Node.js official website](https://nodejs.org/).
- **MongoDB**: A NoSQL database. Download and install it from [MongoDB official website](https://www.mongodb.com/try/download/community).

## Starting the MongoDB Server

Once MongoDB is installed, you need to start the MongoDB server. Follow the instructions provided by MongoDB during installation or refer to their [official documentation](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/) for more details.

## Setting Up the Backend

Navigate to the backend directory of the project and open a terminal. Run the following commands:

1. `npm update`: This command updates all the packages to their latest versions.
2. `npm install -g nodemon`: Installs Nodemon globally. Nodemon is a utility that monitors for any changes in your source and automatically restarts your server.
3. `nodemon server.js`: Starts the backend server using Nodemon.

## Setting Up the Frontend

Navigate to the frontend directory of the project and open a new terminal. Run the following commands:

1. `npm update`: Similar to the backend, this updates all the packages in the frontend.
2. `npm run serve`: Compiles and hot-reloads for development.
