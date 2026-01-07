// ===== Data User =====
const users = [
  {username: "admin", password: "admin123", role: "admin"},
  {username: "pimpinan", password: "pimpinan123", role: "pimpinan"},
  {username: "kepala1", password: "kepala123", role: "kepala"},
  {username: "walikelas1", password: "wali123", role: "wali"},
  {username: "guru1", password: "guru123", role: "guru"}
];

// ===== Login =====
const loginForm = document.getElementById('loginForm');
const errorEl = document?.getElementById('error');

if(loginForm){
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
}

// ===== Cek Login Dashboard =====
const user = JSON.parse(localStorage.getItem('loggedUser'));
if(user){
  const usernameEl = document.getElementById('username');
  if(usernameEl) usernameEl.textContent = user.username;
} else {
  if(window.location.pathname.includes('index.html') || window.location.pathname.includes('santri.html')){
    window.location.href = 'login.html';
  }
}

// ===== Logout =====
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
  });
}

// ===== CRUD SANTRI =====
let santri = [
  {nama: "Ahmad", kelas: "10A"},
  {nama: "Fatimah", kelas: "10B"},
  {nama: "Ali", kelas: "11A"}
];

const tbody = document.querySelector("#santriTable tbody");
const addBtn = document.getElementById("addBtn");

function renderTable(){
  if(!tbody) return;
  tbody.innerHTML = "";
  santri.forEach((s, i)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border p-2">${i+1}</td>
      <td class="border p-2">${s.nama}</td>
      <td class="border p-2">${s.kelas}</td>
      <td class="border p-2">
        <button onclick="editSantri(${i})" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
        <button onclick="deleteSantri(${i})" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update total santri di dashboard
  const totalSantriEl = document.getElementById('totalSantri');
  if(totalSantriEl) totalSantriEl.textContent = santri.length;
}

function addSantri(){
  const nama = prompt("Nama santri:");
  const kelas = prompt("Kelas:");
  if(nama && kelas){
    santri.push({nama, kelas});
    renderTable();
  }
}

function editSantri(index){
  const nama = prompt("Nama santri:", santri[index].nama);
  const kelas = prompt("Kelas:", santri[index].kelas);
  if(nama && kelas){
    santri[index] = {nama, kelas};
    renderTable();
  }
}

function deleteSantri(index){
  if(confirm("Yakin ingin menghapus?")){
    santri.splice(index, 1);
    renderTable();
  }
}

if(addBtn) addBtn.addEventListener("click", addSantri);
renderTable();
