const router = require('express').Router()
const Products = require('../schemes/products')

router.get('/', (req, res) => {
    Products.find({isDeleted: false})
    .then(data => res.json(data))
    .catch(error => res.status(500).json({message: error}))
})

router.get('/:name', (req, res) => {
    const name = req.params.name;
    Products.find({name: name})
    .then(data => {
        if(data.length == 0){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.json(data)
    })
    .catch(error => res.status(500).json({message: error}))
})

router.post('/add', (req, res) => {
    const newProduct = new Products(req.body);
    newProduct
    .save()
    .then(data => res.status(200).json({message: "Product created", data}))
    .catch(() => res.status(500).json({message: "Error"}))
})

module.exports = router