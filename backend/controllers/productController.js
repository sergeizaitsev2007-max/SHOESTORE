const products = [
    { id: 1, title: "Wariror",             price: 26000, category: "Sneakers" },
    { id: 2, title: "Respect VK32",        price: 14000, category: "Casual"   },
    { id: 3, title: "Mattini",             price: 15200, category: "Sport"    },
    { id: 4, title: "Hitch Snickers",      price: 20000, category: "Sneakers" },
    { id: 5, title: "Bmai Cardon 3.0 Ultra", price: 34000, category: "Sport"  },
    { id: 6, title: "Audienz",             price: 23000, category: "Casual"   },
    { id: 7, title: "Balence Kids",        price: 65000, category: "Casual"   },
];

const users = [
    { id: 1, name: "Толик",  email: "tolik@mail.com"  },
    { id: 2, name: "Оля",    email: "olya@mail.com"   },
];

const news = [
    { id: 1, title: "Новая коллекция лета 2025",   category: "collection", date: "2025-05-01" },
    { id: 2, title: "Большая летняя распродажа",    category: "sale",       date: "2025-04-15" },
    { id: 3, title: "Поступление Bmai Cardon 3.0",  category: "collection", date: "2025-03-20" },
    { id: 4, title: "Скидки до 50% на Casual",      category: "sale",       date: "2025-02-10" },
];

const getProducts = (req, res) => {
    let result = [...products];

    if (req.query.category) {
        result = result.filter(p =>
            p.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    if (req.query.sort === "asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === "desc") {
        result.sort((a, b) => b.price - a.price);
    }

    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit)) result = result.slice(0, limit);
    }

    res.json(result);
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id); // req.params
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: "Товар не найден" });
    }
    res.json(product);
};

const getUsers = (req, res) => {
    let result = [...users];

    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit)) result = result.slice(0, limit);
    }

    res.json(result);
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id); // req.params
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
};

const getNews = (req, res) => {
    let result = [...news];

    if (req.query.category) {
        result = result.filter(n =>
            n.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    if (req.query.sort === "asc") {
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (req.query.sort === "desc") {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit)) result = result.slice(0, limit);
    }

    res.json(result);
};

const getNewsById = (req, res) => {
    const id = parseInt(req.params.id); // req.params
    const item = news.find(n => n.id === id);
    if (!item) {
        return res.status(404).json({ error: "Новость не найдена" });
    }
    res.json(item);
};

module.exports = {
    getProducts,
    getProductById,
    getUsers,
    getUserById,
    getNews,
    getNewsById,
};
