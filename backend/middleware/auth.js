const db = require('../database/db');

function requireRole(role) {
    return (req, res, next) => {
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({ error: 'Необходима авторизация' });
        }

        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка сервера' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Пользователь не найден' });
            }

            if (user.role !== role) {
                return res.status(403).json({ error: 'Доступ запрещён: недостаточно прав' });
            }

            req.user = user;
            next();
        });
    };
}

module.exports = { requireRole };