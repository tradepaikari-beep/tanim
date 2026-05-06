const products = [
  { name: "Rice & Grains", desc: "Premium quality rice, wheat, and grains from trusted suppliers", icon: "🌾", unit: "50kg bags" },
  { name: "Edible Oils", desc: "Soybean, palm, and sunflower oils for bulk B2B orders", icon: "🫙", unit: "20L cans" },
  { name: "Sugar & Salt", desc: "Refined sugar and iodized salt in wholesale quantities", icon: "🧂", unit: "25kg bags" },
  { name: "Beverages", desc: "Soft drinks, juices, and packaged water for retailers", icon: "🧃", unit: "Case packs" },
  { name: "Dairy Products", desc: "Milk powder, condensed milk and dairy essentials", icon: "🥛", unit: "Carton lots" },
  { name: "Spices & Condiments", desc: "Authentic Bangladeshi spices and condiments", icon: "🌶️", unit: "Bulk packs" },
];

export default function Categories() {
  return (
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
  );
}
