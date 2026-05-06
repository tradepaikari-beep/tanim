export default function Footer() {
  return (
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
  );
}
