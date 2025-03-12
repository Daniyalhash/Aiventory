import { useState, useRef, useEffect } from "react";
import axios from "axios";
import '@/styles/profileButton.css';
import Link from 'next/link';
import { faBell, faAngleDown, faRightFromBracket, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: "", phone: "" }); // State for user details
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  // Fetch user data when the component mounts or when userId changes
  const fetchUserData = async () => {
    
    try {
      if (userId) {
        console.log(`Fetching data for userId: ${userId}`);
        const response = await axios.get("http://127.0.0.1:8000/aiventory/get-user-details/", {
          params: { user_id: userId },
        });
        setUserDetails(response.data); // Update state with user details
      }
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data?.error || error.message);
    }
  };
  
  useEffect(() => {
    fetchUserData(); // Fetch user data when the component is mounted
  }, [userId]);

  // Toggle dropdown and arrow icon
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsArrowUp(!isArrowUp);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="profileContainer">
      <div className="bellIconContainer">
        <Link href="/dashboard/setting/notifications">
          <div className="bellIcon">
            <FontAwesomeIcon icon={faBell} className="Iconbell" />
          </div>
        </Link>
      </div>
      <div className="profile" ref={profileButtonRef} onClick={toggleDropdown}>
        <img src="/images/men.jpg" alt="Profile" className="profilePic" />
        {/* Display username and phone directly here in the bar */}
        <div className="profileInfo">
          <p className="username">{userDetails.username || "Anonymous"}</p>
        </div>
        <button className="profileIcon">
          <FontAwesomeIcon icon={isArrowUp ? faAngleUp : faAngleDown} className="Iconarrow" />
        </button>
      </div>
      {isOpen && (
        <div className="dropdown" ref={dropdownRef}>
          <div className="dropdownContent">
            <img src="/images/men.jpg" alt="Profile" className="dropdownPic" />
            <p className="dropdownName">{userDetails.username || "Anonymous"}</p>
            <p className="dropdownPhone">{userDetails.phone || "N/A"}</p>
            <button className="logoutButton" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} className="IconLogout" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
