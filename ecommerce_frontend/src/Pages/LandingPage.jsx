import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const FEATURES = [
  { icon: "🔐", title: "JWT Authentication", desc: "Secure register & login with Spring Security and stateless JWT tokens." },
  { icon: "🛒", title: "Shopping Cart", desc: "Add, update quantities and remove items. Cart persists per user." },
  { icon: "📦", title: "Order Management", desc: "Place orders, view history, cancel items and auto-update stock." },
  { icon: "💳", title: "Razorpay Payments", desc: "UPI, cards, net banking and wallets — all in one smooth checkout." },
  { icon: "🖼️", title: "Product Images", desc: "Upload and serve product images via backend API endpoints." },
  { icon: "📊", title: "Stock Control", desc: "Inventory updates automatically after every order or cancellation." },
  { icon: "👤", title: "User Profile", desc: "View and update personal account information." },
  { icon: "⚙️", title: "Admin Dashboard", desc: "Manage products, monitor orders and handle users." },
];

const STACK = [
  { category: "Frontend",  items: ["React.js", "React Router", "Axios", "CSS"] },
  { category: "Backend",   items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "Spring Data JPA", "Hibernate"] },
  { category: "Database",  items: ["PostgreSQL"] },
  { category: "Security",  items: ["JWT Authentication", "Stateless Sessions"] },
  { category: "Payments",  items: ["Razorpay"] },
  { category: "Tools",     items: ["Maven", "Postman", "IntelliJ IDEA", "VS Code"] },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="sm-lp-wrapper">

      {/* NAV */}
      <nav className="sm-lp-nav">
        <span className="sm-lp-logo">SRK16 Mart</span>
        <button className="sm-lp-nav-btn" onClick={() => navigate("/home")}>Open App →</button>
      </nav>

      {/* INTRO */}
      <section className="sm-lp-intro">
        <div className="sm-lp-intro-text">
          <p className="sm-lp-label">Full-Stack E-Commerce Application</p>
          <h1>SRK16 Mart</h1>
          <p className="sm-lp-intro-desc">
            A complete e-commerce web application built from scratch using React and
            Spring Boot. Covers the full shopping flow — from browsing products and
            managing a cart to placing orders and paying securely via Razorpay.
          </p>
          <div className="sm-lp-intro-btns">
            <button className="sm-lp-btn-primary" onClick={() => navigate("/home")}>
              Explore the App
            </button>
            <a
              className="sm-lp-btn-ghost"
              href="https://github.com/sriramakrishna16/ecommerce"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="sm-lp-intro-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=90"
            alt="E-commerce shopping"
            className="sm-lp-intro-img"
          />
        </div>
      </section>

      <div className="sm-lp-divider" />

      {/* FEATURES */}
      <section className="sm-lp-section">
        <div className="sm-lp-section-header">
          <p className="sm-lp-label">Features</p>
          <h2 className="sm-lp-section-title">What's covered in this project</h2>
        </div>
        <div className="sm-lp-feat-grid">
          {FEATURES.map((f) => (
            <div className="sm-lp-feat-card" key={f.title}>
              <span className="sm-lp-feat-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sm-lp-divider" />

      {/* STACK */}
      <section className="sm-lp-section">
        <div className="sm-lp-section-header">
          <p className="sm-lp-label">Tech Stack</p>
          <h2 className="sm-lp-section-title">Technologies used to build this</h2>
        </div>
        <div className="sm-lp-stack-grid">
          {STACK.map((s) => (
            <div className="sm-lp-stack-card" key={s.category}>
              <h3>{s.category}</h3>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="sm-lp-divider" />

      {/* BOTTOM CTA */}
      <section className="sm-lp-bottom">
        <h2>Ready to explore?</h2>
        <p>Browse products, manage your cart and checkout with Razorpay.</p>
        <button className="sm-lp-btn-primary" onClick={() => navigate("/home")}>
          Explore the App
        </button>
      </section>

      {/* FOOTER */}
      <footer className="sm-lp-footer">
        <span>Built by <strong>Sriramakrishna16</strong></span>
        <a
          href="https://github.com/sriramakrishna16/ecommerce"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </footer>

    </div>
  );
}