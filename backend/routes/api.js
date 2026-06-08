const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', (req, res) => {
    res.json({ message: "API is working" });
});

router.get('/products',     productController.getProducts);
router.get('/products/:id', productController.getProductById);

router.get('/users',        productController.getUsers);
router.get('/users/:id',    productController.getUserById);

router.get('/news',         productController.getNews);
router.get('/news/:id',     productController.getNewsById);

module.exports = router;
