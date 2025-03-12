import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import "@/styles/visualGroupInventory2.css"; // Import CSS styles

const VisualGroupInventory2 = () => {
  const [visualData, setVisualData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetching the visual data from the backend
    axios
      .get(`http://127.0.0.1:8000/aiventory/get-insights-visuals/?user_id=${userId}`)
      .then((response) => {
        console.log("insights",response.data)
        setVisualData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching visual data:", error);
      });
  }, [userId]);

  if (!visualData) {
    return <p>Loading visuals...</p>;
  }

  return (
    <div className="visual-group-container">
      {/* Product Benchmarking Chart */}
 

      {/* Low Stock Products Table */}
      <div className="table-container">
        <h3>Low Stock Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {visualData.low_stock_data.map((product, index) => (
              <tr key={index}>
                <td>{product.productname}</td>
                <td>{product.category}</td>
                <td>{product.vendor}</td>
                <td>{product.stockquantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
  <h3>Product Benchmarking (Electronics)</h3>
  <BarChart width={600} height={350} data={visualData.benchmarking_data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="productname" label={{ value: "Product Name", position: "insideBottom", offset: -5 }} />
    <YAxis yAxisId="left" label={{ value: "Selling Price ($)", angle: -90, position: "insideLeft" }} />
    <YAxis yAxisId="right" orientation="right" label={{ value: "Profit Margin ($)", angle: -90, position: "insideRight" }} />
    <Tooltip />
    <Legend verticalAlign="top" align="right" height={36} />
    <Bar yAxisId="left" dataKey="sellingprice" fill="#8884d8" name="Selling Price" barSize={30} />
    <Bar yAxisId="right" dataKey="profit_margin" fill="#82ca9d" name="Profit Margin" barSize={30} />
  </BarChart>
</div>
      {/* Best Vendor Suggestions Chart */}
      <div className="chart-container">
        <h3>Top Vendors</h3>
        <BarChart width={500} height={300} data={visualData.vendor_suggestions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vendor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg_reliability" fill="#8884d8" />
          <Bar dataKey="avg_delivery_time" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default VisualGroupInventory2;