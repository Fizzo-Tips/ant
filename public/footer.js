
// Contoh data card
let data = [
  {
    name: "KIRO",
    role: "BackEnd Engineer",
    image: "dist/kiro.jpeg",
    social: {
      github: "https://github.com/kiro",
      twitter: "https://twitter.com/kiro",
      tiktok: "https://tiktok.com/kiro",
      instagram: "https://instagram.com/kiro",
    },
  },
  {
    name: "JIHAD",
    role: "FrontEnd Engineer",
    image: "dist/saya.jpeg",
    social: {
      github: "https://github.com/jihad",
      tiktok: "https://tiktok.com/jihad",
    },
  },
];

// Fungsi untuk menampilkan data card
function showData() {
  const container = document.getElementById("data-footer");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-image" style="background-image: url(${item.image});"></div>
        <h1 class="card-title">${item.name}</h1>
        <p class="card-role">${item.role}</p>
        <div class="social-links">
          <a href="${item.social.github}"><i class="fa-brands fa-github"></i></a>
          <a href="${item.social.twitter}"><i class="fa-brands fa-twitter"></i></a>
          <a href="${item.social.tiktok}"><i class="fa-brands fa-tiktok"></i></a>
          <a href="${item.social.instagram}"><i class="fa-brands fa-instagram"></i></a>
        </div>
        <button onclick="editData(${index})">Edit</button>
        <button onclick="deleteData(${index})">Delete</button>
      `;

    container.appendChild(card);
  });
}

// Fungsi untuk menambahkan data card
function addData() {
  // Implementasikan logika penambahan data ke dalam array 'data'
  // Contoh:
  data.push({
    name: "New Member",
    role: "Engineer",
    image: "dist/default.jpg",
    social: {},
  });

  showData(); // Tampilkan data terbaru
}

// Fungsi untuk mengedit data card
function editData(index) {
  // Implementasikan logika pengeditan data dalam array 'data'
  // Contoh:
  data[index].name = "Updated Name";
  data[index].role = "Updated Role";

  showData(); // Tampilkan data terbaru
}

// Fungsi untuk menghapus data card
function deleteData(index) {
  // Implementasikan logika penghapusan data dalam array 'data'
  // Contoh:
  data.splice(index, 1);

  showData(); // Tampilkan data terbaru
}

showData(); // Tampilkan data awal saat halaman dimuat
