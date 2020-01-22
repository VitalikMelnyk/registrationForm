### How to configure
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Steps for configure!
1. Install node modules for folder registration-form
```
npm install 
```
2. Install node modules for folder backend 
```
npm install
```
3. Start localhost:3000 with command line for folder registration-form
```
npm run start
```
if you want to use mysql how the main database: 
4. you need install mysql workbench or other tool for working with Mysql. I have 8.0 Mysql version.
5. You need change host, user, password if necessery in file constants.js
6. Create database configuration on folder database
```
node createDB.js
```
6. Start localhost:3002 with command line for folder app 
```
node appwithmysql.js
```
If you want to use mongoDB how the main database:
4. You need install mongoDB. I have 4.2.2 MongoDB version.
5. 
6. Start localhost:3002 with command line for folder app 
```
node appwithmongodb.js
```
7. Try to write user to database via the form.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
`