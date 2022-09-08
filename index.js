const { json } = require('express');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes')

const PORT = 3000;

mongoose.connect('mongodb+srv://santiagocaprile:adminpass@cluster0.nvws2rh.mongodb.net/?retryWrites=true&w=majority'
).then( () => {
    console.log('DB OK');
    app.listen( PORT, () => console.log('Server OK - PORT: ' + PORT));
    }
)
.catch((error) => console.log('DB Failed' + error))

app.use(express.json());

app.use(router)

app.get('/', (req, res) => {
    res.send('Ping')
})