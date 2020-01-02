const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connect = require('./database')
const port = 3002


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World444!'))

app.post('/users', (req, res) => {
    // console.log(11111, req)
    console.log('Got body:', req.body);
    
    return res.sendStatus(200);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



