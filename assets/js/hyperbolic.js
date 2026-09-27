// A {p,q} tiling of the Poincaré disk, drawn faintly behind the page.
// The disk drifts under Möbius transformations z -> (z - a) / (1 - conj(a) z)
// and leans toward the mouse. Geodesics are arcs orthogonal to the boundary.
(function () {
  const canvas = document.getElementById("hyperbolic-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const MAX_TILES = 1500;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- complex helpers: [re, im] ---
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const conj = (a) => [a[0], -a[1]];
  const abs2 = (a) => a[0] * a[0] + a[1] * a[1];
  const div = (a, b) => { const d = abs2(b); return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };

  // Circle through u and v orthogonal to the unit circle (null if it is a diameter).
  function geodesic(u, v) {
    const cross = u[0] * v[1] - u[1] * v[0];
    if (Math.abs(cross) < 1e-9) return null;
    const su = (1 + abs2(u)) / 2, sv = (1 + abs2(v)) / 2;
    const c = [(su * v[1] - sv * u[1]) / cross, (u[0] * sv - v[0] * su) / cross];
    return { c, r: Math.sqrt(Math.max(abs2(c) - 1, 0)) };
  }

  // Reflect z across the geodesic through u and v.
  function reflect(z, u, v) {
    const g = geodesic(u, v);
    if (!g) {
      const d = [v[0] - u[0], v[1] - u[1]], n = Math.hypot(d[0], d[1]);
      const e = [d[0] / n, d[1] / n], t = z[0] * e[0] + z[1] * e[1];
      return [2 * t * e[0] - z[0], 2 * t * e[1] - z[1]];
    }
    const w = sub(z, g.c);
    return add(g.c, div([g.r * g.r, 0], conj(w)));
  }

  // Build a tiling: breadth-first reflection of the central p-gon across its edges.
  function buildTiling(P, Q) {
    const r0 = Math.sqrt(Math.cos(Math.PI / P + Math.PI / Q) / Math.cos(Math.PI / P - Math.PI / Q));
    const first = [];
    for (let k = 0; k < P; k++) {
      const t = (2 * Math.PI * k) / P + Math.PI / P;
      first.push([r0 * Math.cos(t), r0 * Math.sin(t)]);
    }
    const key = (z) => Math.round(z[0] * 1e4) + "," + Math.round(z[1] * 1e4);
    const centroid = (poly) => poly.reduce((s, z) => add(s, [z[0] / poly.length, z[1] / poly.length]), [0, 0]);
    const seen = new Set([key(centroid(first))]);
    const edges = new Map();
    const addEdges = (poly) => poly.forEach((u, i) => {
      const v = poly[(i + 1) % poly.length], a = key(u), b = key(v);
      edges.set(a < b ? a + "|" + b : b + "|" + a, [u, v]);
    });
    addEdges(first);
    let frontier = [first];
    while (frontier.length && seen.size < MAX_TILES) {
      const next = [];
      for (const poly of frontier) {
        for (let i = 0; i < P; i++) {
          const u = poly[i], v = poly[(i + 1) % P];
          const img = poly.map((z) => reflect(z, u, v));
          const c = centroid(img), k = key(c);
          if (seen.has(k) || abs2(c) > 0.9985) continue;
          seen.add(k);
          next.push(img);
          addEdges(img);
        }
      }
      frontier = next;
    }
    return [...edges.values()];
  }

  // Clicking the profile photo cycles through these {p,q} tilings.
  const TILINGS = [[7, 3], [8, 3], [5, 4], [4, 5], [3, 7], [6, 4]];
  let current = 0;
  let edgeList = buildTiling(...TILINGS[current]);

  const label = document.createElement("div");
  label.className = "tiling-label";
  label.setAttribute("aria-live", "polite");
  document.body.appendChild(label);
  let labelTimer;

  const photo = document.querySelector(".intro-photo img");
  if (photo) {
    photo.style.cursor = "pointer";
    photo.title = "Click me";
    photo.addEventListener("click", () => {
      current = (current + 1) % TILINGS.length;
      const [p, q] = TILINGS[current];
      canvas.style.opacity = 0;
      setTimeout(() => {
        edgeList = buildTiling(p, q);
        if (still) draw(0);
        canvas.style.opacity = 1;
      }, 250);
      label.textContent = "{" + p + "," + q + "}: " + p + "-gons, " + q + " around each vertex";
      label.classList.add("show");
      clearTimeout(labelTimer);
      labelTimer = setTimeout(() => label.classList.remove("show"), 2500);
    });
  }

  // --- drawing ---
  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
  }
  resize();
  window.addEventListener("resize", resize);

  const mobius = (z, a) => div(sub(z, a), sub([1, 0], mul(conj(a), z)));
  const color = () => getComputedStyle(document.documentElement).getPropertyValue("--tiling").trim() || "rgba(11,79,138,0.18)";

  let mouse = [0, 0], a = [0, 0];
  window.addEventListener("pointermove", (e) => {
    mouse = [(e.clientX / W - 0.5) * 0.9, (e.clientY / H - 0.5) * 0.9];
  });

  function draw(time) {
    // Wide screens: disk on the right margin. Narrow screens: disk behind the top.
    const wide = W > 1000;
    const R = wide ? H * 0.52 : W * 0.8;
    const cx = wide ? W - R * 0.62 : W * 0.5, cy = wide ? H * 0.5 : R * 0.15;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = color();
    ctx.globalAlpha = wide ? 1 : 0.6; // behind the text on narrow screens, so keep it quieter
    ctx.lineWidth = 1;

    // Slow drift plus a gentle lean toward the mouse.
    const t = time / 1000;
    const target = [0.25 * Math.cos(t * 0.07) + mouse[0] * 0.35, 0.25 * Math.sin(t * 0.05) + mouse[1] * 0.35];
    a = [a[0] + (target[0] - a[0]) * 0.03, a[1] + (target[1] - a[1]) * 0.03];
    const rot = [Math.cos(t * 0.02), Math.sin(t * 0.02)];

    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    for (const [u0, v0] of edgeList) {
      const u = mul(rot, mobius(u0, a)), v = mul(rot, mobius(v0, a));
      if (abs2(u) > 0.9995 && abs2(v) > 0.9995) continue;
      const ux = cx + u[0] * R, uy = cy + u[1] * R, vx = cx + v[0] * R, vy = cy + v[1] * R;
      const g = geodesic(u, v);
      if (!g || g.r > 60) { ctx.moveTo(ux, uy); ctx.lineTo(vx, vy); continue; }
      const gx = cx + g.c[0] * R, gy = cy + g.c[1] * R;
      let a1 = Math.atan2(uy - gy, ux - gx), a2 = Math.atan2(vy - gy, vx - gx);
      let delta = a2 - a1;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      while (delta < -Math.PI) delta += 2 * Math.PI;
      ctx.moveTo(ux, uy);
      ctx.arc(gx, gy, g.r * R, a1, a1 + delta, delta < 0);
    }
    ctx.stroke();
  }

  if (still) { draw(0); window.addEventListener("resize", () => draw(0)); return; }
  (function loop(time) { draw(time); requestAnimationFrame(loop); })(0);
})();
