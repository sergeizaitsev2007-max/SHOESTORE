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
      <h2>🛒 Корзина</h2>
      <p>Ваша корзина пуста</p>
      <button class="modal-close">Закрыть</button>
    `;
  } else {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    modal.innerHTML = `
      <h2>🛒 Корзина</h2>
      <ul class="cart-list">
        ${cart.map((item, i) => `
          <li class="cart-item">
            <img src="${item.img}" alt="${item.title}">
            <div>
              <p>${item.title}</p>
              <p>${item.price.toLocaleString()} ₸ × ${item.quantity}</p>
            </div>
            <button class="cart-remove" data-index="${i}">✕</button>
          </li>
        `).join('')}
      </ul>
      <p class="cart-total">Итого: ${total.toLocaleString()} ₸</p>
      <button class="modal-close">Закрыть</button>
    `;

    modal.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = getCart();
        cart.splice(btn.dataset.index, 1);
        saveCart(cart);
        updateCartCounter();
        renderCartModal();
      });
    });
  }

  modal.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
});