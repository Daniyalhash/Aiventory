'use client';
import { useState } from 'react';
import UserCredentials from '@/components/UserCredentials';
import DatasetUpload from '@/components/DatasetUpload';
import DashboardButton from '@/components/DashboardButton';
import '@/styles/SignupPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from 'next/image';

import {
  faUser,
  faChevronLeft,
  faEdit,
  faCamera,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
const SignupPage = () => {
  const [step, setStep] = useState(1); // Track current step
  const [formData, setFormData] = useState({ email: "" }); // Store user credentials

  const handleCredentialsApproved = (data) => {
    // Update formData with user details (e.g., email) from UserCredentials component
    setFormData({ ...formData, ...data }); // Include user_id here
    setStep(2); // Move to DatasetUpload
  };
  const handleDatasetUploaded = () => setStep(3); // Move to Dashboard Button


  return (
    <div className="loginContainer">
         {/* Right Section */}


      {/* Left Section */}
      <div className="signLeft">
        <div className="logocontainer">
          <div className="logo">
            <Image 
            src="/images/logoPro.png" 
            alt="Logo"
             className="logImg" 
             width={100}
              height={100}
              hidden
              />
          </div>
     

        </div>
    


        {/* Login Form */}

          {/* Step 1: User Credentials */}
          {step === 1 && <UserCredentials onApproved={handleCredentialsApproved} />}

          {formData.user_id && step === 2 && (
          <DatasetUpload userId={formData.user_id} onUploadComplete={handleDatasetUploaded} />
        )}

        {formData.user_id && step === 3 && (
          <DashboardButton userId={formData.user_id} />
        )}
        



      </div>
        <div className="signRight">
        <div className="logoRight">
        <Link href="/">
        <Image
            src="/images/logoPro2.png"
            alt="Logo"
            className="logImg" 
            width={100}
            height={100}
            style={{ cursor: 'pointer' }} // Optional: Add pointer cursor
        />
    </Link>
        </div>
        {/* 3D Look Animated Video */}
    <video
        className="animatedVideo"
        autoPlay
        loop
        muted
        playsInline
        src="/video/vid3.mp4"
        type="video/mp4"
    ></video>
        </div>
    </div>
  );
};

export default SignupPage;



  
