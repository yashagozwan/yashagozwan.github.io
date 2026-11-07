# Yasha Gozwan Shuhada — Portfolio (Vue 3 + TypeScript + Vite)

Personal portfolio website of **Yasha Gozwan Shuhada**, Mobile Engineer specializing in Flutter & native iOS/Android development.

## Tech Stack

- **Vue 3** (`<script setup lang="ts">`)
- **TypeScript**
- **Vite**
- **Vue Router 4** (with static entry points & `.html` backward compatibility for GitHub Pages)
- **Tailwind CSS**

## Local Development

```bash
# Install dependencies
npm install

# Run development server (with hot-reload)
npm run dev

# Type-check and build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## GitHub Pages Deployment (GitHub Actions)

Deployment dikonfigurasi secara otomatis melalui [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) setiap kali ada push atau merge ke branch `main`.
*(Catatan: Untuk repositori publik di GitHub, penggunaan GitHub Actions bersifat **gratis tanpa batas kuota menit / unlimited**).*

Pastikan pengaturan di GitHub sudah sesuai:
1. Buka repositori di GitHub → **Settings** → **Pages**.
2. Pada bagian **Build and deployment** → **Source**, pilih **GitHub Actions**.
