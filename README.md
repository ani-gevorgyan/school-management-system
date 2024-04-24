# School-Management-System

This is a simple school system management application. This application uses Graphql Api for data fetching and data mutation. <br />
The application uses RestApi for authentication (signup, login). These requests are provided below in the postman link. <br />
The application uses prisma ORM for interacting with MySql database.<br />
You can find all the necessary env variables in the .env.example file.<br />

#### Available Scripts

In the project directory, you can run:

##### `npm install` 

which installs all the necessary packages.

#### Database setup

To generate the schema.prisma from separate models run:<br />

##### `npm run gen:schema `

To synchronize your Prisma schema with your database schema run: <br />

##### `npx prisma db push`

To generate prisma client to interact with database models run: <br />

##### `npx prisma generate  `

### Start server
In the app directory run.<br />
##### `npm run start:dev`

This runs the server in development environment. <br />
The server will reload if you make any changes. <br />


## Postman link

Here is the postman workspace link for all the available requests. <br />
https://www.postman.com/gold-space-386125/workspace/school-management-system

