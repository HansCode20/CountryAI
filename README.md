# 🇮🇩 Proyek Country Information & AI Assistant

## 📌 Ringkasan Proyek
Project ini mwnggunakan Tool React Js + Vite agar lebih cepat dibandingkan dengan
React Js biasa, dan Project ini menampilkan data Country dari
graphql dan menggunakan OAuth github sebagai fitur login

🚀 Fitur Utama

### 1️⃣ **Informasi Negara**

- Menggunakan **GraphQL API** dari [countries.trevorblades.com](https://countries.trevorblades.com)
- Menampilkan daftar negara beserta **nama, emoji bendera, ibu kota, dan mata uang**
- Klik negara untuk melihat **detail tambahan** (bahasa, benua, dll.)
- Desain **responsif** untuk berbagai ukuran layar

### 2️⃣ **AI Assistant**

- Terhubung ke **NVIDIA NIM API** untuk **chat interaktif**
- Bisa menjawab pertanyaan tentang negara, memberikan **rekomendasi perjalanan**, serta melakukan **terjemahan**
- Indikator **sedang mengetik** & penanganan **error API**

### 3️⃣ **Autentikasi (Bonus)**

- **Login dengan Google/GitHub** menggunakan **OAuth 2.0**
- **Proteksi route** untuk halaman utama aplikasi
- Menampilkan **profil pengguna** setelah login
- Menangani **status & error autentikasi**

---

## ⚙️ Cara Install & Menjalankan Proyek

### 1️⃣ **Clone Repository**

```sh
git clone https://github.com/HansCode20/CountryAI.git
cd CountryAi
```

### 2️⃣ **Buat File ****`.env`**

Buat file `.env` berdasarkan contoh berikut:

```sh
NVIDIA_API_KEY=your_api_key
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

### 3️⃣ **Install Dependencies**

```sh
npm install
```

### 4️⃣ **Jalankan Aplikasi**

```sh
npm run dev
node server/serverAuthGithub.js
node server/serverNvidia.js
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 🔧 Keputusan Teknis & Arsitektur

- **ReactJS** → Untuk membangun antarmuka pengguna
- **GraphQL (Apollo Client)** → Untuk mengambil data negara dengan efisien
- **OAuth 2.0** → Untuk autentikasi pengguna dengan Google/GitHub
- **Styled Components/Tailwind CSS** → Untuk styling yang modular & cepat
- **NVIDIA NIM API** → Untuk fitur AI Assistant
- **React Router** → Untuk navigasi antar halaman

---

## 🌱 Rencana Pengembangan ke Depan

- 🔹 **Mode Gelap (Dark Mode)**
- 🔹 **Pencarian & Filter Negara**
- 🔹 **Peningkatan UI/UX**
- 🔹 **Penyimpanan riwayat percakapan AI Assistant**

📌 **Kontribusi & Saran sangat diterima!** 🚀

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **MIT**.

---