# PORTFOLIO WEBSITE — SYSTEM OVERVIEW

## Architecture

Static site — zero build step. Three.js r128 via CDN only dependency.

```
C:\Website\
├── index.html        # SPA shell — two views: home + section
├── styles.css        # All styles (Crysis 2 / Windows Aero aesthetic)
├── main.js           # SPA navigation, Three.js viewers, mouse parallax
├── data.js           # Single source of truth for all content
├── publication.html  # Publication detail page (reads ?id=X query param)
├── wallpaper.mp4     # Background video — drop file here to activate
└── models/           # GLB/GLTF files for 3D viewers (see models/README.md)
```

## Layout

Home view — CSS Flexbox split:
- **Left (flex: 1)** — title header + unified nav panel (3 rows)
- **Right (340px)** — about card (education, positions, top projects, bio, buttons)

Section view — full-width scrollable list of entry cards with back button.

## Navigation (SPA)

Home nav panel → `openSection(name)` → CSS opacity/translate transition → section view.
Back button → `goHome()` → destroys active Three.js viewers → home view.

| Section | Entry behaviour |
|---|---|
| Experience | Always-visible blurb, logo hex badge |
| Projects | Click to expand: bullet list + Three.js 3D viewer |
| Publications | Click navigates to `publication.html?id=X` |

## Three.js Viewers

Lazy-initialized 430 ms after project expand (waits for CSS transition).
Tries `models/{projId}.glb` via GLTFLoader; falls back to procedural geometry if missing.
Procedural: IcosahedronGeometry (neural-mesh), TorusKnotGeometry (quantum-sim),
OctahedronGeometry + instanced sphere grid (tactile-net).
Active viewers tracked in `Map<projId, {renderer, raf}>`.
Destroyed via `renderer.dispose()` on collapse or navigation back to home.

## Design System

```
Dark base:      #010507  (--bg)
Accent:         #ff8100  (--accent)   ← CHANGE THIS TO RETHEME
Accent RGB:     255,129,0             (--accent-rgb, used for rgba())
Glass bg:       rgba(12,18,10,0.48)  + backdrop-filter blur(28px)
Aero shine:     ::before white gradient 0.58→0→transparent over top 54-58%
Border top:     2px rgba(255,255,255,0.72-0.78)  ← bright rim = wet glass
Tilt:           perspective(1000px) rotateY(9deg) outward  (nav panel only)
Fonts:          Orbitron (HUD labels), Share Tech Mono (body)
```

Glass panels: `.nav-surface`, `.entry-card`, `.about-inner` all share:
- `backdrop-filter: var(--glass-blur)` — blurs wallpaper behind the panel
- Bright white `border-top` + left highlight border = skeuomorphic bevel
- `::before` white gradient = Aero specular highlight (wet glass look)
- `::after` accent left-edge bar

## Background

Single `<video id="bg-video" autoplay loop muted playsinline>` at `opacity: 0.55`.
Drop `wallpaper.mp4` in `C:\Website\` — no other background effects active.

## Mouse Parallax

`initMouseTilt()` in main.js: smooth lerp (factor 0.055) maps cursor to
±5° yaw / ±3° pitch on `#app` via `perspective(2400px) rotateY rotateX`.

## Data Layer (`data.js`)

`PORTFOLIO` global object — arrays: `education`, `experience`, `projects`, `publications`.
Shared by `index.html` and `publication.html`.

Projects shape: `{ id, thumbType, title, tags, year, glb, blurb, bullets[], viewerLabel }`
Publications shape: `{ id, thumbVenue, thumbColor, title, authors, venue, year, blurb, abstract, keywords[], links{} }`

## Scaling & Resolution

`html { font-size: clamp(14px, 1.1vw, 18px) }` — base rem scales with viewport.
`-webkit-font-smoothing: antialiased` on body.
`will-change: transform; backface-visibility: hidden` on tilted panels.
