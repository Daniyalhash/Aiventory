import React, { useState, useEffect } from "react";
import "@/styles/showCSVData.css";
import axios from "axios";

const ShowCSVData2 = ({ dataset }: { dataset: any[] }) => {
  return (
    <div>
      {dataset && dataset.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Delivery Time</th>
              <th>Reliability Score</th>
            </tr>
          </thead>
          <tbody>
            {dataset.map((vendor, index) => (
              <tr key={vendor._id || index}>
                <td>{vendor.vendor}</td>
                <td>{vendor.DeliveryTime}</td>
                <td>{vendor.ReliabilityScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vendor data available.</p>
      )}
    </div>
  );
};
export default ShowCSVData2;