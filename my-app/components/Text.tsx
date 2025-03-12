import React from "react";
import '@/styles/Text.css'; // Import the new CSS file

const Text = () => {
  return (
    <div className="text-section">
        <div className="text-container">
            {/* Outlined AI Text */}
            <div className="outlined-text">AI</div>

          {/* Foreground Bold Text */}
          <h1 className="main-text-2">
                EXPERIENCE <br />
                THE FUTURE <br />
                OF
            </h1>

            <h1 className="main-text">
                EXPERIENCE <br />
                THE FUTURE <br />
                OF
            </h1>
        </div>
    </div>
   
  );
};

export default Text;