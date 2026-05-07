"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartPop, setCartPop] = useState(false);
  const [signinPop, setSigninPop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCart = () => {
    setCartPop(true);
    setTimeout(() => setCartPop(false), 400);
  };

  const handleSignin = () => {
    setSigninPop(true);
    setTimeout(() => setSigninPop(false), 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        .navbar {
          background: #1a5c2e;
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background 0.3s, box-shadow 0.3s;
          box-shadow: 0 2px 20px rgba(0,0,0,0.15);
        }
        .navbar.scrolled {
          background: #0f3d1f;
          box-shadow: 0 4px 30px rgba(0,0,0,0.28);
        }

        .navbar-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: opacity 0.2s;
        }
        .navbar-logo:hover { opacity: 0.85; }
        .navbar-logo span { color: #e8b84b; }

        .navbar-icons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-icon-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          position: relative;
          outline: none;
        }
        .nav-icon-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.3);
        }
        .nav-icon-btn.pop {
          animation: iconPop 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        @keyframes iconPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.28); }
          60%  { transform: scale(0.92); }
          100% { transform: scale(1); }
        }

        .nav-icon-btn svg {
          width: 20px;
          height: 20px;
          stroke: #fff;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.2s;
        }
        .nav-icon-btn:hover svg { stroke: #e8b84b; }

        .cart-badge {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 8px;
          height: 8px;
          background: #e8b84b;
          border-radius: 50%;
          border: 1.5px solid #1a5c2e;
        }

        @media (max-width: 600px) {
          .navbar { padding: 0 20px; }
          .navbar-logo { font-size: 18px; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          Tanim <span>Distribution</span>
        </Link>

        {/* ICONS */}
        <div className="navbar-icons">
          {/* Cart */}
          <button
            className={`nav-icon-btn${cartPop ? " pop" : ""}`}
            onClick={handleCart}
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="cart-badge" />
          </button>

          {/* Sign In */}
          <button
            className={`nav-icon-btn${signinPop ? " pop" : ""}`}
            onClick={handleSignin}
            aria-label="Sign In"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
