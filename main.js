/* ============================================================
   MAIN.JS — Portfolio SPA
   ============================================================ */

/* ── Chamfer + rounded-corner SVG clip-path engine ──────────── *
 * CSS clip-path and border-radius cannot coexist on one element.
 * This generates SVG <clipPath> paths that encode both: rounded
 * 90° corners (R) and soft-edged chamfer cuts (C) at TR and BL.
 * Applied via ResizeObserver so it stays current as cards expand.
 */
const _CC = (function() {
  const C = 16, R = 5, R2 = 3, K = 0.7071; // chamfer, corner-r, chamfer-softening, cos45

  const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style', 'position:fixed;width:0;height:0;overflow:hidden;pointer-events:none');
  svg.setAttribute('aria-hidden', 'true');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  svg.appendChild(defs);
  let n = 0;

  function makePath(w, h) {
    // Clockwise: TL arc → top → TR chamfer (soft) → right → BR arc → bottom → BL chamfer (soft) → left → close
    return `M0,${R} A${R},${R},0,0,1,${R},0 ` +
           `L${w-C-R2},0 Q${w-C},0,${w-C+R2*K},${R2*K} L${w-R2*K},${C-R2*K} Q${w},${C},${w},${C+R2} ` +
           `L${w},${h-R} A${R},${R},0,0,1,${w-R},${h} ` +
           `L${C+R2},${h} Q${C},${h},${C-R2*K},${h-R2*K} L${R2*K},${h-C+R2*K} Q0,${h-C},0,${h-C-R2} Z`;
  }

  function apply(el) {
    let id = el._ccId;
    let pathEl;
    if (!id) {
      id = 'cc' + (n++);
      el._ccId = id;
      const cp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      cp.id = id;
      pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      cp.appendChild(pathEl);
      defs.appendChild(cp);
    } else {
      pathEl = defs.querySelector('#' + id + ' path');
    }
    const w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return;
    pathEl.setAttribute('d', makePath(w, h));
    el.style.clipPath = 'url(#' + id + ')';
  }

  const obs = new ResizeObserver(entries => entries.forEach(e => apply(e.target)));

  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(svg));

  return {
    one: function(el) { if (!el) return; apply(el); obs.observe(el); },
    all: function(sel) { document.querySelectorAll(sel).forEach(el => { apply(el); obs.observe(el); }); }
  };
})();

/* ── HUD clock ──────────────────────────────────────────────── */
(function initClock() {
  const el = document.getElementById('home-clock');
  if (!el) return;
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── Mouse parallax — translate only (no rotation = sharp text) ── */
(function initMouseParallax() {
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const app = document.getElementById('app');
  document.addEventListener('mousemove', e => {
    tx = ((e.clientX / window.innerWidth)  - 0.5) * 16;
    ty = ((e.clientY / window.innerHeight) - 0.5) * -10;
  });
  (function loop() {
    cx += (tx - cx) * 0.055;
    cy += (ty - cy) * 0.055;
    app.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  })();
})();


/* ── SPA ────────────────────────────────────────────────────── */
let activeSection = null;

function openSection(name) {
  const home = document.getElementById('view-home');
  const sec  = document.getElementById('view-section');
  home.classList.add('exit');
  setTimeout(() => {
    home.classList.remove('active','exit');
    renderSection(name);
    sec.classList.add('active');
    sec.scrollTop = 0;
    activeSection = name;
  }, 280);
}

function goHome() {
  const home = document.getElementById('view-home');
  const sec  = document.getElementById('view-section');
  sec.classList.add('exit');
  destroyAllViewers();
  if (projKeyListener) {
    document.removeEventListener('keydown', projKeyListener);
    projKeyListener = null;
  }
  setTimeout(() => {
    sec.classList.remove('active','exit');
    const secLayout = document.querySelector('.sec-layout');
    if (secLayout) secLayout.classList.remove('projects-mode');
    home.classList.add('active');
    activeSection = null;
  }, 280);
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildBlades();
});

/* ── Blades (home tiles) ────────────────────────────────────── */
function buildBlades() {
  const el = document.getElementById('blades');
  if (!el) return;

  const defs = [
    { key:'experience',   icon:'⬡', label:'EXPERIENCE',   data: PORTFOLIO.experience },
    { key:'projects',     icon:'◈', label:'PROJECTS',     data: PORTFOLIO.projects },
    { key:'publications', icon:'◇', label:'PUBLICATIONS', data: PORTFOLIO.publications },
  ];

  el.innerHTML = `
    <div class="nav-panel">
      <div class="nav-surface">
        <div class="nav-panel-header">
          <span class="nav-ph-label">NAVIGATE</span>
          <div class="nav-ph-dots"><span></span><span></span><span></span></div>
        </div>
        <div class="nav-rows">
          ${defs.map(d => `
            <div class="nav-row" onclick="openSection('${d.key}')">
              <div class="nav-row-icon">${d.icon}</div>
              <div class="nav-row-text">
                <div class="nav-row-label">${d.label}</div>
                <div class="nav-row-count">${String(d.data.length).padStart(2,'0')} ENTRIES</div>
              </div>
              <div class="nav-row-arrow">▶</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  setTimeout(() => _CC.one(document.querySelector('.nav-surface')), 0);
}

/* ── Sidebar / About Card ────────────────────────────────────── */
function buildSidebar() {
  const el = document.getElementById('sidebar');
  if (!el) return;
  const d = PORTFOLIO;

  /* Education rows */
  const eduHTML = d.education.map(e => `
    <div class="about-sec-item">
      <span class="asi-dot">◆</span>
      <div class="asi-body">
        <div class="asi-title">${e.degree}</div>
        <div class="asi-sub">${e.school} · ${e.year}</div>
      </div>
    </div>`).join('');

  /* Experience rows */
  const expHTML = d.experience.map(e => `
    <div class="about-sec-item">
      <span class="asi-dot">◆</span>
      <div class="asi-body">
        <div class="asi-title">${e.title}</div>
        <div class="asi-sub">${e.org}</div>
      </div>
    </div>`).join('');

  /* Top 2 projects */
  const projHTML = d.projects.slice(0, 2).map(p => `
    <div class="about-sec-item">
      <span class="asi-dot">◆</span>
      <div class="asi-body">
        <div class="asi-title">${p.title}</div>
        <div class="asi-sub">${p.tags}</div>
      </div>
    </div>`).join('');

  el.innerHTML = `
    <div class="about-card">
      <div class="about-inner">

        <div class="about-hdr-row">
          <div class="about-name">${d.name}</div>
          <div class="about-role">${d.role}</div>
        </div>

        <div class="about-bio"><p id="bio-txt">${d.bio}</p></div>

        <div class="about-secs-grid">
          <div class="about-section sec-edu" style="grid-column:1/-1">
            <div class="about-sec-hd">EDUCATION</div>
            ${eduHTML}
          </div>
          <div class="about-section sec-exp">
            <div class="about-sec-hd">POSITIONS</div>
            ${expHTML}
          </div>
          <div class="about-section sec-proj">
            <div class="about-sec-hd">PROJECTS</div>
            ${projHTML}
          </div>
        </div>

        <div class="about-btns">
          <a href="${d.resume}" class="cta-btn cta-resume">⬡&nbsp; RESUME</a>
          <a href="mailto:${d.email}" class="cta-btn cta-email">◇&nbsp; EMAIL</a>
          <a href="${d.linkedin}" target="_blank" class="cta-btn cta-linkedin">◈&nbsp; LINKEDIN</a>
        </div>
      </div>
    </div>`;

  setTimeout(() => _CC.one(document.querySelector('.about-inner')), 0);
  typewriterBio();
}

function typewriterBio() {
  const el = document.getElementById('bio-txt');
  if (!el) return;
  const text = el.textContent; el.textContent = '';
  let i = 0;
  const iv = setInterval(() => { el.textContent += text[i++]; if (i >= text.length) clearInterval(iv); }, 16);
}

/* ── Section renderer ────────────────────────────────────────── */
function renderSection(name) {
  const body  = document.getElementById('sec-body');
  const title = document.getElementById('sec-title-row');
  if (!body || !title) return;

  const icons  = { experience:'⬡', projects:'◈', publications:'◇' };
  const labels = { experience:'EXPERIENCE', projects:'PROJECTS', publications:'PUBLICATIONS' };

  const secLayout = document.querySelector('.sec-layout');

  if (name === 'projects') {
    if (secLayout) secLayout.classList.add('projects-mode');
    title.innerHTML = `
      <span class="sec-icon">${icons[name]}</span>
      <span class="sec-title-txt">${labels[name]}</span>
      <span class="sec-subtitle">${String(PORTFOLIO[name].length).padStart(2,'0')} ENTRIES</span>`;
    body.innerHTML = buildProjectsGallery();
    projIndex = 0;
    showProject(0);
    projKeyListener = e => {
      if (e.key === 'ArrowLeft')  projNav(-1);
      if (e.key === 'ArrowRight') projNav(1);
    };
    document.addEventListener('keydown', projKeyListener);
  } else {
    if (secLayout) secLayout.classList.remove('projects-mode');
    title.innerHTML = `
      <span class="sec-icon">${icons[name]}</span>
      <span class="sec-title-txt">${labels[name]}</span>
      <span class="sec-subtitle">${String(PORTFOLIO[name].length).padStart(2,'0')} ENTRIES</span>`;
    if (name === 'experience')   body.innerHTML = buildExperience();
    else if (name === 'publications') body.innerHTML = buildPublications();
    setTimeout(() => _CC.all('#sec-body .entry-card'), 0);
  }
}

/* ── Experience ──────────────────────────────────────────────── */
function buildExperience() {
  return PORTFOLIO.experience.map(e => {
    return `
    <div class="entry-wrap">
      <div class="entry-card">
        <div class="entry-top">
          ${e.logoImg ? `<div class="logo-sq-wrap"><img class="logo-sq" src="${e.logoImg}" alt=""></div>` : ''}
          <div class="entry-side">
            <div class="entry-header">
              <div class="entry-info">
                <div class="entry-title">${e.title}</div>
                <div class="entry-sub">${e.org}</div>
                <div class="entry-date">${e.dates}</div>
              </div>
            </div>
            <div class="entry-blurb">${e.blurb}</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── Projects Gallery ────────────────────────────────────────── */
let projIndex = 0;
let photoOrder = [];   // [frontImgIdx, midImgIdx, backImgIdx, ...]
let projKeyListener = null;

function buildProjectsGallery() {
  const n = PORTFOLIO.projects.length;
  return `
  <div class="proj-gallery" id="proj-gallery">
    <div class="proj-stage" id="proj-stage">
      <div class="proj-info-area" id="proj-info-area"></div>
      <div class="proj-media-area" id="proj-media-area"></div>
    </div>
    <div class="proj-nav-bar">
      <button class="proj-nav-btn" onclick="projNav(-1)">◂ PREV</button>
      <div class="proj-counter" id="proj-counter">01 / ${String(n).padStart(2,'0')}</div>
      <button class="proj-nav-btn" onclick="projNav(1)">NEXT ▸</button>
    </div>
  </div>`;
}

function showProject(idx) {
  const projs = PORTFOLIO.projects;
  const n = projs.length;
  const proj = projs[idx];

  const counter = document.getElementById('proj-counter');
  if (counter) counter.textContent = `${String(idx + 1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;

  const infoArea = document.getElementById('proj-info-area');
  if (infoArea) {
    infoArea.innerHTML = `
      <div class="proj-card-wrap">
        <div class="proj-card" id="pc-${proj.id}">
          <div class="proj-card-content">
            <div class="proj-card-label">◈ PROJECT PROFILE</div>
            <div class="proj-card-title">${proj.title}</div>
            <div class="proj-card-meta">
              <span class="proj-card-tags">${proj.tags}</span>
              <span class="proj-card-year">${proj.year}</span>
            </div>
            <div class="proj-card-divider"></div>
            <ul class="proj-card-bullets">
              ${(proj.bullets || []).map(b => `<li>${b}</li>`).join('')}
            </ul>
            ${proj.link ? `<a class="proj-link-btn" href="${proj.link}" target="_blank" rel="noopener">◈&nbsp; ${proj.linkLabel || 'VIEW PROJECT'} ▶</a>` : ''}
          </div>
        </div>
      </div>`;
    setTimeout(() => _CC.one(document.getElementById(`pc-${proj.id}`)), 0);
  }

  destroyAllViewers();

  const mediaArea = document.getElementById('proj-media-area');
  if (!mediaArea) return;

  const hasImages = !!(proj.images && proj.images.length > 0);
  if (hasImages) {
    renderPhotoStack(proj);
  } else {
    mediaArea.innerHTML = `
      <div class="proj-viewer-full" id="vw-${proj.id}">
        <div class="viewer-init">INITIALIZING 3D ENGINE...</div>
        <canvas></canvas>
      </div>`;
    const vw = document.getElementById(`vw-${proj.id}`);
    if (vw) setTimeout(() => initViewer(vw, proj.id), 100);
  }
}

function projNav(dir) {
  const n = PORTFOLIO.projects.length;
  const stage = document.getElementById('proj-stage');
  if (!stage) return;
  stage.classList.add('fading');
  setTimeout(() => {
    projIndex = (projIndex + dir + n) % n;
    showProject(projIndex);
    stage.classList.remove('fading');
  }, 180);
}

function renderPhotoStack(proj) {
  const mediaArea = document.getElementById('proj-media-area');
  if (!mediaArea) return;
  const imgs = proj.images || [];
  photoOrder = imgs.map((_, i) => i); // reset: [0, 1, 2, ...]

  const posNames = ['pos-front', 'pos-mid', 'pos-back'];
  const imgHTML = imgs.map((src, i) => {
    const posClass = posNames[i] || 'pos-back';
    const zIdx = imgs.length - i;
    return `<img class="proj-photo-item ${posClass}" id="pimg-${i}" data-idx="${i}"
      src="${src}" alt="${proj.title}" style="z-index:${zIdx}"
      onclick="selectPhoto(${i})">`;
  }).join('');

  mediaArea.innerHTML = `
    <div class="proj-photo-stack">
      ${imgHTML}
    </div>`;
}

function selectPhoto(clickedIdx) {
  if (photoOrder[0] === clickedIdx) return; // already front — no-op

  // Rotate so clicked image is first in order
  const pos = photoOrder.indexOf(clickedIdx);
  if (pos === -1) return;
  // Cycle: clicked → front, previous front → mid, previous mid → back, etc.
  photoOrder = [clickedIdx, ...photoOrder.filter(i => i !== clickedIdx)];
  updatePhotoPositions();
}

function updatePhotoPositions() {
  const posNames = ['pos-front', 'pos-mid', 'pos-back'];
  photoOrder.forEach((imgIdx, pos) => {
    const el = document.getElementById(`pimg-${imgIdx}`);
    if (!el) return;
    el.classList.remove('pos-front', 'pos-mid', 'pos-back');
    el.classList.add(posNames[pos] || 'pos-back');
    // Set z-index immediately (before animation completes) so front card is always on top
    el.style.zIndex = photoOrder.length - pos;
  });
}

/* ── Publications ────────────────────────────────────────────── */
function buildPublications() {
  return PORTFOLIO.publications.map(p => `
    <a class="entry-wrap" href="${p.url || '#'}" target="_blank" rel="noopener" style="display:block;">
      <div class="entry-card">
        <div class="entry-top">
          <div class="thumb thumb-pub" style="border-color:${p.thumbColor}44;">
            <div class="thumb-pub-venue" style="color:${p.thumbColor}">${p.thumbVenue}</div>
            <div class="thumb-pub-lines"><span></span><span></span><span></span></div>
          </div>
          <div class="entry-side">
            <div class="entry-header">
              <div class="entry-info">
                <div class="entry-title">${p.shortTitle}</div>
                <div class="entry-sub">${p.venue} · ${p.authors.split(',')[0].trim()} et al.</div>
                <div class="entry-date">${p.year}</div>
              </div>
              <div class="expand-btn" style="border-color:${p.thumbColor}66;color:${p.thumbColor};">OPEN ▶</div>
            </div>
            <div class="entry-blurb">${p.blurb}</div>
          </div>
        </div>
      </div>
    </a>`).join('');
}

/* ── Three.js viewers ────────────────────────────────────────── */
const viewers = new Map();

function destroyViewer(id) {
  if (viewers.has(id)) {
    const { renderer, raf, controls } = viewers.get(id);
    cancelAnimationFrame(raf);
    if (controls) controls.dispose();
    renderer.dispose();
    viewers.delete(id);
  }
  const vw = document.getElementById(`vw-${id}`);
  if (vw) vw.classList.remove('loaded');
}

function destroyAllViewers() { viewers.forEach((_, id) => destroyViewer(id)); }

function initViewer(wrap, projId) {
  if (viewers.has(projId)) return;
  wrap.classList.add('loaded');

  const canvas = wrap.querySelector('canvas');
  const W = wrap.clientWidth || 500;
  const H = wrap.clientHeight || 240;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  camera.position.z = 2.4;

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key  = new THREE.DirectionalLight(0xfff8f0, 1.4); key.position.set(3, 4, 3);   scene.add(key);
  const fill = new THREE.DirectionalLight(0xf0f4ff, 0.5); fill.position.set(-3, 1, 2);  scene.add(fill);
  const rim  = new THREE.DirectionalLight(0xffffff, 0.3); rim.position.set(0, -2, -3);  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  /* Try loading GLB first, fall back to procedural */
  const projData = PORTFOLIO.projects.find(p => p.id === projId);
  if (projData && projData.glb && typeof THREE.GLTFLoader !== 'undefined') {
    const loader = new THREE.GLTFLoader();
    loader.load(
      projData.glb,
      gltf => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());
        const scale  = 2 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        group.add(model);
      },
      undefined,
      () => buildProceduralGeo(group, projId) /* file not found → fallback */
    );
  } else {
    buildProceduralGeo(group, projId);
  }

  /* OrbitControls — drag to orbit, scroll to zoom */
  let controls = null;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.07;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 1.4;
    controls.minDistance     = 1.4;
    controls.maxDistance     = 8;
    controls.enablePan       = false;
  }

  let f = 0, wireMat = null, rafId;
  const tick = () => {
    rafId = requestAnimationFrame(tick);
    f++;
    if (controls) {
      controls.update();
    } else {
      group.rotation.y += 0.008;
      group.rotation.x  = Math.sin(f * 0.011) * 0.3;
    }
    if (wireMat) wireMat.opacity = 0.35 + Math.sin(f * 0.055) * 0.22;
    renderer.render(scene, camera);
  };
  tick();
  viewers.set(projId, { renderer, raf: rafId, controls });
}

function buildProceduralGeo(group, projId) {
  let geo, wireColor = 0x00ccff;
  if (projId === 'neural-mesh')  { geo = new THREE.IcosahedronGeometry(1, 3); }
  else if (projId === 'quantum-sim') { geo = new THREE.TorusKnotGeometry(0.72, 0.24, 120, 18); wireColor = 0xff8100; }
  else                           { geo = new THREE.OctahedronGeometry(1, 1); }

  const solidMat = new THREE.MeshPhongMaterial({ color:0x040e06, emissive:0x040e06, transparent:true, opacity:0.65, shininess:100 });
  const wireMat  = new THREE.MeshBasicMaterial({ color:wireColor, wireframe:true, transparent:true, opacity:0.55 });
  group.add(new THREE.Mesh(geo, solidMat));
  group.add(new THREE.Mesh(geo, wireMat));

  const innerGeo = projId === 'quantum-sim' ? new THREE.SphereGeometry(0.28,10,10) : new THREE.IcosahedronGeometry(0.42,1);
  const inner = new THREE.Mesh(innerGeo, new THREE.MeshBasicMaterial({ color:wireColor, wireframe:true, transparent:true, opacity:0.85 }));
  group.add(inner);

  if (projId === 'tactile-net') {
    const sg = new THREE.SphereGeometry(0.055,6,6);
    const sm = new THREE.MeshBasicMaterial({ color:0x00ccff, transparent:true, opacity:0.7 });
    const im = new THREE.InstancedMesh(sg, sm, 64);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let gx=0;gx<8;gx++) for (let gy=0;gy<8;gy++) {
      dm.position.set((gx-3.5)*.26,(gy-3.5)*.26,0); dm.updateMatrix(); im.setMatrixAt(idx++,dm.matrix);
    }
    group.add(im);
  }
}

