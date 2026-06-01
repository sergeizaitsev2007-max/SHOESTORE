const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const modalClose = document.querySelector('.modal-close');

const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.querySelector('.search input');


if (savedFilters.category) categoryFilter.value = savedFilters.category;
if (savedFilters.sort)     sortSelect.value     = savedFilters.sort;
if (savedFilters.search)   searchInput.value    = savedFilters.search;

applyFilters();

function saveFilters() {
  const filters = {
    category: categoryFilter.value,
    sort: sortSelect.value,
    search: searchInput.value
  };
  localStorage.setItem('catalogFilters', JSON.stringify(filters));
}

searchInput.addEventListener('input', () => {
  applyFilters();
  saveFilters();
});

categoryFilter.addEventListener('change', () => {
  applyFilters();
  saveFilters();
});

sortSelect.addEventListener('change', () => {
  applyFilters();
  saveFilters();
});


cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
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
