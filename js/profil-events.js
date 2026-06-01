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

  // Проверяем, не зарегистрирован ли уже этот email
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const exists = users.find(u => u.email === email.value.trim());
  if (exists) {
    showError(email, 'Этот email уже зарегистрирован');
    return;
  }

  const newUser = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email }));
  renderProfile(newUser);
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

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email.value.trim() && u.password === password.value);

  if (!user) {
    showError(password, 'Неверный email или пароль');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
  renderProfile(user);
});

cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
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
