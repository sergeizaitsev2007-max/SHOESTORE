let products = [];

const CATEGORIES = [
  { id: 1, name: "Sport" },
  { id: 2, name: "Sneakers" },
  { id: 3, name: "Casual" }
];

const catalog = document.querySelector(".catalog");

function reloadProducts() {
  fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
      products = data;
      applyFilters();
    })
    .catch(err => {
      console.error('Ошибка загрузки товаров:', err);
      catalog.innerHTML = '<p>Не удалось загрузить товары.</p>';
    });
}

function categorySelectHTML(selectedId) {
  return CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${c.name}</option>`
  ).join('');
}

function renderEditForm(product, card) {
  card.innerHTML = `
    <div class="admin-form">
      <label>Название</label>
      <input type="text" class="edit-title" value="${product.title}">
      <label>Описание</label>
      <input type="text" class="edit-description" value="${product.description}">
      <label>Цена (₸)</label>
      <input type="number" class="edit-price" value="${product.price}">
      <label>Путь к картинке</label>
      <input type="text" class="edit-image" value="${product.image_url}">
      <label>Категория</label>
      <select class="edit-category">${categorySelectHTML(product.category_id)}</select>
      <div class="admin-form-buttons">
        <button class="save-btn">Сохранить</button>
        <button class="cancel-btn">Отмена</button>
      </div>
    </div>
  `;

  card.querySelector('.save-btn').addEventListener('click', () => {
    const updated = {
      category_id: parseInt(card.querySelector('.edit-category').value),
      title: card.querySelector('.edit-title').value,
      description: card.querySelector('.edit-description').value,
      price: parseInt(card.querySelector('.edit-price').value),
      image_url: card.querySelector('.edit-image').value
    };
    updateProductOnServer(product.id, updated)
      .then(() => reloadProducts())
      .catch(err => console.error('Ошибка обновления:', err));
  });

  card.querySelector('.cancel-btn').addEventListener('click', () => {
    applyFilters();
  });
}

function renderProducts(list) {
  catalog.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("card");
	const link = `product.html?id=${product.id}`;

    let adminControls = "";
    if (isAdmin()) {
      adminControls = `
        <div class="admin-controls">
          <button class="edit-btn">✏️ Изменить</button>
          <button class="delete-btn">🗑️ Удалить</button>
        </div>
      `;
    }

    card.innerHTML = `
      <img src="../${product.image_url}" alt="${product.title}">
      <div class="info">
        <h3>${product.title}</h3>
        <a href="${link}">
          <p>${product.description}</p>
        </a>
        <span>${product.category}</span>
      </div>
      <div class="price">
        <h3>${product.price.toLocaleString()} ₸</h3>
        <button class="add-to-cart">В КОРЗИНУ</button>
      </div>
      ${adminControls}
    `;

    card.querySelector('.add-to-cart').addEventListener('click', function() {
      addToCart(product.title, product.price, `../${product.image_url}`);
      this.textContent = '✓ ДОБАВЛЕНО';
      this.classList.add('btn-added');
      setTimeout(() => {
        this.textContent = 'В КОРЗИНУ';
        this.classList.remove('btn-added');
      }, 1500);
    });

    if (isAdmin()) {
      card.querySelector('.edit-btn').addEventListener('click', () => {
        renderEditForm(product, card);
      });

      card.querySelector('.delete-btn').addEventListener('click', () => {
        const overlay = document.getElementById('deleteModal');
        document.getElementById('deleteProductName').textContent = `"${product.title}"`;
        overlay.classList.add('active');

        document.getElementById('confirmDeleteBtn').onclick = () => {
          overlay.classList.remove('active');
          deleteProductFromServer(product.id)
            .then(() => reloadProducts())
            .catch(err => console.error('Ошибка удаления:', err));
        };

        document.getElementById('cancelDeleteBtn').onclick = () => {
          overlay.classList.remove('active');
        };
      });
    }

    catalog.appendChild(card);
  });
}

function applyFilters() {
  const searchInput = document.querySelector('.search input');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortSelect');

  let result = [...products];

  const searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    result = result.filter(p => p.title.toLowerCase().includes(searchValue));
  }

  const category = categoryFilter.value;
  if (category !== "all") {
    result = result.filter(p => p.category === category);
  }

  const sort = sortSelect.value;
  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  renderProducts(result);
}

function renderAddProductForm() {
  if (!isAdmin()) return;

  const wrapper = document.createElement("div");
  wrapper.classList.add("admin-add-wrapper");
  wrapper.innerHTML = `
    <button id="toggleAddForm">+ Добавить товар</button>
    <div class="admin-form" id="addProductForm" style="display:none;">
      <label>Название</label>
      <input type="text" id="newTitle" placeholder="Название товара">
      <label>Описание</label>
      <input type="text" id="newDescription" placeholder="Краткое описание">
      <label>Цена (₸)</label>
      <input type="number" id="newPrice" placeholder="Например: 15000">
      <label>Путь к картинке</label>
      <input type="text" id="newImage" placeholder="images/catalog/shoe5.jpg">
      <label>Категория</label>
      <select id="newCategory">${categorySelectHTML(null)}</select>
      <div class="admin-form-buttons">
        <button id="saveNewProduct">Добавить</button>
      </div>
    </div>
  `;

  catalog.parentNode.insertBefore(wrapper, catalog);

  document.getElementById('toggleAddForm').addEventListener('click', () => {
    const form = document.getElementById('addProductForm');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  });

  document.getElementById('saveNewProduct').addEventListener('click', () => {
    const newProduct = {
      category_id: parseInt(document.getElementById('newCategory').value),
      title: document.getElementById('newTitle').value,
      description: document.getElementById('newDescription').value,
      price: parseInt(document.getElementById('newPrice').value),
      image_url: document.getElementById('newImage').value
    };
    createProductOnServer(newProduct)
      .then(() => {
        document.getElementById('addProductForm').style.display = 'none';
        document.getElementById('newTitle').value = '';
        document.getElementById('newDescription').value = '';
        document.getElementById('newPrice').value = '';
        document.getElementById('newImage').value = '';
        reloadProducts();
      })
      .catch(err => console.error('Ошибка добавления:', err));
  });
}

renderAddProductForm();
reloadProducts();
