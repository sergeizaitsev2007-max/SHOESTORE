const ADMIN_EMAIL = "admin@mail.com";

function isAdmin() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return currentUser && currentUser.email === ADMIN_EMAIL;
}

function deleteProductFromServer(id) {
  return fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}

function updateProductOnServer(id, data) {
  return fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function createProductOnServer(data) {
  return fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
}