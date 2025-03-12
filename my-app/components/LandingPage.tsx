import React from 'react';
import "@/styles/LandingPage.css"; // Import your CSS styles

const LandingPage = () => {
  return (
    <div className="landingContainer">
      <h1>Explore New <br /> Inventory Solutions</h1>
      <button className="getStarted">Get Started</button>

      {/* Dashboard Image Section */}
      <div className="dashboardImage">
        <img src="/images/dashboard-mockup.png" alt="Dashboard Preview" />
      </div>
      <div className="dashboardImage2">
      <img src="/images/arrow8.png" alt="Dashboard Preview" />
      </div>
      <div className="dashboardImage3">
      <img src="/images/arrow3.png" alt="Dashboard Preview" />
      </div>
      <div className="dashboardImage4">
      <img src="/images/cross1.png" alt="Dashboard Preview" />
      </div>
      <div className="dashboardImage5">
      <img src="/images/cross1.png" alt="Dashboard Preview" />
      </div>
      <div className="dashboardImage6">
      <img src="/images/cross1.png" alt="Dashboard Preview" />
      </div>
    </div>
  );
};

export default LandingPage;
