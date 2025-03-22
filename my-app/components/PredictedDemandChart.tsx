import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Area
} from 'recharts';  // Import necessary components from recharts

const PredictedDemandChart = ({ selectedRange }) => {
  // Static data for the next month (30 days)
  const data = [
    { day: '1', predictedDemand: 30, lowerBound: 25, upperBound: 35 },
    { day: '2', predictedDemand: 28, lowerBound: 23, upperBound: 33 },
    { day: '3', predictedDemand: 35, lowerBound: 30, upperBound: 40 },
    { day: '4', predictedDemand: 40, lowerBound: 35, upperBound: 45 },
    { day: '5', predictedDemand: 32, lowerBound: 27, upperBound: 37 },
    { day: '6', predictedDemand: 38, lowerBound: 33, upperBound: 43 },
    { day: '7', predictedDemand: 45, lowerBound: 40, upperBound: 50 },
    { day: '8', predictedDemand: 50, lowerBound: 45, upperBound: 55 },
    { day: '9', predictedDemand: 48, lowerBound: 43, upperBound: 53 },
    { day: '10', predictedDemand: 52, lowerBound: 47, upperBound: 57 },
    { day: '11', predictedDemand: 55, lowerBound: 50, upperBound: 60 },
    { day: '12', predictedDemand: 60, lowerBound: 55, upperBound: 65 },
    { day: '13', predictedDemand: 58, lowerBound: 53, upperBound: 63 },
    { day: '14', predictedDemand: 62, lowerBound: 57, upperBound: 67 },
    { day: '15', predictedDemand: 65, lowerBound: 60, upperBound: 70 },
    { day: '16', predictedDemand: 70, lowerBound: 65, upperBound: 75 },
    { day: '17', predictedDemand: 68, lowerBound: 63, upperBound: 73 },
    { day: '18', predictedDemand: 72, lowerBound: 67, upperBound: 77 },
    { day: '19', predictedDemand: 75, lowerBound: 70, upperBound: 80 },
    { day: '20', predictedDemand: 78, lowerBound: 73, upperBound: 83 },
    { day: '21', predictedDemand: 80, lowerBound: 75, upperBound: 85 },
    { day: '22', predictedDemand: 82, lowerBound: 77, upperBound: 87 },
    { day: '23', predictedDemand: 85, lowerBound: 80, upperBound: 90 },
    { day: '24', predictedDemand: 88, lowerBound: 83, upperBound: 93 },
    { day: '25', predictedDemand: 90, lowerBound: 85, upperBound: 95 },
    { day: '26', predictedDemand: 92, lowerBound: 87, upperBound: 97 },
    { day: '27', predictedDemand: 95, lowerBound: 90, upperBound: 100 },
    { day: '28', predictedDemand: 98, lowerBound: 93, upperBound: 103 },
    { day: '29', predictedDemand: 100, lowerBound: 95, upperBound: 105 },
    { day: '30', predictedDemand: 105, lowerBound: 100, upperBound: 110 },
  ];
  // 🔥 Fix the filtering logic
  const filteredData = data.slice(0, data.findIndex(entry => entry.day === selectedRange.replace("Day ", "")) + 1);

  return (
    <ResponsiveContainer width="100%" height={230}>
      <LineChart
        data={filteredData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,          }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis dataKey="day" fontSize={12} />
        <YAxis 
  label={{ 
    value: 'Predicted Demand', 
    angle: -90, 
    position: 'insideLeft', 
    dx: 0, // Horizontal adjustment (0 means no change)
    dy: 50 // Vertical adjustment (increase this value to move it down)
  }} 
  ticks={[30, 60, 90, 120]} 
  fontSize={12} 
/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="predictedDemand" name="Next Month Days" stroke="#17412D" />
        <Area type="monotone" dataKey="upperBound" fill="#9FE870" stroke={false} fillOpacity={0.3} />
        <Area type="monotone" dataKey="lowerBound" fill="#9FE870" stroke={false} fillOpacity={0.3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PredictedDemandChart;