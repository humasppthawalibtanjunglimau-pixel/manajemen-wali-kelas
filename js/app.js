// Data user langsung di JS
const users = [
  {username: "admin", password: "admin123", role: "admin"},
  {username: "pimpinan", password: "pimpinan123", role: "pimpinan"},
  {username: "kepala1", password: "kepala123", role: "kepala"},
  {username: "walikelas1", password: "wali123", role: "wali"},
  {username: "guru1", password: "guru123", role: "guru"}
];

const loginForm = document.getElementById('loginForm');
const errorEl = document.getElementById('error');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if(user){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    errorEl.textContent = 'Username atau password salah!';
  }
});
