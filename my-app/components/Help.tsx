"use client";

import React from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay, FaLinkedin } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import '@/styles/Help.css'; // Import the new CSS file
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const Help = () => {
    const pathname = usePathname();

  return (
    <div className="Help">
        
        <div className="Help-heading">
            <h1 className="Help-title">
            Start innovation of <br /> inventory today
            </h1>
        </div>
        
        
    </div>
  );
};

export default Help;