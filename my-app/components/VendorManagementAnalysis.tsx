import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "@/styles/visualGroupInventory.css"; // Import CSS styles

const VendorManagementAnalysis = () => {
  const [visualData, setVisualData] = useState<any>(null);
  const [reliabilityScores, setReliabilityScores] = useState<any[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetching the visual data from the backend
    axios
      .get(`http://127.0.0.1:8000/aiventory/get-vendor-visuals/?user_id=${userId}`, {
        signal,
      })
      .then((response) => {
        setVisualData(response.data);
        console.log("vendor analysis",response.data)
        // Extracting reliability scores and delivery times
    // Safely extract reliability scores and delivery times
    // Safely extract reliability scores and delivery times
    const reliability = (response.data.top_reliability_vendors || []).map((vendor) => ({
      vendor: vendor.vendor, // Vendor name
      reliability: vendor.reliability_score, // Reliability score
    }));
    setReliabilityScores(reliability);
    console.log("Reliability Data:", reliability);

    const delivery = (response.data.top_delivery_vendors || []).map((vendor) => ({
      vendor: vendor.vendor, // Vendor name
      time: vendor.delivery_time, // Delivery time
    }));
    setDeliveryTime(delivery);
    console.log("Delivery Data:", delivery);
      })
      .catch((error) => {
        console.error("Error fetching visual data:", error);
        setError("Failed to fetch data");
      });

    // Cleanup function to abort the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [userId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!visualData) {
    return <p>Loading visuals...</p>; // Simple loading message
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="vendor-management-container">
      {/* Best Vendors */}
   

      {/* Vendor Reliability Scores */}
      <div className="chart-container">
        <h3>Vendor Reliability Scores</h3>
        <BarChart width={1200} height={300} data={reliabilityScores}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vendor" 
           angle={-2}  // Rotate labels for readability
           textAnchor="end"
           tick={{ fontSize: 12 }}  // Adjust tick label font size
           />
          <YAxis />
          <Tooltip />
          <Bar dataKey="reliability" fill="#82ca9d" />
        </BarChart>
        <p>This bar chart ranks vendors by their reliability scores, helping identify the most dependable partners.</p>
      </div>

      {/* Delivery Times */}
      <div className="chart-container">
        <h3>Best Vendors by Delivery Time</h3>
        <LineChart width={1200} height={300} data={deliveryTime} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vendor"
           angle={-2}  // Rotate labels for readability
           textAnchor="end" 
           tick={{ fontSize: 12 }}  // Adjust tick label font size

           
           
           />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke="#8884d8" />
        </LineChart>
        <p>This line chart evaluates vendors based on their delivery times, showcasing efficiency in meeting supply demands.</p>
      </div>
    </div>
  );
};

export default VendorManagementAnalysis;

