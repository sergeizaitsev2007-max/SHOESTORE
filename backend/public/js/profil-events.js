const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const modalClose = document.querySelector('.modal-close');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function showError(input, message) {
  const group = input.closest('.input-group');
  input.classList.add('input-error');
  let errorEl = group.querySelector('.error-text');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.classList.add('error-text');
    group.appendChild(errorEl);
  }
  errorEl.textContent = message;
  input.addEventListener('input', () => clearError(input), { once: true });
}

function clearError(input) {
  const group = input.closest('.input-group');
  input.classList.remove('input-error');
  const errorEl = group.querySelector('.error-text');
  if (errorEl) errorEl.remove();
}

function showSuccess(form, message) {
  let el = form.querySelector('.success-text');
  if (!el) {
    el = document.createElement('span');
    el.classList.add('success-text');
    form.appendChild(el);
  }
  el.textContent = message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderProfile(user) {
  const authSection = document.querySelector('.auth-section');
  authSection.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:64px;margin-bottom:15px;">👤</div>
      <h2 style="margin-bottom:8px;">Привет, ${user.name}!</h2>
      <p style="color:gray;margin-bottom:25px;">${user.email}</p>
      <button id="logoutBtn" class="auth-btn">ВЫЙТИ</button>
    </div>
  `;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });
}

const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (currentUser) {
  renderProfile(currentUser);
}

loginTab.addEventListener('mousedown', () => {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
});

registerTab.addEventListener('mousedown', () => {
  registerForm.style.display = 'block';
  loginForm.style.display = 'none';
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name     = document.getElementById('registerName');
  const email    = document.getElementById('registerEmail');
  const password = document.getElementById('registerPassword');
  const password2= document.getElementById('registerPassword2');

  [name, email, password, password2].forEach(clearError);

  if (!name.value.trim()) {
    showError(name, 'Введите имя'); valid = false;
  } else if (name.value.trim().length < 2) {
    showError(name, 'Имя слишком короткое (минимум 2 символа)'); valid = false;
  }

  if (!email.value.trim()) {
    showError(email, 'Введите email'); valid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, 'Email введён неверно'); valid = false;
  }

  if (!password.value.trim()) {
    showError(password, 'Введите пароль'); valid = false;
  } else if (password.value.length < 6) {
    showError(password, 'Пароль слишком короткий (минимум 6 символов)'); valid = false;
  } else if (password.value.length > 20) {
    showError(password, 'Пароль слишком длинный (максимум 20 символов)'); valid = false;
  }

  if (!password2.value.trim()) {
    showError(password2, 'Повторите пароль'); valid = false;
  } else if (password.value !== password2.value) {
    showError(password2, 'Пароли не совпадают'); valid = false;
  }

  if (!valid) return;

  fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showError(email, data.error);
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    renderProfile(data);
  })
  .catch(err => {
    console.error('Ошибка регистрации:', err);
    showSuccess(registerForm, 'Ошибка соединения с сервером');
  });
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const email    = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  [email, password].forEach(clearError);

  if (!email.value.trim()) {
    showError(email, 'Введите email'); valid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, 'Email введён неверно'); valid = false;
  }

  if (!password.value.trim()) {
    showError(password, 'Введите пароль'); valid = false;
  } else if (password.value.length < 6) {
    showError(password, 'Пароль слишком короткий (минимум 6 символов)'); valid = false;
  }

  if (!valid) return;

  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value.trim(),
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showError(password, data.error);
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    renderProfile(data);
  })
  .catch(err => {
    console.error('Ошибка входа:', err);
    showError(password, 'Ошибка соединения с сервером');
  });
});

cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderCartModal();
  cartModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cartModal.classList.remove('active');
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