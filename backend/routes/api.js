const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireRole } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.json({ message: "API is working" });
});

router.get('/products',        productController.getProducts);
router.get('/products/:id',    productController.getProductById);

router.post('/products',       requireRole('admin'), productController.createProduct);
router.put('/products/:id',    requireRole('admin'), productController.updateProduct);
router.delete('/products/:id', requireRole('admin'), productController.deleteProduct);

router.get('/users',           requireRole('admin'), productController.getUsers);
router.get('/users/:id',       requireRole('admin'), productController.getUserById);

router.post('/users/register', productController.registerUser);
router.post('/users/login',    productController.loginUser);

router.get('/news',            productController.getNews);
router.get('/news/:id',        productController.getNewsById);

module.exports = router;