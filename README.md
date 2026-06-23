# 👟 SHOESTORE

Интернет-магазин обуви с каталогом товаров, корзиной, личным кабинетом и административной панелью.

---

## Назначение

Веб-приложение позволяет:
- просматривать каталог обуви с фильтрацией по категории и сортировкой по цене
- добавлять товары в корзину и оформлять заказ
- регистрироваться и входить в личный кабинет
- администратору — добавлять, редактировать и удалять товары

---

## Стек технологий

- **Backend:** Node.js, Express 5
- **База данных:** SQLite (через пакет sqlite3)
- **Frontend:** HTML, CSS, JavaScript (vanilla)

---

## Структура проекта

```
ПЗ_40/
├── backend/
│   ├── app.js                  # Точка входа, запуск сервера
│   ├── package.json
│   ├── controllers/
│   │   ├── mainController.js
│   │   └── productController.js
│   ├── database/
│   │   ├── db.js               # Подключение к БД
│   │   ├── initDB.js           # Создание таблиц
│   │   └── project.db          # Файл базы данных SQLite
│   ├── middleware/
│   │   └── auth.js             # Проверка роли пользователя
│   ├── routes/
│   │   ├── api.js              # API маршруты
│   │   └── mainRoutes.js
│   └── public/                 # Статические файлы (раздаются сервером)
│       ├── index.html
│       ├── css/
│       ├── html/
│       ├── js/
│       └── images/
└── frontend/                   # Статическая копия для просмотра без сервера
```

---

## Зависимости

- Node.js версии 18 и выше
- npm (устанавливается вместе с Node.js)

Пакеты (устанавливаются автоматически):
- `express` ^5.2.1
- `sqlite3` ^6.0.1

---

## Установка и запуск

### 1. Установить зависимости

```bash
cd backend
npm install
```

### 2. Инициализировать базу данных (только при первом запуске)

```bash
node database/initDB.js
```

### 3. Запустить сервер

```bash
node app.js
```

Сервер запустится на: **http://localhost:3000**

---

## Страницы приложения

| Страница | URL |
|---|---|
| Главная | http://localhost:3000 |
| Каталог | http://localhost:3000/html/catalog.html |
| Товар | http://localhost:3000/html/product.html?id=1 |
| Личный кабинет | http://localhost:3000/html/profil.html |

---

## API

| Метод | Маршрут | Доступ | Описание |
|---|---|---|---|
| GET | /api/products | Все | Список товаров |
| GET | /api/products/:id | Все | Товар по ID |
| POST | /api/products | Admin | Добавить товар |
| PUT | /api/products/:id | Admin | Обновить товар |
| DELETE | /api/products/:id | Admin | Удалить товар |
| POST | /api/users/register | Все | Регистрация |
| POST | /api/users/login | Все | Вход |
| GET | /api/users | Admin | Список пользователей |
| GET | /api/news | Все | Новости |

---

## Администратор

Для получения прав администратора зарегистрируйтесь с email:

```
admin@mail.com
```

---

## База данных

Таблицы:
- `users` — пользователи (id, name, email, password, role)
- `categories` — категории товаров
- `products` — товары (id, category_id, title, description, price, image_url)
- `reviews` — отзывы на товары
- `orders` — заказы
- `order_items` — позиции заказа
