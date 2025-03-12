import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

export default function ProfitMarginChart({ data, targetProduct }) {
  // Process the data to assign colors based on whether it's the target product
  const processedData = data.map((item) => ({
    ...item,
    color: item.name === targetProduct ? "red" : "black", // Highlight target product
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={processedData}
        margin={{
          top: 20,
          right: 30,
          bottom: 50,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip 
          formatter={(value, name, props) => [`${value.toFixed(2)}%`, "Profit Margin"]}
          labelFormatter={(label) => `Product: ${processedData[label - 1]?.name || ""}`}
        />
        <Legend />
        <XAxis
          dataKey="name" // Use product names for the X-axis
          tick={{ fontSize: 12 }}
          interval={0} // Show all labels
          angle={-45} // Rotate labels for better visibility
          textAnchor="end"
        />
        <YAxis
          unit="%"
          tick={{ fontSize: 12 }}
          label={{
            value: "Profit Margin (%)",
            angle: -90,
            position: "insideLeft",
            fontSize: 14,
          }}
        />
        <Scatter
          name="Profit Margin"
          data={processedData}
          dataKey="value"
          shape="circle"
        >
          {processedData.map((entry, index) => (
            <circle
              key={`circle-${index}`}
              cx={index * 40 + 40} // Adjust positions dynamically
              cy={400 - entry.value * 10} // Scale values for rendering
              r={entry.name === targetProduct ? 6 : 4} // Larger size for target product
              fill={entry.color}
            />
          ))}
        </Scatter>
        <Line
          type="monotone"
          dataKey="value"
          stroke="blue"
          dot={{ r: 2 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
