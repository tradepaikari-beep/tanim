"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    { name: "Rice & Grains", desc: "Premium quality rice, wheat, and grains from trusted suppliers", icon: "🌾", unit: "50kg bags" },
    { name: "Edible Oils", desc: "Soybean, palm, and sunflower oils for bulk B2B orders", icon: "🫙", unit: "20L cans" },
    { name: "Sugar & Salt", desc: "Refined sugar and iodized salt in wholesale quantities", icon: "🧂", unit: "25kg bags" },
    { name: "Beverages", desc: "Soft drinks, juices, and packaged water for retailers", icon: "🧃", unit: "Case packs" },
    { name: "Dairy Products", desc: "Milk powder, condensed milk and dairy essentials", icon: "🥛", unit: "Carton lots" },
    { name: "Spices & Condiments", desc: "Authentic Bangladeshi spices and condiments", icon: "🌶️", unit: "Bulk packs" },
  ];

  const stats = [
    { value: "500+", label: "Products" },
    { value: "1200+", label: "Clients" },
    { value: "15+", label: "Years Experience" },
    { value: "64", label: "Districts Covered" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green: #1a5c2e;
          --green-light: #2d8a47;
          --gold: #c8922a;
          --gold-light: #e8b84b;
          --cream: #faf6ee;
          --dark: #0f1f0f;
          --text: #2c3e2d;
          --border: #d4c9a8;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--text);
          overflow-x: hidden;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s ease;
        }
        nav.scrolled {
          background: rgba(26, 92, 46, 0.97);
          backdrop-filter: blur(12px);
          padding: 14px 40px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.2);
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .logo span { color: var(--gold-light); }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--gold-light); }
        .nav-cta {
          background: var(--gold);
          color: #fff !important;
          padding: 10px 22px;
          border-radius: 6px;
          font-weight: 600 !important;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: var(--gold-light) !important; color: var(--dark) !important; }

        /* HERO */
        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, var(--dark) 0%, #0d2e15 40%, #1a5c2e 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 40px 80px;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,146,42,0.2);
          border: 1px solid rgba(200,146,42,0.4);
          color: var(--gold-light);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }
        .hero-content { max-width: 680px; position: relative; z-index: 1; }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 76px);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .hero h1 em {
          font-style: normal;
          color: var(--gold-light);
          display: block;
        }
        .hero p {
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 520px;
        }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold);
          color: #fff;
          padding: 16px 36px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover { background: var(--gold-light); color: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,146,42,0.4); }
        .btn-outline {
          background: transparent;
          color: #fff;
          padding: 16px 36px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.3);
          transition: all 0.3s;
          cursor: pointer;
        }
        .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

        .hero-visual {
          position: absolute;
          right: -100px;
          top: 50%;
          transform: translateY(-50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,138,71,0.3) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 220px;
          opacity: 0.15;
        }

        /* STATS */
        .stats {
          background: var(--green);
          padding: 50px 40px;
        }
        .stats-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
        }
        .stat-item { padding: 20px; }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 900;
          color: var(--gold-light);
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* SECTION */
        section { padding: 100px 40px; }
        .section-tag {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green-light);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          color: var(--dark);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .section-desc {
          font-size: 16px;
          color: #5a6b5b;
          max-width: 520px;
          line-height: 1.7;
        }
        .section-header { margin-bottom: 60px; }
        .max-w { max-width: 1200px; margin: 0 auto; }

        /* PRODUCTS */
        .products-bg { background: var(--cream); }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .product-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 36px 32px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .product-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--green), var(--gold));
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(26,92,46,0.12); border-color: var(--green-light); }
        .product-card:hover::after { transform: scaleX(1); }
        .product-icon { font-size: 44px; margin-bottom: 20px; display: block; }
        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 10px;
        }
        .product-desc { font-size: 14px; color: #6b7b6c; line-height: 1.6; margin-bottom: 20px; }
        .product-unit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(26,92,46,0.08);
          color: var(--green);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          letter-spacing: 0.3px;
        }

        /* WHY US */
        .why-bg { background: var(--dark); }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .why-content .section-title { color: #fff; }
        .why-content .section-desc { color: rgba(255,255,255,0.6); }
        .features-list { margin-top: 40px; display: flex; flex-direction: column; gap: 24px; }
        .feature-item { display: flex; gap: 16px; align-items: flex-start; }
        .feature-icon {
          width: 44px; height: 44px;
          background: rgba(200,146,42,0.15);
          border: 1px solid rgba(200,146,42,0.3);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .feature-text h4 { color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 4px; }
        .feature-text p { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 1.6; }
        .why-visual {
          background: linear-gradient(135deg, rgba(45,138,71,0.2), rgba(200,146,42,0.1));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .order-preview {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 20px 24px;
        }
        .order-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .order-preview-header span { color: rgba(255,255,255,0.5); font-size: 12px; }
        .order-preview-header strong { color: var(--gold-light); font-size: 13px; }
        .order-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .order-item:last-child { border: none; }
        .order-item span { color: rgba(255,255,255,0.7); font-size: 13px; }
        .order-item strong { color: #fff; font-size: 13px; }

        /* CTA */
        .cta-section {
          background: linear-gradient(135deg, var(--green) 0%, #0d3318 100%);
          text-align: center;
          padding: 100px 40px;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '🌾';
          position: absolute;
          font-size: 300px;
          opacity: 0.05;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          color: #fff;
          margin-bottom: 20px;
          position: relative;
        }
        .cta-section p {
          color: rgba(255,255,255,0.7);
          font-size: 17px;
          max-width: 480px;
          margin: 0 auto 40px;
          line-height: 1.7;
          position: relative;
        }

        /* FOOTER */
        footer {
          background: #080f08;
          padding: 60px 40px 30px;
          color: rgba(255,255,255,0.5);
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-brand .logo { font-size: 20px; display: block; margin-bottom: 16px; }
        .footer-brand p { font-size: 14px; line-height: 1.7; max-width: 260px; }
        .footer-col h5 {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-col ul li a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-col ul li a:hover { color: var(--gold-light); }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .products-grid { grid-template-columns: 1fr 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .products-grid { grid-template-columns: 1fr; }
          nav { padding: 16px 20px; }
          section { padding: 70px 20px; }
          .hero { padding: 100px 20px 60px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="logo">Tanim <span>Distribution</span></div>
        <ul className="nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/admin" className="nav-cta">Admin Panel</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🇧🇩 Bangladesh's Trusted B2B Distributor</div>
          <h1>
            Premium Food &
            <em>Beverage Distribution</em>
          </h1>
          <p>
            Tanim Distribution connects manufacturers with retailers across Bangladesh.
            Bulk orders, reliable supply chain, competitive wholesale pricing — all in one platform.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">Browse Products →</a>
            <a href="#contact" className="btn-outline">Get Wholesale Price</a>
          </div>
        </div>
        <div className="hero-visual">🌾</div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="products-bg" id="products">
        <div className="max-w">
          <div className="section-header">
            <div className="section-tag">Our Categories</div>
            <h2 className="section-title">Food & Beverage<br />Product Range</h2>
            <p className="section-desc">
              From staple groceries to premium beverages — we supply everything your business needs at wholesale rates.
            </p>
          </div>
          <div className="products-grid">
            {products.map((p, i) => (
              <div key={i} className="product-card">
                <span className="product-icon">{p.icon}</span>
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.desc}</div>
                <div className="product-unit">📦 {p.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-bg" id="about">
        <div className="max-w">
          <div className="why-grid">
            <div className="why-content">
              <div className="section-tag" style={{color: 'rgba(232,184,75,0.8)'}}>Why Choose Us</div>
              <h2 className="section-title">Bangladesh's Most Reliable Distribution Partner</h2>
              <p className="section-desc">
                We've been serving retailers, hotels, and food businesses across all 64 districts for over 15 years.
              </p>
              <div className="features-list">
                {[
                  { icon: "🚚", title: "Fast Nationwide Delivery", desc: "Same-day dispatch for Dhaka, 48hr delivery across Bangladesh" },
                  { icon: "💰", title: "Competitive Wholesale Pricing", desc: "Best market rates with volume discounts for regular buyers" },
                  { icon: "✅", title: "Quality Guaranteed", desc: "All products sourced from certified manufacturers only" },
                  { icon: "📞", title: "Dedicated Account Manager", desc: "Personal support for every B2B client" },
                ].map((f, i) => (
                  <div key={i} className="feature-item">
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-visual">
              <div style={{color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase'}}>Sample Order</div>
              <div className="order-preview">
                <div className="order-preview-header">
                  <strong>ORD-2024-0847</strong>
                  <span>🟢 Confirmed</span>
                </div>
                {[
                  { name: "Miniket Rice 50kg", qty: "20 bags" },
                  { name: "Soybean Oil 20L", qty: "15 cans" },
                  { name: "Sugar 25kg", qty: "10 bags" },
                ].map((item, i) => (
                  <div key={i} className="order-item">
                    <span>{item.name}</span>
                    <strong>{item.qty}</strong>
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0'}}>
                <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px'}}>Delivery: Within 24hrs</span>
                <span style={{color: 'var(--gold-light)', fontWeight: 600, fontSize: '15px'}}>৳ 48,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Ready to Place a Bulk Order?</h2>
        <p>Join 1200+ businesses already sourcing from Tanim Distribution. Get your custom quote today.</p>
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative'}}>
          <a href="tel:+8801700000000" className="btn-primary">📞 Call Now</a>
          <a href="mailto:order@tanimdistribution.com" className="btn-outline">✉️ Email Us</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo">Tanim <span>Distribution</span></span>
            <p>Bangladesh's trusted wholesale food & beverage distributor. Serving businesses since 2009.</p>
          </div>
          <div className="footer-col">
            <h5>Products</h5>
            <ul>
              <li><a href="#">Rice & Grains</a></li>
              <li><a href="#">Edible Oils</a></li>
              <li><a href="#">Beverages</a></li>
              <li><a href="#">Dairy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="#">Dhaka, Bangladesh</a></li>
              <li><a href="#">+880 1700-000000</a></li>
              <li><a href="#">order@tanimdist.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Tanim Distribution. All rights reserved.</span>
          <span>Made with ❤️ in Bangladesh</span>
        </div>
      </footer>
    </>
  );
}
