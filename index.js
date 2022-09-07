const { json } = require('express');
const express = require('express')
const fs = require('fs')
const products = require('./data/MOCK_DATA.json')
const app = express()

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log('OK, server is running on port ' + PORT);
})

app.get('/', (req, res) => {
    res.send('Ping')
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products/byName/:name', (req, res) => {
    const name = req.params.name;
    const filteredProducts = products.filter(product => product.name === name)
    if(filteredProducts.length === 0){
        return res.status(204).json(filteredProducts);
    }
    res.status(200).json(filteredProducts);
})

app.post('/products/add', (req, res) => {
    const newProduct = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    }
    if(products.some(product => product.id === newProduct.id)){
        return res.status(400).json({message: 'This product already exists'})
    }
    products.push(newProduct);
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(products), (error) => {
        if(error) res.status(500).json({message: 'internal error'})
    })
    res.status(200).json(newProduct);
})

app.delete('/products/delete/:id', (req, res) => {
    const id = req.params.id;
    const filteredProducts = products.filter(product => product.id == id)
    if(filteredProducts.length === 0){
        return res.status(204).json({message: "Product not found"});
    }
    const index = products.indexOf(filteredProducts[0]);
    products.splice(index, 1);
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(products), (error) => {
        if(error) res.status(500).json({message: 'internal error'})
    })
    res.status(200).json({message: "Product deleted"});
})


//console.log(products)