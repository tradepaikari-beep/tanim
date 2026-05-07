'use client';
import { useEffect, useRef, useState } from 'react';

function useTyping(text, speed = 55, delay = 0, startWhen = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!startWhen) return;
    setDisplayed(''); setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay, startWhen]);
  return { displayed, done };
}

export default function Hero() {
  const canvasRef = useRef(null);

  const t1 = useTyping('Premium Food &', 70, 400);
  const t2 = useTyping('Beverage Distribution', 70, 0, t1.done);
  const t3 = useTyping('Tanim Distribution connects manufacturers with retailers across Bangladesh. Bulk orders, reliable supply chain, competitive wholesale pricing — all in one platform.', 18, 0, t2.done);

  const cursor = (
    <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#2dd4aa', marginLeft: 3, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
  );

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    let W, H, animId;

    function resize() { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    let mx = 0.5, my = 0.5;
    window.addEventListener('mousemove', e => { mx = e.clientX / W; my = e.clientY / H; });
    window.addEventListener('touchmove', e => { mx = e.touches[0].clientX / W; my = e.touches[0].clientY / H; }, { passive: true });

    let t = 0;
    const COLS = 55, ROWS = 30, SZ = 18;

    function getY(xi, zi, time) {
      const nx = (xi / COLS - 0.5) * 3, nz = zi / ROWS;
      return Math.sin(nx * 2 + time * 0.7) * 22
           + Math.sin(nx * 3.5 - time * 0.5 + nz * 4) * 13
           + Math.sin(nx * 1.2 + nz * 5 + time * 0.4) * 9
           + Math.cos(nx * 4 + nz * 2 - time * 0.9) * 6;
    }

    function proj(x, y, z) {
      const tX = 0.36 + (my - 0.5) * 0.1;
      const tY = (mx - 0.5) * 0.25;
      const cosA = Math.cos(tX), sinA = Math.sin(tX);
      let ry = y * cosA - z * sinA, rz = y * sinA + z * cosA;
      const cosB = Math.cos(tY), sinB = Math.sin(tY);
      let rx = x * cosB + rz * sinB; rz = -x * sinB + rz * cosB;
      const sc = 650 / (650 + rz + 700);
      return { sx: rx * sc + W / 2, sy: ry * sc + H * 0.78, sc };
    }

    function drawSpiral(cx, cz, base, rad, h, turns, time, phase) {
      ctx.beginPath(); let first = true;
      for (let i = 0; i <= 60; i++) {
        const pct = i / 60, a = pct * turns * Math.PI * 2 + time * 0.9 + phase;
        const r = rad * (1 - pct * 0.4);
        const p = proj(cx + Math.cos(a) * r, base - pct * h + Math.sin(time + phase) * 4, cz + Math.sin(a) * r * 0.35);
        if (first) { ctx.moveTo(p.sx, p.sy); first = false; } else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = 'rgba(45,212,170,0.65)'; ctx.lineWidth = 1.1; ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= 28; i++) {
        const a = i / 28 * Math.PI * 2;
        const p = proj(cx + Math.cos(a) * rad * 1.15, base, cz + Math.sin(a) * rad * 0.4);
        i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = 'rgba(45,212,170,0.25)'; ctx.lineWidth = 0.7; ctx.stroke();
    }

    function drawOrb(wx, wy, wz) {
      const p = proj(wx, wy, wz); const r = Math.max(2, 6 * p.sc);
      const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3);
      g.addColorStop(0, 'rgba(45,212,170,0.95)');
      g.addColorStop(0.4, 'rgba(45,212,170,0.35)');
      g.addColorStop(1, 'rgba(45,212,170,0)');
      ctx.beginPath(); ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2); ctx.fillStyle = '#d0fff5'; ctx.fill();
    }

    function loop() {
      t += 0.012;
      ctx.fillStyle = 'rgba(4,10,10,0.52)'; ctx.fillRect(0, 0, W, H);
      const sx = W * 1.5 / COLS;
      const grid = Array.from({ length: ROWS }, (_, zi) =>
        Array.from({ length: COLS }, (_, xi) => ({
          p: proj((xi - COLS / 2) * sx, getY(xi, zi, t), (zi - ROWS * 0.25) * SZ)
        }))
      );
      for (let zi = 0; zi < ROWS; zi++) {
        ctx.beginPath();
        grid[zi].forEach(({ p }, xi) => xi === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy));
        ctx.strokeStyle = `rgba(45,212,170,${0.08 + (1 - zi / ROWS) * 0.22})`; ctx.lineWidth = 0.55; ctx.stroke();
      }
      for (let xi = 0; xi < COLS; xi += 2) {
        ctx.beginPath();
        grid.forEach((row, zi) => zi === 0 ? ctx.moveTo(row[xi].p.sx, row[xi].p.sy) : ctx.lineTo(row[xi].p.sx, row[xi].p.sy));
        ctx.strokeStyle = 'rgba(45,212,170,0.06)'; ctx.lineWidth = 0.4; ctx.stroke();
      }
      drawSpiral(180, -70, -25 + Math.sin(t * 0.7) * 7, 28, 85, 4, t, 0);
      drawSpiral(-140, -50, -18 + Math.sin(t * 0.6 + 1) * 7, 20, 65, 4, t, 2);
      drawSpiral(340, 10, -22 + Math.sin(t * 0.8 + 2) * 7, 24, 75, 4, t, 4);
      drawOrb(Math.sin(t * 0.4) * 110, getY(COLS / 2, ROWS * 0.4, t) - 12, Math.cos(t * 0.3) * 35 - 20);
      animId = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden', background: '#040a0a', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .hero-badge-new { display:inline-block; border:1px solid #1e3d35; color:#2dd4aa; padding:6px 16px; border-radius:999px; font-size:12px; font-family:'Courier New',monospace; margin-bottom:20px; animation:fadeUp .6s ease both; letter-spacing:1px; }
        .hero-btn-primary { background:#2dd4aa; color:#040a0a; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:700; font-size:14px; transition:opacity .2s; }
        .hero-btn-primary:hover { opacity:0.85; }
        .hero-btn-outline { border:1px solid #1e3d35; color:#8aa8a0; padding:12px 28px; border-radius:6px; text-decoration:none; font-size:14px; transition:all .2s; font-family:'Courier New',monospace; }
        .hero-btn-outline:hover { border-color:#2dd4aa; color:#2dd4aa; }
      `}</style>

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      <div className="hero-content" style={{ position: 'relative', zIndex: 2, padding: '0 6%', maxWidth: 680 }}>

        <div className="hero-badge-new">🇧🇩 Bangladesh's Trusted B2B Distributor</div>

        <h1 style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 24, minHeight: '2.2em' }}>
          <span style={{ display: 'block' }}>
            {t1.displayed}{t1.done && !t2.done && cursor}
          </span>
          {t1.done && (
            <em style={{ display: 'block', color: '#2dd4aa', fontStyle: 'normal' }}>
              {t2.displayed}{!t2.done && cursor}
            </em>
          )}
        </h1>

        {t2.done && (
          <p style={{ color: '#8aa8a0', fontSize: 15, lineHeight: 1.75, marginBottom: 36, fontFamily: 'inherit', animation: 'fadeUp .4s ease both', minHeight: 80 }}>
            {t3.displayed}{!t3.done && cursor}
          </p>
        )}

        {t3.done && (
          <div className="hero-buttons" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp .5s ease both' }}>
            <a href="#products" className="hero-btn-primary">Browse Products →</a>
            <a href="#contact" className="hero-btn-outline">Get Wholesale Price</a>
          </div>
        )}
      </div>
    </section>
  );
}
