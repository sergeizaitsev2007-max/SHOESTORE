const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const modalClose = document.querySelector('.modal-close');

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
