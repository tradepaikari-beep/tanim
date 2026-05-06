export default function CTA() {
  return (
    <section className="cta-section" id="contact">
      <h2>Ready to Place a Bulk Order?</h2>
      <p>Join 1200+ businesses already sourcing from Tanim Distribution. Get your custom quote today.</p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
        <a href="tel:+8801700000000" className="btn-primary">📞 Call Now</a>
        <a href="mailto:order@tanimdistribution.com" className="btn-outline">✉️ Email Us</a>
      </div>
    </section>
  );
}
