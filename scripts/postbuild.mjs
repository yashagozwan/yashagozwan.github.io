import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const distIndexHtmlPath = path.join(distDir, 'index.html')

if (!fs.existsSync(distIndexHtmlPath)) {
  console.error('dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8')

// 1. Replace root /assets with fresh compiled dist/assets
const rootAssetsDir = path.join(rootDir, 'assets')
const distAssetsDir = path.join(distDir, 'assets')

if (fs.existsSync(rootAssetsDir)) {
  fs.rmSync(rootAssetsDir, { recursive: true, force: true })
}
if (fs.existsSync(distAssetsDir)) {
  fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true })
}

// 2. Write compiled index.html & 404.html to repository root
fs.writeFileSync(path.join(rootDir, 'index.html'), baseHtml, 'utf-8')
fs.writeFileSync(path.join(rootDir, '404.html'), baseHtml, 'utf-8')

function createPageHtml({ title, description, canonicalUrl, ogTitle, ogDescription, ogImage }) {
  let html = baseHtml

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)

  html = html.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`
  )

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  )

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  )
  html = html.replace(
    /<meta property="twitter:url" content="[^"]*"\s*\/>/,
    `<meta property="twitter:url" content="${canonicalUrl}" />`
  )

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${ogTitle || title}" />`
  )
  html = html.replace(
    /<meta property="twitter:title" content="[^"]*"\s*\/>/,
    `<meta property="twitter:title" content="${ogTitle || title}" />`
  )

  html = html.replace(
    /<meta property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${ogDescription || description}" />`
  )
  html = html.replace(
    /<meta property="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="twitter:description" content="${ogDescription || description}" />`
  )

  if (ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${ogImage}" />`
    )
    html = html.replace(
      /<meta property="twitter:image" content="[^"]*"\s*\/>/,
      `<meta property="twitter:image" content="${ogImage}" />`
    )
  }

  return html
}

const pages = [
  {
    slug: 'bio',
    title: 'Yasha Gozwan Shuhada | Bio & Profile',
    description:
      'Biography and career highlights of Yasha Gozwan Shuhada, Flutter Mobile Engineer specializing in Clean Architecture and mobile delivery.',
    canonicalUrl: 'https://yashagozwan.github.io/bio',
    ogTitle: 'Yasha Gozwan Shuhada | Bio & Profile',
    ogDescription:
      'Biography and career highlights of Yasha Gozwan Shuhada, Flutter Mobile Engineer specializing in Clean Architecture and mobile delivery.',
    ogImage: 'https://yashagozwan.github.io/images/yasha-bio.png',
  },
  {
    slug: 'hobbies',
    title: 'Hobbies | Yasha Gozwan Shuhada',
    description:
      'Explore the personal hobbies, philosophy readings, gym activities, and mobile development explorations of Yasha Gozwan Shuhada.',
    canonicalUrl: 'https://yashagozwan.github.io/hobbies',
    ogTitle: 'Hobbies & Passions | Yasha Gozwan Shuhada',
    ogDescription:
      "Discover what fuels Yasha's creativity and discipline outside of professional mobile engineering—from reading philosophy and fitness to exploring cutting-edge mobile technologies.",
    ogImage: 'https://yashagozwan.github.io/images/yasha.png',
  },
  {
    slug: 'ideas',
    title: 'Ideas & Reflections — Yasha Gozwan Shuhada',
    description:
      'Books, ideas, and personal reflections explored outside of software engineering by Yasha Gozwan Shuhada.',
    canonicalUrl: 'https://yashagozwan.github.io/ideas',
    ogTitle: 'Ideas & Reflections — Yasha Gozwan Shuhada',
    ogDescription:
      'Books, ideas, and personal reflections explored outside of software engineering.',
    ogImage: 'https://yashagozwan.github.io/images/bagaimana_saya_ingin_menjalani_hidup.png',
  },
]

for (const page of pages) {
  const htmlContent = createPageHtml(page)

  // Write legacy .html file (e.g. /bio.html) for backward compatibility & sitemap
  fs.writeFileSync(path.join(rootDir, `${page.slug}.html`), htmlContent, 'utf-8')

  // Write clean URL directory index (e.g. /bio/index.html) so /bio returns HTTP 200 OK on GitHub Pages
  const subDir = path.join(rootDir, page.slug)
  fs.mkdirSync(subDir, { recursive: true })
  fs.writeFileSync(path.join(subDir, 'index.html'), htmlContent, 'utf-8')
}

// 3. Ensure .nojekyll exists in root
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf-8')

// 4. Clean up temporary dist/ folder
fs.rmSync(distDir, { recursive: true, force: true })

console.log('✅ Build output written directly to repository root for zero-pipeline GitHub Pages hosting!')
