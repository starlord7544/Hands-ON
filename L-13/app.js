const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Home Page')
})

app.get('/products', function (req, res) {
    res.json({
        id : 1 ,
        name : 'Product 1'
    })
})

app.get('/about', function (req, res) {
    res.send('About Page')
})

app.listen(6969, ()=> {
    console.log('________________Server Started________________')
})