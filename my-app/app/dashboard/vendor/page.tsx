"use client";
// app/dashboard/page.tsx
import VendorOver from "@/components/VendorOver"
import VendorOver2 from "@/components/VendorOver2"
// import ShowCSVData from "@/components/ShowCSVData";

import ButtonFrame2 from "@/components/ButtonFrame2";
import "@/styles/vendor.css";
import ShowDataset2 from "@/components/ShowCSVData";
import axios from "axios";
import ButtonAction2 from "@/components/ButtonAction2";
import { useState,useEffect } from "react";
import VisualGroupInventory from "@/components/VisualGroupInventory";
import VendorManagementAnalysis from "@/components/VendorManagementAnalysis";
export default function Vendor() {
    const [action, setAction] = useState<string | null>(null);
    const [dataset, setDataset] = useState<string[][] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [vendors, setVendors] = useState<any[]>([]); // To store the product data

    const handleActionClick2 = (actionName: string) => {
      setAction(actionName);
    };
  
    const handleFileUpload2 = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const rows = content.split("\n").map((row) => row.split(","));
        setDataset(rows);
      };
      reader.readAsText(file);
    };
    const userId = localStorage.getItem("userId");

    useEffect(() => {
      const fetchDataset = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
          console.log("user id for data", userId);
          const response = await axios.get("http://127.0.0.1:8000/aiventory/get-vendor/", {
            params: { user_id: userId },
          });
    
          console.log("Fetched vendor Dataset:", response.data);
    
          // Ensure that the response structure is correct
          if (response.data && response.data.vendors) {
            // Use response.data.vendors instead of response.data.products
            setVendors(response.data.vendors.flat()); // Flatten the array if it's nested
          } else {
            setError("No vendor found.");
          }
          setError(null); // Reset any previous errors
        } catch (err) {
          console.error("Error fetching dataset:", err);
          setError(err.response?.data?.error || "Failed to fetch dataset.");
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };
    
      if (userId) fetchDataset();
    }, [userId]);
  
    return (
      <div className="VendorPage">
        {/* for vendors heading */}
      <VendorOver /> 
      <ButtonFrame2 onActionClick={handleActionClick2} />
      <div className="actionContainerVendor2">
        <ButtonAction2 action={action} onFileUpload={handleFileUpload2} />
      </div>
        {/* Dataset Section with a Specific Class */}

        {loading ? (
        <div className="loadingAnimation">
          <div className="gemini-shine"></div>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="dataset-feature">
          <ShowDataset2 dataset={vendors} />
        </div>
      )}
      
      <VendorOver2 />
      <div className="visual-feature2">

        <VendorManagementAnalysis />

      </div>
      </div>
    );
  }
  