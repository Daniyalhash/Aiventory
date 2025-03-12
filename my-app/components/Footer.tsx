"use client";

import React from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay, FaLinkedin } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import '@/styles/Footer.css'; // Import the new CSS file
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
    const pathname = usePathname();

  return (
    <footer className="footer">
        <div className="footer-images">
            <div className="star-icon">
            <Image src="/images/star2.png" alt="3D Green Shape" width={300} height={300} />
            </div>
            <div className="star-icon-2">
                <Image src="/images/star3.png" alt="3D Green Shape" width={300} height={300} />
            </div>
        </div>
        <div className="footer-heading">
            <h1 className="footer-title">
            Start innovation of <br /> inventory today
            </h1>
        </div>
        
        <div className="footer-subHeading">
        <Link href="/login" shallow>
        Get Started
                <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
            </Link>
            </div>
      <div className="footer-section">
        <div className="footer-section-heading">
            <h2>
                <span className="footer-brand">A</span>
                </h2>
            <h2>
             <span className='footer-brandSub'>iventory</span>
            </h2>
        </div>
        <div className="footer-links">
            <div>
                <h3 className="link-title">Product</h3>
                <ul className="link-list">
                    <li>Overview</li>
                    <li>Features</li>
                    <li>Tutorials</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <div>
                <h3 className="link-title">Company</h3>
                <ul className="link-list">

          
                    <li >

                        <Link href="/aboutus">
                        About Us 
                        </Link>
                    </li>
                    <li>
                    <Link href="/contact">
                         Contact
                        </Link>

                    </li>
                </ul>
            </div>
        
      </div>
      </div>
  
      
      <div className="social-buttons">
        <button className="store-button">
          <FaApple /> Get it on <strong>Play Store</strong>
        </button>
        <button className="store-button">
          <FaGooglePlay /> Get it on <strong>Google Play</strong>
        </button>
        <div className="iconDiv">
        <RxCross2 className="icon" />

       
        
<FaLinkedin className="icon" />
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;