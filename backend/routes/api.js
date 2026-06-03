const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "API is working" });
});

router.get('/products', (req, res) => {
    res.json([
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" }
    ]);
});

router.get('/users', (req, res) => {
    res.json([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" }
    ]);
});

router.get('/news', (req, res) => {
    res.json([
        { id: 1, title: "News 1" },
        { id: 2, title: "News 2" }
    ]);
});

module.exports = router;