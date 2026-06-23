const db = require('../database/db');

const getProducts = (req, res) => {
    const sql = `
        SELECT products.*, categories.name AS category
        FROM products
        JOIN categories ON products.category_id = categories.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `
        SELECT products.*, categories.name AS category
        FROM products
        JOIN categories ON products.category_id = categories.id
        WHERE products.id = ?
    `;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Товар не найден' });
        }
        res.json(row);
    });
};

const getUsers = (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json(row);
    });
};

const getNews = (req, res) => {
    db.all('SELECT * FROM news', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

const getNewsById = (req, res) => {
    const id = parseInt(req.params.id);
    db.get('SELECT * FROM news WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json(row);
    });
};

const createProduct = (req, res) => {
    const { category_id, title, description, price, image_url } = req.body;
    const sql = `INSERT INTO products (category_id, title, description, price, image_url) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [category_id, title, description, price, image_url], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, category_id, title, description, price, image_url });
    });
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { category_id, title, description, price, image_url } = req.body;
    const sql = `
        UPDATE products
        SET category_id = ?, title = ?, description = ?, price = ?, image_url = ?
        WHERE id = ?
    `;
    db.run(sql, [category_id, title, description, price, image_url, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Товар не найден' });
        }
        res.json({ id, category_id, title, description, price, image_url });
    });
};

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Товар не найден' });
        }
        res.json({ message: 'Товар удалён' });
    });
};

const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        }

        const role = email === 'admin@mail.com' ? 'admin' : 'user';

        db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID, name, email, role });
            }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }
        res.json({ id: row.id, name: row.name, email: row.email, role: row.role });
    });
};

module.exports = {
    getProducts,
    getProductById,
    getUsers,
    getUserById,
    getNews,
    getNewsById,
    createProduct,
    updateProduct,
    deleteProduct,
    registerUser,
    loginUser
};