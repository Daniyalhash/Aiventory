"use client"; // Ensure this runs only on the client
import React from "react";
import teamData from "@/components/Team"
import '@/styles/Aboutuss.css'; // Import the new CSS file

const AboutWeb = () => {
  
  return (
    <div className="about-us">
      <div className="stars">
        
          <img  src="/images/arrow3.png"  alt="Star" className="starsmall" />
      </div>

      <div className="about-us-header">
        <h2>We are the people who make up Innovations</h2>
        <p>
          Our team of expert data scientists, innovative thinkers, and industry
          leaders have built the ultimate inventory management solution to
          revolutionize your operations. Backed by cutting-edge AI, we ensure
          efficiency, accuracy, and scalability for your business needs.
        </p>
        <img src="/images/cross1.png" alt="Close" className="close-icon" />
      </div>

      <div className="team-container">
        {teamData.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="member-image" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutWeb;
