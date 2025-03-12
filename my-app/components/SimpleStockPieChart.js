import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

// Static Data for Pie Chart
const chartData = [
  { name: "Out of Stock", value: 10, color: "#FF5C8D" },  // Pink
  { name: "Low Stock", value: 25, color: "#FFB84D" },    // Light Orange
  { name: "Healthy Stock", value: 65, color: "#4CAF50" }, // Green
];

const SimpleStockPieChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center w-full"
    >
      <ResponsiveContainer width={650} height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="60%"
            cy="80%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={200}
            dataKey="value"
            startAngle={180} // Rotate the pie chart for better visual appeal
            endAngle={0}
          >
            {chartData.map((entry, index) => (
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
