"use client";
import InventoryOver from "@/components/InventoryOver";
import InventoryOver2 from "@/components/InventoryOver2";

import "@/styles/inventory.css";
import ButtonFrame from "@/components/ButtonFrame";
import ButtonAction from "@/components/ButtonAction";
import ShowCSVData from "@/components/ShowCSVData";
import axios from "axios";

import { useState, useEffect } from "react";
import VisualGroupInventory from "@/components/VisualGroupInventory";

function Inventory() {
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // To store the product data
  

  const handleActionClick = (actionName: string) => setAction(actionName);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDataset = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        console.log("user id for data", userId);
        const response = await axios.get("http://127.0.0.1:8000/aiventory/get-current-dataset/", {
          params: { user_id: userId },
        });

        console.log("Fetched Dataset:", response.data);

        // Ensure that the response structure is correct
        if (response.data && response.data.products) {
          // Flatten the products array since it is wrapped inside another array
          setProducts(response.data.products.flat());
        } else {
          setError("No products found.");
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
    <div className="InventoryPage">
      <InventoryOver />
      <ButtonFrame onActionClick={handleActionClick} />

      <div className="actionContainer">
        <ButtonAction action={action} />
      </div>

      {/* Dataset Section with a Specific Class */}
    {/* Dataset Section */}
    {loading ? (
        <div className="loadingAnimation">
          <div className="gemini-shine"></div>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="dataset-feature">
          <ShowCSVData dataset={products} />
        </div>
      )}



      <InventoryOver2 />
      
      {loading ? (
        <div className="loadingAnimation">
          <div className="gemini-shine"></div>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="visual-feature">

        <VisualGroupInventory />
        
        </div>
      )}


    </div>
  );
}

export default Inventory;
