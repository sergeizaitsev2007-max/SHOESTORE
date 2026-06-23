const ADMIN_EMAIL = "admin@mail.com";

function isAdmin() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return currentUser && currentUser.email === ADMIN_EMAIL;
}

function getAuthHeaders() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return {
    'Content-Type': 'application/json',
    'X-User-Id': currentUser ? String(currentUser.id) : ''
  };
}

function deleteProductFromServer(id) {
  return fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json());
}

function updateProductOnServer(id, data) {
  return fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function createProductOnServer(data) {
  return fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());
}