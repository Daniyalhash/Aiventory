
// export default VisualGroupInventory;
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { BarChart, Bar } from 'recharts';

import axios from "axios";
import "@/styles/visualGroupInventory.css"; // Import CSS styles

const VisualGroupInventory = () => {
  const [visualData, setVisualData] = useState(null);
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState<string | null>(null);
// Separate range states for each chart
const [rangeProfitMargin, setRangeProfitMargin] = useState("1-5"); // Default range for profit margin
const [rangeCost, setRangeCost] = useState("1-5"); // Default range for cost
const [rangePriceComparison, setRangePriceComparison] = useState("1-5"); // Default range for price comparison

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Fetching the visual data from the backend
    axios
      .get(`http://127.0.0.1:8000/aiventory/get-inventory-visuals/?user_id=${userId}`)
      .then((response) => {
        setVisualData(response.data);
        console.log("category_profit_margin", response.data.category_profit_margin)
        console.log("category_cost", response.data.category_cost)
        console.log("product_price_comparison", response.data.product_price_comparison)
      })
      .catch((error) => {
        console.error("Error fetching visual data:", error);
        setError("Error fetching data");
      });

    return () => {
      controller.abort(); // Cleanup function
    };
  }, [userId]);


  // Function to generate range options based on data length
  const generateRangeOptions = (dataLength) => {
    const options = [];
    if (dataLength === 0) return options;
    for (let i = 5; i <= dataLength; i += 5) {
      options.push(`1-${Math.min(i, dataLength)}`);
    }
    if (!options.includes(`1-${dataLength}`) && dataLength > 0) {
      options.push(`1-${dataLength}`);
    }
    return options;
  };

  // Function to filter the data based on selected range
  const filterDataByRange = (data, selectedRange) => {
    const [min, max] = selectedRange.split('-').map(Number);
    return data.slice(min - 1, max);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!visualData) {
    return <p>Loading visuals...</p>; // Simple loading message
  }
 // Generate range options for each chart
  // Generate range options for each chart
  const categoryProfitMarginRangeOptions = generateRangeOptions(visualData.category_profit_margin.length);
  const filteredCategoryProfitMargin = filterDataByRange(visualData.category_profit_margin, rangeProfitMargin);

  const categoryCostRangeOptions = generateRangeOptions(visualData.category_cost.length);
  const filteredCategoryCost = filterDataByRange(visualData.category_cost, rangeCost);

  const productPriceComparisonRangeOptions = generateRangeOptions(visualData.product_price_comparison.length);
  const filteredProductPriceComparison = filterDataByRange(visualData.product_price_comparison, rangePriceComparison);

  return (

    <div className="visual-group-container">
      {/* Category-wise Profit Margin Chart */}

      <div className="chart-container">
        <div className="chartSub">
          <h3>Category-wise Profit Margin</h3>
          {/* Range Dropdown for Profit Margin */}
          <div className="bigheader-actions">
          <select className="bigrange-dropdown" onChange={(e) => setRangeProfitMargin(e.target.value)} value={rangeProfitMargin}>
          {categoryProfitMarginRangeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>



        <LineChart width={1200} height={250} data={filteredCategoryProfitMargin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            angle={-4}  // Rotate labels for readability
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg_profit_margin" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Category-wise Cost Chart */}
      <div className="chart-container">
        

        <div className="chartSub">
          <h3>Category-wise Cost</h3>
          {/* Range Dropdown for Profit Margin */}
          <div className="bigheader-actions">
          <select className="bigrange-dropdown" onChange={(e) => setRangeCost(e.target.value)} value={rangeCost}>
          {categoryCostRangeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
            </select>
          </div>
        </div>




      
        <BarChart width={1200} height={250} data={filteredCategoryCost}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            angle={-4}  // Rotate labels for readability
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_cost" fill="#70D560" />
        </BarChart>
      </div>



      {/* Comparison of Selling and Cost Price Chart */}
      <div className="chart-container">

        <div className="chartSub">
        <h3>Comparison of Selling and Cost Price</h3>
          {/* Range Dropdown for Profit Margin */}
          <div className="bigheader-actions">
          <select className="bigrange-dropdown" onChange={(e) => setRangePriceComparison(e.target.value)} value={rangePriceComparison}>
          {productPriceComparisonRangeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
            </select>
          </div>
        </div>



        
        <BarChart width={1200} height={250} data={filteredProductPriceComparison}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
      dataKey="productname"
      angle={-30}  // Adjusted angle for better readability
      textAnchor="end"
      tick={{ fontSize: 12 }}  // Adjust tick font size
      margin={{ bottom: 50 }}  // Increased margin for the bottom to prevent clipping of labels
      tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + "..." : value}  // Optional: Truncate long names
    />     
              <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sellingprice" fill="#70D560" />
          <Bar dataKey="costprice" fill="#17412D" />
        </BarChart>
      </div>

    </div>
  );
};

export default VisualGroupInventory;