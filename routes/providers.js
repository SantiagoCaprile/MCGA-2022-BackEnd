const router = require('express').Router()
const Providers = require('../schemes/providers')

router.get('/', (req, res) => {
    Providers.find({isDeleted: false})
    .then(data => res.json(data))
    .catch(error => res.status(500).json({message: error}))
})

router.get('/:name', (req, res) => {
    const name = req.params.name;
    Providers.find({name: name})
    .then(data => {
        if(data.length == 0){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.json(data)
    })
    .catch(error => res.status(400).json({message: error}))
})

router.post('/add', (req, res) => {
    const newProvider = new Providers(req.body);
    newProvider
    .save()
    .then(data => res.status(201).json({message: "Provider created", data}))
    .catch(() => res.status(400).json({message: "Error"}))
})

router.put('/update/:id', (req, res) => { // probar con postman
    const id = req.params.id;
    Providers.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({message: "Provider updated", data}))
    .catch(() => res.status(400).json({message: "Error"}))
})

router.delete('/delete/:id', (req, res) => { // probar con postman
    const id = req.params.id;
    Providers.findByIdAndUpdate(id, {isDeleted: true})
    .then(data => res.status(204).json({message: "Provider deleted", data}))
    .catch(() => res.status(400).json({message: "Error"}))
})

router.put('/restore/:id', (req, res) => { // probar con postman
    const id = req.params.id;
    Providers.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({message: "Provider restored", data}))
    .catch(() => res.status(400).json({message: "Error"}))
})

module.exports = router