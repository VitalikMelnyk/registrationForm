### How to configure
Getting Started  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Steps for configure!
### Frontend
1. Install node modules for folder registration-form
```
npm install 
```
2. Start localhost:3000 with command line for folder registration-form
```
npm run start
```
### Backend
1. Install node modules for folder backend 
```
npm install
```
if you want to use **Mysql** how the main database: <br>
2. you need install mysql workbench or other tool for working with Mysql. I have 8.0 Mysql version.<br>
3. You need change host, user, password if necessery in file constants.js<br>
4. Create database configuration on folder mysqlDB
```
node createDB.js
```
5. Start localhost:3002 with command line for folder backend 
```
node index-mysql.js
```
If you want to use **mongoDB** how the main database:<br>
2. You need install mongoDB. I have 4.2.2 MongoDB version.<Br>
3. Start localhost:3002 with command line for folder backend
```
node index-mongodb.js
```

If you want to use **mongoDB Atlas** how the main database:<br>
2. All needed constants that you maybe need to change is located in folder mongo-cluster constants.js <br>
3. Start localhost:3002 with command line for folder backend
```
node index-mongodb-cluster.js
```


** Try to write user to database via the form.**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
`