"use client";
import { useState, useMemo } from "react";

const products = [
  { id: 1, name: "Miniket Rice", category: "Rice & Grains", price: 3200, unit: "50kg bag", minOrder: 5, icon: "🌾", badge: "Best Seller", desc: "Premium quality Miniket rice, fine grain, sourced from Dinajpur. Perfect for retailers and hotels.", stock: 240 },
  { id: 2, name: "Najirshail Rice", category: "Rice & Grains", price: 2800, unit: "50kg bag", minOrder: 5, icon: "🌾", badge: null, desc: "Aromatic Najirshail rice ideal for everyday cooking. High demand among grocery retailers.", stock: 180 },
  { id: 3, name: "Wheat Flour (Atta)", category: "Rice & Grains", price: 1800, unit: "25kg bag", minOrder: 10, icon: "🌾", badge: null, desc: "Fine milled wheat flour suitable for bakeries and food manufacturers.", stock: 320 },
  { id: 4, name: "Soybean Oil", category: "Edible Oils", price: 2600, unit: "20L can", minOrder: 10, icon: "🫙", badge: "Popular", desc: "Grade A refined soybean oil. Suitable for restaurants, hotels and food processing.", stock: 150 },
  { id: 5, name: "Palm Oil", category: "Edible Oils", price: 2200, unit: "20L can", minOrder: 10, icon: "🫙", badge: null, desc: "High quality refined palm oil for industrial and commercial cooking.", stock: 200 },
  { id: 6, name: "Sunflower Oil", category: "Edible Oils", price: 3100, unit: "20L can", minOrder: 5, icon: "🫙", badge: "Premium", desc: "Imported refined sunflower oil, light and healthy, preferred by health-conscious buyers.", stock: 90 },
  { id: 7, name: "Refined Sugar", category: "Sugar & Salt", price: 1400, unit: "25kg bag", minOrder: 20, icon: "🧂", badge: "Best Seller", desc: "Pure white refined sugar from local mills. Consistent quality for bulk orders.", stock: 500 },
  { id: 8, name: "Iodized Salt", category: "Sugar & Salt", price: 480, unit: "25kg bag", minOrder: 20, icon: "🧂", badge: null, desc: "BDS certified iodized salt. Essential commodity for all food businesses.", stock: 600 },
  { id: 9, name: "Coca-Cola 250ml", category: "Beverages", price: 1800, unit: "Case (24 pcs)", minOrder: 10, icon: "🧃", badge: null, desc: "Coca-Cola 250ml cans in case packs. Fast moving item for restaurants and shops.", stock: 300 },
  { id: 10, name: "Mango Juice 1L", category: "Beverages", price: 2400, unit: "Case (12 pcs)", minOrder: 5, icon: "🧃", badge: "Popular", desc: "Premium mango juice in Tetra Pak packaging. High margin product for retailers.", stock: 220 },
  { id: 11, name: "Packaged Water 500ml", category: "Beverages", price: 900, unit: "Case (24 pcs)", minOrder: 20, icon: "🧃", badge: null, desc: "BDS certified packaged drinking water. Essential for events and hospitality.", stock: 800 },
  { id: 12, name: "Full Cream Milk Powder", category: "Dairy", price: 4800, unit: "Carton (12×400g)", minOrder: 5, icon: "🥛", badge: "Premium", desc: "Imported full cream milk powder. Used in bakeries, cafes and food production.", stock: 110 },
  { id: 13, name: "Condensed Milk", category: "Dairy", price: 3200, unit: "Carton (24 tins)", minOrder: 5, icon: "🥛", badge: null, desc: "Sweet condensed milk in tins. High demand during Ramadan and festival seasons.", stock: 160 },
  { id: 14, name: "Mixed Spice Pack", category: "Spices", price: 2100, unit: "Bulk 5kg pack", minOrder: 10, icon: "🌶️", badge: null, desc: "Authentic Bangladeshi mixed spice blend for restaurants and food manufacturers.", stock: 280 },
  { id: 15, name: "Turmeric Powder", category: "Spices", price: 1600, unit: "Bulk 5kg pack", minOrder: 10, icon: "🌶️", badge: "Best Seller", desc: "Pure ground turmeric from local farms. Essential ingredient for all Bangladeshi cooking.", stock: 350 },
  { id: 16, name: "Chilli Powder", category: "Spices", price: 1900, unit: "Bulk 5kg pack", minOrder: 10, icon: "🌶️", badge: null, desc: "Finely ground red chilli powder, medium-hot grade for commercial use.", stock: 190 },
];

const categories = ["All", "Rice & Grains", "Edible Oils", "Sugar & Salt", "Beverages", "Dairy", "Spices"];
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [addedId, setAddedId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sort]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, qty: quantity }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const openDetail = (p) => { setSelectedProduct(p); setQty(p.minOrder); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

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

        .topbar {
          background: var(--green);
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 2px 20px rgba(0,0,0,0.15);
        }
        .logo { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #fff; cursor: pointer; }
        .logo span { color: var(--gold-light); }
        .topbar-right { display: flex; align-items: center; gap: 20px; }
        .cart-btn {
          background: var(--gold);
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .cart-btn:hover { background: var(--gold-light); color: var(--dark); }
        .cart-badge {
          background: #fff;
          color: var(--green);
          font-size: 11px;
          font-weight: 700;
          width: 20px; height: 20px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .page { display: flex; min-height: calc(100vh - 64px); }

        .sidebar {
          width: 240px;
          flex-shrink: 0;
          background: var(--white);
          border-right: 1px solid var(--border);
          padding: 32px 24px;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
        }
        .sidebar-title { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
        .cat-btn {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 4px;
        }
        .cat-btn:hover { background: var(--green-pale); color: var(--green); }
        .cat-btn.active { background: var(--green); color: #fff; font-weight: 600; }

        .main { flex: 1; padding: 32px 40px; }

        .toolbar { display: flex; gap: 16px; align-items: center; margin-bottom: 32px; flex-wrap: wrap; }
        .search-wrap { flex: 1; min-width: 200px; position: relative; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          background: var(--white);
          color: var(--text);
          transition: border-color 0.2s;
          outline: none;
        }
        .search-input:focus { border-color: var(--green); }
        .sort-select {
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          background: var(--white);
          color: var(--text);
          cursor: pointer;
          outline: none;
        }
        .results-count { font-size: 14px; color: var(--muted); white-space: nowrap; }
        .results-count strong { color: var(--green); }

        .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.25s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,92,46,0.12); border-color: var(--green-light); }
        .card-top {
          background: var(--green-pale);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          position: relative;
          min-height: 110px;
        }
        .badge { position: absolute; top: 12px; left: 12px; background: var(--gold); color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 100px; letter-spacing: 0.5px; text-transform: uppercase; }
        .badge.premium { background: var(--green); }
        .card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .card-cat { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--green-light); margin-bottom: 6px; }
        .card-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--dark); margin-bottom: 8px; line-height: 1.3; }
        .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; }
        .card-price { font-size: 18px; font-weight: 700; color: var(--dark); }
        .card-price span { font-size: 12px; font-weight: 400; color: var(--muted); display: block; line-height: 1.2; }
        .add-btn {
          background: var(--green);
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .add-btn:hover { background: var(--green-light); transform: scale(1.03); }
        .add-btn.added { background: #2d8a47; }
        .min-order { font-size: 11px; color: var(--muted); margin-top: 8px; }

        .empty { grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--muted); }
        .empty-icon { font-size: 56px; margin-bottom: 16px; }
        .empty h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--dark); margin-bottom: 8px; }

        .overlay { position: fixed; inset: 0; background: rgba(10,20,10,0.6); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: var(--white); border-radius: 20px; width: 100%; max-width: 560px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.3); animation: modalIn 0.25s ease; }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-top { background: var(--green-pale); padding: 40px; text-align: center; font-size: 72px; position: relative; }
        .modal-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.08); border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .modal-close:hover { background: rgba(0,0,0,0.16); }
        .modal-body { padding: 28px 32px 32px; }
        .modal-cat { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--green-light); margin-bottom: 8px; }
        .modal-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; color: var(--dark); margin-bottom: 12px; }
        .modal-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
        .modal-meta { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .meta-chip { background: var(--green-pale); border: 1px solid rgba(26,92,46,0.12); padding: 8px 14px; border-radius: 8px; font-size: 13px; color: var(--green); font-weight: 500; }
        .meta-chip strong { display: block; font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .qty-label { font-size: 14px; font-weight: 600; color: var(--text); }
        .qty-control { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: 10px; overflow: hidden; }
        .qty-control button { background: var(--green-pale); border: none; width: 38px; height: 38px; font-size: 18px; cursor: pointer; color: var(--green); font-weight: 700; transition: background 0.15s; }
        .qty-control button:hover { background: var(--green); color: #fff; }
        .qty-control input { width: 56px; text-align: center; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: var(--dark); background: #fff; outline: none; padding: 8px 0; }
        .modal-price { font-size: 28px; font-weight: 700; color: var(--dark); margin-bottom: 20px; }
        .modal-price span { font-size: 14px; font-weight: 400; color: var(--muted); }
        .modal-add-btn { width: 100%; background: var(--green); color: #fff; border: none; padding: 16px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .modal-add-btn:hover { background: var(--green-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(26,92,46,0.25); }

        .cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 380px; background: var(--white); box-shadow: -8px 0 40px rgba(0,0,0,0.15); z-index: 300; display: flex; flex-direction: column; animation: drawerIn 0.3s ease; }
        @keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .cart-header { padding: 24px 28px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .cart-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--dark); }
        .cart-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--muted); }
        .cart-items { flex: 1; overflow-y: auto; padding: 20px 28px; display: flex; flex-direction: column; gap: 16px; }
        .cart-item { display: flex; gap: 14px; align-items: center; padding: 14px; border: 1px solid var(--border); border-radius: 12px; }
        .cart-item-icon { font-size: 28px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--green-pale); border-radius: 8px; flex-shrink: 0; }
        .cart-item-info { flex: 1; }
        .cart-item-name { font-size: 14px; font-weight: 600; color: var(--dark); margin-bottom: 2px; }
        .cart-item-meta { font-size: 12px; color: var(--muted); }
        .cart-item-price { font-size: 15px; font-weight: 700; color: var(--green); }
        .cart-remove { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; transition: color 0.15s; }
        .cart-remove:hover { color: #e53e3e; }
        .cart-footer { padding: 20px 28px; border-top: 1px solid var(--border); }
        .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .cart-total-label { font-size: 15px; font-weight: 600; color: var(--text); }
        .cart-total-value { font-size: 22px; font-weight: 700; color: var(--dark); }
        .checkout-btn { width: 100%; background: var(--gold); color: #fff; border: none; padding: 16px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .checkout-btn:hover { background: var(--gold-light); color: var(--dark); }
        .empty-cart { text-align: center; padding: 60px 20px; color: var(--muted); }
        .empty-cart-icon { font-size: 48px; margin-bottom: 16px; }

        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main { padding: 20px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .topbar { padding: 0 20px; }
          .cart-drawer { width: 100%; }
        }
        @media (max-width: 500px) { .products-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="logo">Tanim <span>Distribution</span></div>
        <div className="topbar-right">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="page">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-title">Categories</div>
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="toolbar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="results-count"><strong>{filtered.length}</strong> products</div>
          </div>

          <div className="products-grid">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try a different search or category</p>
              </div>
            ) : filtered.map(p => (
              <div key={p.id} className="card" onClick={() => openDetail(p)}>
                <div className="card-top">
                  {p.badge && <span className={`badge ${p.badge === "Premium" ? "premium" : ""}`}>{p.badge}</span>}
                  {p.icon}
                </div>
                <div className="card-body">
                  <div className="card-cat">{p.category}</div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-desc">{p.desc}</div>
                  <div className="min-order">Min. order: {p.minOrder} {p.unit}s</div>
                  <div className="card-footer" style={{marginTop: 12}}>
                    <div className="card-price">
                      ৳{p.price.toLocaleString()}
                      <span>per {p.unit}</span>
                    </div>
                    <button
                      className={`add-btn ${addedId === p.id ? "added" : ""}`}
                      onClick={e => { e.stopPropagation(); addToCart(p); }}
                    >
                      {addedId === p.id ? "✓ Added" : "+ Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
              {selectedProduct.icon}
            </div>
            <div className="modal-body">
              <div className="modal-cat">{selectedProduct.category}</div>
              <div className="modal-name">{selectedProduct.name}</div>
              <div className="modal-desc">{selectedProduct.desc}</div>
              <div className="modal-meta">
                <div className="meta-chip"><strong>Unit</strong>{selectedProduct.unit}</div>
                <div className="meta-chip"><strong>Min Order</strong>{selectedProduct.minOrder} units</div>
                <div className="meta-chip"><strong>Stock</strong>{selectedProduct.stock} available</div>
              </div>
              <div className="qty-row">
                <span className="qty-label">Quantity:</span>
                <div className="qty-control">
                  <button onClick={() => setQty(q => Math.max(selectedProduct.minOrder, q - 1))}>−</button>
                  <input type="number" value={qty} onChange={e => setQty(Math.max(selectedProduct.minOrder, Number(e.target.value)))} />
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>
              <div className="modal-price">
                ৳{(selectedProduct.price * qty).toLocaleString()}
                <span> ({qty} × ৳{selectedProduct.price.toLocaleString()})</span>
              </div>
              <button className="modal-add-btn" onClick={() => { addToCart(selectedProduct, qty); setSelectedProduct(null); setCartOpen(true); }}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <div className="cart-title">🛒 Your Cart</div>
              <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-icon">{item.icon}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">{item.qty} × ৳{item.price.toLocaleString()}</div>
                  </div>
                  <div className="cart-item-price">৳{(item.price * item.qty).toLocaleString()}</div>
                  <button className="cart-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-value">৳{cartTotal.toLocaleString()}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
