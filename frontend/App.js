const express = require('express')
const mathUtils = require('./mathUtils')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/home', (req, res) => {
    res.send('Hello to Home')
})

app.get('/home/aaryan', (req, res) => {
    res.send('Hello to Home sufiyaan')
})

let a = mathUtils.addNumbers(10,20)

app.listen(3001, () => {
    console.log("Node server is running!");
})