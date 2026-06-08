const products = [
  {
    title: "Wariror",
    price: 26000,
    img: "images/index/shoe1.jpg",
    link: "html/product.html"
  },
  {
    title: "Bmai Cardon 3.0 Ultra",
    price: 34000,
    img: "images/index/shoe2.jpg",
    link: "#"
  },
  {
    title: "Audienz",
    price: 23000,
    img: "images/index/shoe3.jpg",
    link: "#"
  },
  {
    title: "Balence kids",
    price: 65000,
    img: "images/index/shoe4.jpg",
    link: "#"
  }
];

const container = document.querySelector(".products");

products.forEach(product => {
  const card = document.createElement("article");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${product.img}" alt="${product.title}">
    <a href="${product.link}"><h3>${product.title}</h3></a>
    <p>${product.price.toLocaleString()} ₸</p>
    <button>В КОРЗИНУ</button>
  `;
  container.appendChild(card);
});