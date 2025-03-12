import Link from 'next/link';
import '@/styles/SignupPage.css';
import { useEffect } from 'react';
const DashboardButton = ({ userId }) => {
   useEffect(() => {
      // Print userId to verify it's being received
      console.log("User ID in DatasetUpload:", userId);
    }, [userId]);
    
  const handleDashboard = async () => {
    
      try {
          const response = await fetch("http://127.0.0.1:8000/aiventory/complete_signup/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),  // Send user_id directly here
            });

          const data = await response.json();

          if (response.ok) {
              alert(data.message);
               // Save user_id to localStorage for accessibility
           localStorage.setItem("userId", userId);
              // Redirect to dashboard
              // Redirect to dashboard
            window.location.href = "/dashboard";
          } else {
              alert(data.error);
          }
      } catch (error) {
          console.error("Error during dashboard action:", error);
          alert("Something went wrong. Please try again.");
      }
  };
  return (
<div className="stepContainer">
    <h2 className='dashHeading'>Welcome to AIventory!</h2>
    <p className='dashHeadingSub'>Your smart inventory management starts here.</p>

    <Link href="/dashboard" className="iconButton" onClick={handleDashboard}>
        Go to Dashboard
    </Link>
</div>

  );
};

export default DashboardButton;
