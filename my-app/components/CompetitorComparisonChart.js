import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';  // Import necessary components from recharts

const CompetitorComparisonChart = ({ data }) => {
  console.log("Received data in CompetitorComparisonChart:", data); // Log the received prop

  const benchmarks = Array.isArray(data) ? data : [];
 
  console.log("comparison is on",benchmarks)

  const chartData = benchmarks.map((item) => ({
    productname: item.productname,
    sellingprice: item.sellingprice,
    profitmargin: item.profitmargin,
  }));
  console.log("chartData for BarChart:", chartData);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis
          dataKey="productname"
          fontSize={13}
          angle={0}
          textAnchor="end"
          tick={{ fill: "#333" }}
        />
        <YAxis fontSize={14} tick={{ fill: "#333" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="sellingprice" name="Selling Price" fill="#17412D" />
        <Bar dataKey="profitmargin" name="Profit Margin (%)" fill="#9FE870" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompetitorComparisonChart;