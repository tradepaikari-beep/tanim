const stats = [
  { value: "500+", label: "Products" },
  { value: "1200+", label: "Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "64", label: "Districts Covered" },
];

export default function Stats() {
  return (
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
  );
}
