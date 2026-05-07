"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";

const categories = [
  { name: "Rice & Grains", icon: "🌾", count: "3 products", slug: "Rice & Grains" },
  { name: "Edible Oils", icon: "🫙", count: "3 products", slug: "Edible Oils" },
  { name: "Sugar & Salt", icon: "🧂", count: "2 products", slug: "Sugar & Salt" },
  { name: "Beverages", icon: "🧃", count: "3 products", slug: "Beverages" },
  { name: "Dairy", icon: "🥛", count: "2 products", slug: "Dairy" },
  { name: "Spices", icon: "🌶️", count: "3 products", slug: "Spices" },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green: #1a5c2e;
          --green-light: #2d8a47;
          --green-pale: #eef6f1;
          --gold: #c8922a;
          --gold-light: #e8b84b;
          --cream: #faf6ee;
          --dark: #0f1f0f;
          --text: #2c3e2d;
          --muted: #6b7b6c;
          --border: #ddd8c4;
          --white: #ffffff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); }

        /* HERO */
        .hero {
          background: linear-gradient(135deg, var(--green) 0%, #0f3d1f 60%, #1a2e0f 100%);
          padding: 100px 48px 90px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 500px; height: 500px;
          background: rgba(200,146,42,0.07);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -60px;
          width: 400px; height: 400px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,146,42,0.18);
          border: 1px solid rgba(200,146,42,0.4);
          color: var(--gold-light);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 60px;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .hero h1 span { color: var(--gold-light); }
        .hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 40px;
          position: relative;
          z-index: 1;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: #fff;
          border: none;
          padding: 16px 36px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          z-index: 1;
        }
        .hero-btn:hover {
          background: var(--gold-light);
          color: var(--dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,146,42,0.35);
        }

        /* CATEGORIES */
        .cats-section {
          padding: 72px 48px;
          background: var(--white);
        }
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 700;
          color: var(--dark);
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cat-card {
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 28px 16px;
          text-align: center;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          display: block;
        }
        .cat-card:hover {
          background: var(--green);
          border-color: var(--green);
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(26,92,46,0.2);
        }
        .cat-card:hover .cat-name { color: #fff; }
        .cat-card:hover .cat-count { color: rgba(255,255,255,0.65); }
        .cat-icon { font-size: 38px; margin-bottom: 12px; display: block; }
        .cat-name { font-size: 13px; font-weight: 600; color: var(--dark); margin-bottom: 4px; }
        .cat-count { font-size: 11px; color: var(--muted); }

        /* FOOTER */
        footer {
          background: var(--dark);
          color: rgba(255,255,255,0.6);
          padding: 48px 48px 28px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: block;
          margin-bottom: 12px;
        }
        .footer-logo span { color: var(--gold-light); }
        .footer-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 240px;
        }
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          margin-bottom: 16px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--gold-light); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px;
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        @media (max-width: 900px) {
          .cats-grid { grid-template-columns: repeat(3, 1fr); }
          .hero h1 { font-size: 40px; }
          .hero { padding: 70px 24px 60px; }
          .cats-section { padding: 48px 24px; }
          footer { padding: 40px 24px 24px; }
        }
        @media (max-width: 500px) {
          .cats-grid { grid-template-columns: repeat(2, 1fr); }
          .hero h1 { font-size: 32px; }
        }
      `}</style>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🇧🇩 Bangladesh&apos;s Trusted Wholesale Supplier</div>
        <h1>
          Premium Wholesale<br />
          Products for <span>Smart Traders</span>
        </h1>
        <p>
          Rice, oil, spices, beverages, dairy &amp; more — sourced directly,
          priced competitively. Serving retailers, hotels &amp; food businesses across Bangladesh.
        </p>
        <Link href="/products" className="hero-btn">
          Browse All Products →
        </Link>
      </section>

      {/* CATEGORIES */}
      <section className="cats-section">
        <div className="section-header">
          <div className="section-label">Shop by Category</div>
          <div className="section-title">Everything Your Business Needs</div>
        </div>
        <div className="cats-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.slug)}`}
              className="cat-card"
            >
              <span className="cat-icon">{cat.icon}</span>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-logo">Tanim <span>Distribution</span></Link>
            <p className="footer-desc">
              Bangladesh&apos;s trusted wholesale supplier for rice, oil, spices, beverages and dairy products.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Categories</div>
            <div className="footer-links">
              {categories.map((cat) => (
                <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.slug)}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a>📞 +880 1XXX-XXXXXX</a>
              <a>✉️ info@tanim.com</a>
              <a>📍 Dhaka, Bangladesh</a>
              <a>⏰ Sat–Thu, 9am–6pm</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Tanim Distribution. All rights reserved.
        </div>
      </footer>
    </>
  );
}
