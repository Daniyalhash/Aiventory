import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

// Sample data representing predicted demand
const data = [
  { name: "Week 1", ProductA: 100, ProductB: 120, ProductC: 80, ProductD: 100 },
  { name: "Week 2", ProductA: 150, ProductB: 170, ProductC: 90, ProductD: 110 },
  { name: "Week 3", ProductA: 180, ProductB: 200, ProductC: 110, ProductD: 120 },
  { name: "Week 4", ProductA: 200, ProductB: 220, ProductC: 140, ProductD: 160 },
  { name: "Week 5", ProductA: 220, ProductB: 250, ProductC: 180, ProductD: 200 },
  { name: "Week 6", ProductA: 250, ProductB: 230, ProductC: 210, ProductD: 240 },
  { name: "Week 7", ProductA: 300, ProductB: 280, ProductC: 260, ProductD: 290 },
  { name: "Week 8", ProductA: 350, ProductB: 320, ProductC: 310, ProductD: 330 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface DemandChartProps {
  selectedRange: string;
}

const DemandChart: React.FC<DemandChartProps> = ({ selectedRange }) => {
  // Ensure the graph includes all previous weeks leading up to the selected range
  const filteredData = data.slice(0, data.findIndex(entry => entry.name === selectedRange) + 1);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={filteredData}>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="name" stroke="#17412D" />
        <YAxis stroke="#17412D" />
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="ProductA" stroke={COLORS[0]} fill="url(#color0)" />
        <Area type="monotone" dataKey="ProductB" stroke={COLORS[1]} fill="url(#color1)" />
        <Area type="monotone" dataKey="ProductC" stroke={COLORS[2]} fill="url(#color2)" />
        <Area type="monotone" dataKey="ProductD" stroke={COLORS[3]} fill="url(#color3)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DemandChart;
