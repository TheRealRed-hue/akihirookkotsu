/* garou-theme.js
   Lightweight effects:
   - Canvas particles (subtle energy particles)
   - Aura toggle (red <-> cyan)
   - Minor portrait ring animation
*/

(() => {
  const canvas = document.getElementById('garouCanvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let W = window.innerWidth, H = window.innerHeight;
  if (canvas) {
    canvas.width = W; canvas.height = H;
  }

  // Particle system
  const particles = [];
  const MAX = 80;
  const colors = [
    {c:'#d94c4c', a:0.18}, // red
    {c:'#47d6e6', a:0.18}  // cyan
  ];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function spawn() {
    if (particles.length > MAX) return;
    const p = {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.2, 0.2), vy: rand(-0.2, 0.2),
      r: rand(0.8, 2.6), life: rand(60, 240),
      col: colors[Math.random() < 0.5 ? 0 : 1]
    };
    particles.push(p);
  }

  function step() {
    if (!ctx) return;
    ctx.clearRect(0,0,W,H);
    // spawn a few each frame
    if (Math.random() < 0.8) spawn();

    for (let i = particles.length-1; i >= 0; i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life--;
      // slight drift towards center
      const dx = W/2 - p.x, dy = H/2 - p.y;
      p.vx += dx * 0.00002; p.vy += dy * 0.00002;
      if (p.life <= 0) { particles.splice(i,1); continue; }
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, hexToRgba(p.col.c, p.col.a));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  function hexToRgba(hex, a){
    const h = hex.replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // aura toggle
  const toggle = document.getElementById('toggleEnergy');
  function setAura(aura) {
    document.documentElement.setAttribute('data-aura', aura);
    if (toggle) {
      toggle.setAttribute('aria-pressed', aura === 'red' ? 'true' : 'false');
      toggle.textContent = aura === 'red' ? 'Aura: Fúria (Vermelha)' : 'Aura: Instinto (Ciano)';
    }
  }
  // default: alternate between both on load
  let current = 'red';
  setAura(current);

  if (toggle) {
    toggle.addEventListener('click', () => {
      current = current === 'red' ? 'cyan' : 'red';
      setAura(current);
      // small flash effect on body
      flash(current === 'red' ? '#2b0000' : '#002b36');
    });
  }

  function flash(color){
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.inset = 0;
    el.style.background = color;
    el.style.opacity = '0.06';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 180);
  }

  // portrait ring gentle animation (adds classes)
  function ringAnimation(){
    const ring = document.querySelector('.energy-rings');
    if (!ring) return;
    ring.style.position = 'absolute';
    ring.style.inset = '6px';
    ring.style.borderRadius = '10px';
    ring.style.boxShadow = 'inset 0 0 120px rgba(255,255,255,0.02)';
    // create pseudo rings
    for (let i=0;i<3;i++){
      const r = document.createElement('div');
      r.className = 'ring';
      r.style.position='absolute';
      r.style.inset = `${6 + i*12}px`;
      r.style.borderRadius='8px';
      r.style.border = '1px solid rgba(255,255,255,0.02)';
      r.style.boxShadow = i%2===0 ? '0 0 40px rgba(0,0,0,0.25)' : '0 0 40px rgba(0,0,0,0.12)';
      r.style.transition = 'transform 1.6s ease-in-out';
      ring.appendChild(r);
      // slight pulse
      (function(el, idx){
        setInterval(()=> {
          el.style.transform = `scale(${1 + 0.02 * Math.sin(Date.now()/800 + idx)})`;
        }, 200);
      })(r,i);
    }
  }

  // handle resize
  window.addEventListener('resize', ()=> {
    W = window.innerWidth; H = window.innerHeight;
    if (canvas){ canvas.width = W; canvas.height = H; }
  });

  // init
  requestAnimationFrame(step);
  ringAnimation();

  // expose small helper for other pages
  window.GAROU_THEME = { setAura };

})();
