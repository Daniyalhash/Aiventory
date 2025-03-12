import React from "react";
import '@/styles/Laptop.css'; // Import the new CSS file
import Image from "next/image";

const Laptop = () => {
  return (
    <div className="Laptop-section">
        <div className="Laptop-container">
            <Image
                 src="/images/laptop.png" // Adjust path if necessary
                 alt="laptop Prototype"
                 width={1030}
                 height={530}
                 className="laptop-image"
            />
            <video 
                className="laptop-video" 
                autoPlay 
                loop 
                muted 
                playsInline 
                width="840" 
                height="490"
            >
                <source src="/video/laptop.mp4" type="video/mp4" /> 
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
  );
};

export default Laptop;