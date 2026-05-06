const features = [
  { icon: "🚚", title: "Fast Nationwide Delivery", desc: "Same-day dispatch for Dhaka, 48hr delivery across Bangladesh" },
  { icon: "💰", title: "Competitive Wholesale Pricing", desc: "Best market rates with volume discounts for regular buyers" },
  { icon: "✅", title: "Quality Guaranteed", desc: "All products sourced from certified manufacturers only" },
  { icon: "📞", title: "Dedicated Account Manager", desc: "Personal support for every B2B client" },
];

const orderItems = [
  { name: "Miniket Rice 50kg", qty: "20 bags" },
  { name: "Soybean Oil 20L", qty: "15 cans" },
  { name: "Sugar 25kg", qty: "10 bags" },
];

export default function WhyChooseUs() {
  return (
    <section className="why-bg" id="about">
      <div className="max-w">
        <div className="why-grid">
          <div className="why-content">
            <div className="section-tag" style={{ color: "rgba(232,184,75,0.8)" }}>Why Choose Us</div>
            <h2 className="section-title">Bangladesh's Most Reliable Distribution Partner</h2>
            <p className="section-desc">
              We've been serving retailers, hotels, and food businesses across all 64 districts for over 15 years.
            </p>
            <div className="features-list">
              {features.map((f, i) => (
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
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>Sample Order</div>
            <div className="order-preview">
              <div className="order-preview-header">
                <strong>ORD-2024-0847</strong>
                <span>🟢 Confirmed</span>
              </div>
              {orderItems.map((item, i) => (
                <div key={i} className="order-item">
                  <span>{item.name}</span>
                  <strong>{item.qty}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 0" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Delivery: Within 24hrs</span>
              <span style={{ color: "var(--gold-light)", fontWeight: 600, fontSize: "15px" }}>৳ 48,500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
