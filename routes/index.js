const express = require ('express');
const productRoutes = require('./products');
const providerRoutes = require('./providers');

const router = express.Router()

router.use("/products", productRoutes)
router.use("/providers", providerRoutes)

module.exports = router