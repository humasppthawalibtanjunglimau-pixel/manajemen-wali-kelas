// Ambil form login
const loginForm = document.getElementById('loginForm');
const errorEl = document.getElementById('error');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Ambil data users dari JSON lokal
  fetch('data/users.json')
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if(user){
        // Simpan session di localStorage
        localStorage.setItem('loggedUser', JSON.stringify(user));
        // Redirect ke dashboard
        window.location.href = 'index.html';
      } else {
        errorEl.textContent = 'Username atau password salah!';
      }
    })
    .catch(err => console.error(err));
});

