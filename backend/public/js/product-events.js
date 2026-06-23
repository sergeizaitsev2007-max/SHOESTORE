const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const modalClose = document.querySelector('.modal-close');

cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderCartModal();
  cartModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cartModal.classList.remove('active');
  }
});
const searchBtn = document.getElementById('searchBtn');
const headerSearchBox = document.getElementById('headerSearchBox');
const headerSearchInput2 = document.getElementById('headerSearchInput');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (headerSearchBox.style.display === 'none' || headerSearchBox.style.display === '') {
    headerSearchBox.style.display = 'block';
    headerSearchInput2.focus();
  } else {
    headerSearchBox.style.display = 'none';
  }
});

headerSearchInput2.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = headerSearchInput2.value.trim();
    if (query) {
      const filters = JSON.parse(localStorage.getItem('catalogFilters')) || {};
      filters.search = query;
      localStorage.setItem('catalogFilters', JSON.stringify(filters));
      window.location.href = 'catalog.html';
    }
  }
});
