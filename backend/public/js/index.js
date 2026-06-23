const container = document.querySelector(".products");

fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const mainIds = [1, 5, 6, 10];
    data = data.filter(p => mainIds.includes(p.id));
    data.forEach(product => {
      const card = document.createElement("article");
      card.classList.add("card");
      const link = `html/product.html?id=${product.id}`;
      card.innerHTML = `
        <img src="${product.image_url}" alt="${product.title}">
        <a href="${link}"><h3>${product.title}</h3></a>
        <p>${product.price.toLocaleString()} ₸</p>
        <button class="add-to-cart">В КОРЗИНУ</button>
      `;

      card.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product.title, product.price, product.image_url);
        this.textContent = '✓ ДОБАВЛЕНО';
        this.classList.add('btn-added');
        setTimeout(() => {
          this.textContent = 'В КОРЗИНУ';
          this.classList.remove('btn-added');
        }, 1500);
      });

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки товаров:', err);
    container.innerHTML = '<p>Не удалось загрузить товары.</p>';
  });