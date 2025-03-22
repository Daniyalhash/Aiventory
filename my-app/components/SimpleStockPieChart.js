import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import '@/styles/simplePie.css'
import useSWR from 'swr';
import { fetchStockData } from '@/utils/api';
const SimpleStockPieChart = () => {

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  console.log("User ID from localStorage:", userId);
 // Fetch stock data using SWR
 const { data: benchmarks, error } = useSWR(
  userId ? ['get-stock-levels', userId] : null, 
  () => fetchStockData(userId), 
  {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  }
);
console.log("Fetched Stock Data:", benchmarks);

const benchmarkData = benchmarks
  ? benchmarks.map((item, index) => ({
      name: item.name, // Using the name from API
      value: item.value, // Using the value from API
      color: index === 0 ? "#FF5C8D" : index === 1 ? "#FFB84D" : "#4CAF50",
    }))
  : [
      { name: "Out of Stock", value: 0, color: "#FF5C8D" },
      { name: "Low Stock", value: 0, color: "#FFB84D" },
      { name: "Healthy Stock", value: 0, color: "#4CAF50" },
    ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center w-full"
    >
        {/* Display stock levels in numbers */}
        <div className="stockLevelDisplay">
        {benchmarkData.map((item, index) => (
          <div key={index} className="stcokLevelCount">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}: <span className="text-gray-700">{item.value}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width={650} height={300}>
      <PieChart margin={{ top: 20, bottom: -50 }}>  {/* Added margin */}
      <Pie
            data={benchmarkData}
            cx="60%"
            cy="65%"  // Adjusted to move the pie chart upward
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={200}
            dataKey="value"
            startAngle={180} // Rotate the pie chart for better visual appeal
            endAngle={0}
          >
            {benchmarkData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`} // Apply gradient color
              />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#9FE870", color: "#fff", borderRadius: "5px" }} />
          
          {/* Define Gradients */}
          <defs>
            <linearGradient id="gradient-0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="5%" stopColor="#17412D" />
              <stop offset="95%" stopColor="#17412D" />
            </linearGradient>
            <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="5%" stopColor="#FFB84D" />
              <stop offset="95%" stopColor="#FFA500" />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="5%" stopColor="#9FE870" />
              <stop offset="95%" stopColor="#388E3C" />
            </linearGradient>
          </defs>
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SimpleStockPieChart;
