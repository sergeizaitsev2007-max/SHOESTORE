function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(title, price, img) {
  const cart = getCart();
  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, price, img, quantity: 1 });
  }
  saveCart(cart);
  updateCartCounter();
}

function updateCartCounter() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.innerHTML = total > 0
      ? `<span class="nav-text">КОРЗИНА </span>🛒 <span class="cart-counter">${total}</span>`
      : `<span class="nav-text">КОРЗИНА </span>🛒`;
  }
}

function renderCartModal() {
  const cart = getCart();
  const modal = document.querySelector('.modal');
  if (!modal) return;

  if (cart.length === 0) {
    modal.innerHTML = `
  <h2 style="text-align:center;">🛒 Корзина</h2>
  <p style="color:gray; text-align:center; margin: 20px 0;">Корзина пуста</p>
  <button class="modal-close cart-btn-primary" style="width:100%; margin-top:10px;">Закрыть</button>
`;
    bindClose(modal);
    return;
  }

  modal.innerHTML = `
    <h2 style="text-align:center;">🛒 Корзина</h2>
    <ul class="cart-list">
      ${cart.map((item, i) => `
        <li class="cart-item">
          <img src="${item.img}" alt="${item.title}">
          <div class="cart-item-info">
            <p class="cart-item-title">${item.title}</p>
            <div class="cart-item-qty">
              <button class="qty-btn qty-minus" data-index="${i}">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn qty-plus" data-index="${i}">+</button>
            </div>
            <p class="cart-item-price">${(item.price * item.quantity).toLocaleString()} ₸</p>
          </div>
          <div class="cart-item-actions">
            <button class="order-one-btn" data-index="${i}">Оформить</button>
            <button class="cart-remove" data-index="${i}">✕</button>
          </div>
        </li>
      `).join('')}
    </ul>
    <button class="modal-close cart-btn-primary" style="width:100%; margin-top:10px;">Закрыть</button>
  `;

  modal.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCart();
      c.splice(+btn.dataset.index, 1);
      saveCart(c);
      updateCartCounter();
      renderCartModal();
    });
  });

  modal.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCart();
      const idx = +btn.dataset.index;
      if (c[idx].quantity > 1) {
        c[idx].quantity -= 1;
      } else {
        c.splice(idx, 1);
      }
      saveCart(c);
      updateCartCounter();
      renderCartModal();
    });
  });

  modal.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCart();
      c[+btn.dataset.index].quantity += 1;
      saveCart(c);
      updateCartCounter();
      renderCartModal();
    });
  });

  modal.querySelectorAll('.order-one-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCart();
      const item = c[+btn.dataset.index];
      renderOrderForm(item, +btn.dataset.index);
    });
  });

  bindClose(modal);
}

function renderOrderForm(item, index) {
  const modal = document.querySelector('.modal');
  if (!modal) return;

  const totalPrice = item.price * item.quantity;

  modal.innerHTML = `
    <button class="cart-back-btn" id="backBtn">← Назад</button>
    <h2>Оформление</h2>
    <div class="order-product-preview">
      <img src="${item.img}" alt="${item.title}">
      <div>
        <p class="cart-item-title">${item.title}</p>
        <p style="color:gray; font-size:13px;">Количество: ${item.quantity} шт.</p>
        <p class="cart-item-price">${totalPrice.toLocaleString()} ₸</p>
      </div>
    </div>
    <div class="checkout-form">
      <label>Телефон</label>
      <input id="chkPhone" type="tel" placeholder="+7 (777) 000-00-00">
      <label>Адрес доставки</label>
      <input id="chkAddress" type="text" placeholder="Город, улица, дом">
      <div id="checkoutError" class="checkout-error" style="display:none;"></div>
    </div>
    <div class="cart-actions">
      <button class="modal-close cart-btn-secondary" style="border:1.5px solid #ccc; border-radius:12px; padding:12px 16px; font-size:14px; color:#555; background:transparent; cursor:pointer;">Отмена</button>
      <button id="confirmBtn" class="cart-btn-primary">Подтвердить ✓</button>
    </div>
  `;

  modal.querySelector('#backBtn').addEventListener('click', () => {
    renderCartModal();
  });

  modal.querySelector('#confirmBtn').addEventListener('click', () => {
    const phone = modal.querySelector('#chkPhone').value.trim();
    const address = modal.querySelector('#chkAddress').value.trim();
    const errBox = modal.querySelector('#checkoutError');

    if (!phone || !address) {
      errBox.textContent = '⚠️ Заполните все поля';
      errBox.style.display = 'block';
      return;
    }

    const c = getCart();
    c.splice(index, 1);
    saveCart(c);
    updateCartCounter();

    renderOrderSuccess(item, phone, address, totalPrice);
  });

  bindClose(modal);
}

function renderOrderSuccess(item, phone, address, totalPrice) {
  const modal = document.querySelector('.modal');
  if (!modal) return;

  const orderNum = Math.floor(Math.random() * 90000) + 10000;

  modal.innerHTML = `
    <div style="text-align:center; padding: 10px 0;">
      <div style="font-size:50px; margin-bottom:12px;">✅</div>
      <h2 style="margin-bottom:6px;">Заказ оформлен!</h2>
      <p style="color:gray; font-size:14px; margin-bottom:18px;">Заказ #${orderNum}</p>
      <div class="checkout-summary">
        <div class="checkout-item">
          <span>${item.title} × ${item.quantity}</span>
          <strong>${totalPrice.toLocaleString()} ₸</strong>
        </div>
        <div class="checkout-divider"></div>
        <div class="checkout-item">
          <span>Телефон</span>
          <strong>${phone}</strong>
        </div>
        <div class="checkout-item">
          <span>Адрес</span>
          <strong>${address}</strong>
        </div>
      </div>
      <button class="modal-close cart-btn-primary" style="width:100%; margin-top:18px;">Выйти</button>
    </div>
  `;

  bindClose(modal);
}

function bindClose(modal) {
  modal.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = document.getElementById('cartModal');
      if (overlay) overlay.classList.remove('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
});
