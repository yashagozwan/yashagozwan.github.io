# Yasha Gozwan Shuhada — Portfolio (Vue 3 + TypeScript + Vite)

Personal portfolio website of **Yasha Gozwan Shuhada**, Mobile Engineer specializing in Flutter & native iOS/Android development.

## Tech Stack

- **Vue 3** (`<script setup lang="ts">`)
- **TypeScript**
- **Vite**
- **Vue Router 4** (with static entry points & `.html` backward compatibility for GitHub Pages)
- **Tailwind CSS**

## Local Development & Build

```bash
# Install dependencies
npm install

# Run development server (with hot-reload)
npm run dev

# Build for GitHub Pages (outputs directly to repository root — no GitHub Actions pipeline needed)
npm run build
```

## GitHub Pages Hosting (Zero Pipeline)

Project ini dikonfigurasi agar **tidak memerlukan custom GitHub Actions workflow** sehingga tidak memakan kuota/limit GitHub Actions:
- Saat menjalankan `npm run build` di lokal, hasil bundle (`assets/`, `index.html`, `bio.html`, `hobbies.html`, `ideas.html`, `404.html`, serta folder rute bersih `bio/`, `hobbies/`, `ideas/`) langsung ditulis ke root repositori.
- Cukup commit dan merge ke branch `main`, maka GitHub Pages bawaan akan langsung menayangkan aplikasi Vue Anda secara otomatis tanpa konfigurasi tambahan.
