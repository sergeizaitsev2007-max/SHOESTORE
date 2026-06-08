const products = [
  {
    img: "../images/catalog/shoe5.jpg",
    title: "Wariror",
    description: "Удобные и стильные кроссовки для повседневной носки.",
    category: "Sneakers",
    price: 26000,
    link: "product.html"
  },
  {
    img: "../images/catalog/shoe6.jpg",
    title: "Respect VK32",
    description: "Современный дизайн и комфортная подошва.",
    category: "Casual",
    price: 14000,
    link: "#"
  },
  {
    img: "../images/catalog/shoe7.jpg",
    title: "Mattini",
    description: "Мягкая подошва и качественные материалы.",
    category: "Sport",
    price: 15200,
    link: "#"
  },
  {
    img: "../images/catalog/shoe8.jpg",
    title: "Hitch Snickers",
    description: "Лёгкие и удобные кеды для города.",
    category: "Sneakers",
    price: 20000,
    link: "#"
  }
];

const catalog = document.querySelector(".catalog");

function renderProducts(list) {
  catalog.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="info">
        <h3>${product.title}</h3>
        <a href="${product.link}">
          <p>${product.description}</p>
        </a>
        <span>${product.category}</span>
      </div>
      <div class="price">
        <h3>${product.price.toLocaleString()} ₸</h3>
        <button>В КОРЗИНУ</button>
      </div>
    `;
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

