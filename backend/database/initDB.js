const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'project.db'), (err) => {
    if (err) return console.error('Ошибка подключения:', err.message);
    console.log('База данных подключена.');
});

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    email    TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role     TEXT NOT NULL DEFAULT 'user'
)`);

    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title       TEXT NOT NULL,
        description TEXT,
        price       INTEGER NOT NULL,
        image_url   TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id  INTEGER NOT NULL,
        user_id     INTEGER NOT NULL,
        review_text TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (user_id)    REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER NOT NULL,
        order_date   DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_amount INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id   INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity   INTEGER NOT NULL,
        FOREIGN KEY (order_id)   REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`, () => {
        console.log('Все таблицы созданы.');
        db.close();
    });
});