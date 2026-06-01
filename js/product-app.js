const product = {
  img: "../images/product/shoe9.jpg",
  title: "Wariror",
  description: "Это стильные кроссовки в современном спортивном стиле. Модель сочетает удобство, лёгкость и яркий дизайн.",
  price: 26000
};

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

const image = document.querySelector(".product-image");
image.innerHTML = `<img src="${product.img}" alt="${product.title}">`;

const info = document.querySelector(".product-info");
info.innerHTML = `
  <h1>${product.title}</h1>
  <p class="description">${product.description}</p>
  <h2>${product.price.toLocaleString()} ₸</h2>
  <button>В КОРЗИНУ</button>
`;

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
