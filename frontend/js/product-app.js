const image = document.querySelector(".product-image");
const info = document.querySelector(".product-info");

let currentProduct = null;

fetch('http://localhost:3000/api/products/1')
  .then(res => res.json())
  .then(product => {
    currentProduct = product;

    image.innerHTML = `<img src="../${product.image_url}" alt="${product.title}">`;

    info.innerHTML = `
      <h1>${product.title}</h1>
      <p class="description">${product.description}</p>
      <h2>${product.price.toLocaleString()} ₸</h2>
      <button class="add-to-cart">В КОРЗИНУ</button>
    `;

    info.querySelector('.add-to-cart').addEventListener('click', function() {
      addToCart(product.title, product.price, `../${product.image_url}`);
      this.textContent = '✓ ДОБАВЛЕНО';
      this.classList.add('btn-added');
      setTimeout(() => {
        this.textContent = 'В КОРЗИНУ';
        this.classList.remove('btn-added');
      }, 1500);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки товара:', err);
    info.innerHTML = '<p>Не удалось загрузить товар.</p>';
  });

const defaultReviews = [
  {
    avatar: "Т",
    name: "ТОЛИК",
    text: "Очень удобные и лёгкие кроссовки.",
    date: "12.05.2024"
  },
  {
    avatar: "О",
    name: "ОЛЯ",
    text: "Стильный дизайн и комфортная подошва.",
    date: "08.05.2024"
  }
];

let reviews = JSON.parse(localStorage.getItem('productReviews') || 'null');
if (!reviews) {
  reviews = defaultReviews;
  localStorage.setItem('productReviews', JSON.stringify(reviews));
}

const container = document.querySelector(".review-cards");
const reviewInput = document.getElementById("reviewInput");
const reviewBtn = document.getElementById("reviewBtn");

function renderReviews() {
  container.innerHTML = "";
  reviews.forEach(review => {
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.innerHTML = `
      <div class="avatar">${review.avatar}</div>
      <div class="review-text">
        <h3>${review.name}</h3>
        <p>${review.text}</p>
      </div>
      <span>${review.date}</span>
    `;
    container.appendChild(card);
  });
}

reviewBtn.addEventListener("click", () => {
  const text = reviewInput.value.trim();
  if (text === "") return;
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const userName = currentUser ? currentUser.name.toUpperCase() : "ВЫ";
  const userAvatar = userName.charAt(0);
  const newReview = {
    avatar: userAvatar,
    name: userName,
    text: text,
    date: new Date().toLocaleDateString()
  };
  reviews.unshift(newReview);
  localStorage.setItem('productReviews', JSON.stringify(reviews));
  renderReviews();
  reviewInput.value = "";
});

renderReviews();