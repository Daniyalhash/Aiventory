"use client";

import "@/styles/EditProfileOver.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronLeft,
  faEdit,
  faCamera,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

export default function EditProfileOver() {
  const handleFileUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <section className="EPsection">
      {/* Back to Settings Link */}
      <Link href={"/dashboard/setting"} className="Backsettings">
        <FontAwesomeIcon icon={faChevronLeft} className="EPicon" />
        <span>Settings</span>
      </Link>

      {/* Header */}
      <h2 className="EPsecHead">Edit your profile</h2>
  

      {/* Profile Picture Section */}
      <div className="profilePicture">
        <img
          src="/images/men.jpg" // Replace with dynamic image URL
          alt="Profile"
          className="profileImg"
        />
        <button className="updateIcon" onClick={handleFileUpload}>
          <FontAwesomeIcon icon={faCamera} className="FastupdateIcon" />
        </button>
        <input type="file" id="fileInput" style={{ display: "none" }} />
      </div>

      {/* User Credentials */}
      <div className="credentials">
        <div className="credentialField">
          <label>Name</label>
          <div className="fieldContent">
            <span>John Doe</span>
            <button className="editIcon">
              <FontAwesomeIcon icon={faEdit}  className="FastupdateIcon2"/>
            </button>
          </div>
        </div>
        <div className="credentialField">
          <label>Shop Name</label>
          <div className="fieldContent">
            <span>Doe's Mart</span>
            <button className="editIcon">
              <FontAwesomeIcon icon={faEdit} className="FastupdateIcon2"/>
            </button>
          </div>
        </div>
        <div className="credentialField">
          <label>Phone Number</label>
          <div className="fieldContent">
            <span>+123 456 789</span>
            <button className="editIcon">
              <FontAwesomeIcon icon={faEdit} className="FastupdateIcon2"/>
            </button>
          </div>
        </div>
        <div className="divSave">
        <button className="saveButton">
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        </div>
     
      </div>
    </section>
  );
}
