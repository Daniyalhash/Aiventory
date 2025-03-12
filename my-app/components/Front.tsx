import React from 'react';
import '@/styles/Front.css'; // Import your CSS file


const Front = () => {
  return (
    <div className="inventory-dashboard">
      <header>
        <div className="header-content">
          <img src="/images/name.png" alt="Hiventoy Logo" className="logo" />
          <nav>
            <a href="#">Product</a>
            <a href="#">Solutions</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Testimonials</a>
          </nav>
          <div className="auth-buttons">
            <button className="signup-button">Sign Up</button>
            <button className="login-button">Log In</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore New Inventory Solutions</h1>
          <button className="get-started-button">Get Started</button>
        </div>
        <img src="/images/Frame1.png" alt="Vector Graphic" className="vector-graphic" />
      </section>

      <section className="dashboard-preview">
        {/* Placeholder for the dashboard preview image/content */}
        <div className="dashboard-image-container">
            <div className="dashboard-image">
                <p>Dashboard Preview</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Front;