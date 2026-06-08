(function () {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    const isRoot = !window.location.pathname.includes('/html/');
    const redirect = isRoot ? 'html/profil.html' : 'profil.html';
    window.location.replace(redirect);
  }
})();