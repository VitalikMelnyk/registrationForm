const express = require('express')
const app = express()
const connect = require('./database')
const port = 3002




app.get('/', (req, res) => res.send('Hello World444!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



