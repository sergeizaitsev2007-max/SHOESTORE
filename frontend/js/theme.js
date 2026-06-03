function applyTheme() {
  const saved = localStorage.getItem('theme');
  const btn = document.querySelector('.theme-btn');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    if (btn) btn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (btn) btn.textContent = '🌙';
  }
}

function initTheme() {
  applyTheme();
  const btn = document.querySelector('.theme-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      btn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

initTheme();
