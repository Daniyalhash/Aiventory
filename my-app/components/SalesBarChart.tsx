import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SalesBarChart = ({ selectedRange }) => {
   // Sample data for last month's sales and predicted sales
const data = [
  { day: '1', lastMonthSales: 2000, predictedSales: 3400 },
  { day: '2', lastMonthSales: 2500, predictedSales: 3600 },
  { day: '3', lastMonthSales: 3000, predictedSales: 3800 },
  { day: '4', lastMonthSales: 2200, predictedSales: 4000 },
  { day: '5', lastMonthSales: 2700, predictedSales: 4200 },
  { day: '6', lastMonthSales: 2900, predictedSales: 4400 },
  { day: '7', lastMonthSales: 3100, predictedSales: 4600 },
  { day: '8', lastMonthSales: 3300, predictedSales: 4800 },
  { day: '9', lastMonthSales: 3500, predictedSales: 5000 },
  { day: '10', lastMonthSales: 3700, predictedSales: 5200 },
  { day: '11', lastMonthSales: 3900, predictedSales: 5400 },
  { day: '12', lastMonthSales: 4100, predictedSales: 5600 },
  { day: '13', lastMonthSales: 4300, predictedSales: 5800 },
  { day: '14', lastMonthSales: 4500, predictedSales: 6000 },
  { day: '15', lastMonthSales: 4700, predictedSales: 6200 },
  { day: '16', lastMonthSales: 4900, predictedSales: 6400 },
  { day: '17', lastMonthSales: 5100, predictedSales: 6600 },
  { day: '18', lastMonthSales: 5300, predictedSales: 6800 },
  { day: '19', lastMonthSales: 5500, predictedSales: 7000 },
  { day: '20', lastMonthSales: 5700, predictedSales: 7200 },
  { day: '21', lastMonthSales: 5900, predictedSales: 7400 },
  { day: '22', lastMonthSales: 6100, predictedSales: 7600 },
  { day: '23', lastMonthSales: 6300, predictedSales: 7800 },
  { day: '24', lastMonthSales: 6500, predictedSales: 8000 },
  { day: '25', lastMonthSales: 6700, predictedSales: 8200 },
  { day: '26', lastMonthSales: 6900, predictedSales: 8400 },
  { day: '27', lastMonthSales: 7100, predictedSales: 8600 },
  { day: '28', lastMonthSales: 7300, predictedSales: 8800 },
  { day: '29', lastMonthSales: 7500, predictedSales: 9000 },
  { day: '30', lastMonthSales: 7700, predictedSales: 9200 },
];
const filteredData = data.slice(0, data.findIndex(entry => `Day ${entry.day}` === selectedRange) + 1 || data.length);

    return (
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: 'Days of the Month', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Sales (Rs)', angle: -90, position: 'insideLeft', dx: -10 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="lastMonthSales" fill="#ff4d4d" name="Last Month's Sales" />
 <Bar dataKey="predictedSales" fill="#4dff4d" name="Predicted Sales" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  export default SalesBarChart;