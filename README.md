# Shiva Swaroop N K,  Portfolio

A fluid, responsive personal site: pastel palette with blue accents, a bit of personality in the hero and About, carousels for academic projects and a photo album, and the usual professional sections (experience, community, blog, contact).

## Features

- **Fluid layout**: `clamp()` typography and spacing, smooth scaling across viewports
- **Pastel + blue**: Cohesive light/dark themes with accessible contrast
- **Photo album**: Images anywhere under `pictures/` (subfolders included) with a generated `manifest.json` and a rolling carousel
- **Projects carousel**: KTH academic work in a keyboard- and screen-reader-friendly carousel
- **Smooth scrolling**, **theme toggle**, **scroll-reveal** (respects `prefers-reduced-motion`)
- **Vanilla stack**: HTML, CSS, and JavaScript,  no build step required for the page itself

## Sections

- **Hero**: Role, professional summary, personal line, hook pills, CNCF subtitle, links
- **Snapshots**: Rolling photo strip after Experience (hidden when the album is empty)
- **About**: Work story, “Also me”, “Right now”, sidebar facts
- **Experience**: Roles, education
- **Projects**: Academic projects (carousel)
- **Speaking & community**
- **Blog** gateway
- **Contact**

## Photo manifest

Browsers cannot list a folder on static hosting. The script walks **`pictures/` recursively** (subfolders count) and includes common web formats (JPEG, PNG, WebP, GIF, AVIF, BMP, TIFF). **HEIC** from iPhones often will not display in all browsers, so it is skipped,  convert to JPEG/PNG for the site.

After adding or removing images anywhere under `pictures/`, regenerate the manifest:

```bash
python3 scripts/generate-picture-manifest.py
```

GitHub Actions runs the same logic on deploy and writes `public/pictures/manifest.json` so new images are picked up on push.

## Getting started

1. Clone the repository
2. (Optional) `python3 scripts/generate-picture-manifest.py` if you use `pictures/`
3. Serve the site locally (e.g. `python3 -m http.server 8080`) so `fetch('pictures/manifest.json')` works,  opening `index.html` as a `file://` URL may block the album
4. Open the served URL in a browser

## Deployment

Static files deploy to **GitHub Pages** via `.github/workflows/deploy.yml` (copies `index.html`, `styles.css`, `script.js`, `assets/`, `blog/`, `pictures/`, generates the picture manifest, then uploads `public/`).

## Project structure

```
my-portfolio/
├── index.html
├── styles.css
├── script.js
├── pictures/                 # Album images + manifest.json (regenerated)
├── scripts/
│   └── generate-picture-manifest.py
├── assets/
├── blog/
└── README.md
```

## Contact

- **Email**: shivaswaroop40@gmail.com
- **LinkedIn**: [Connect with me](https://linkedin.com/in/shivaswaroop-nittoor-krishnamurthy-67551a14b)
- **GitHub**: [View my code](https://github.com/shivaswaroop40)

---

*Cloud infrastructure engineer & MSc Communication Systems student at KTH*
