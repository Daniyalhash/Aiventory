import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


const ComparisonChart = ({ data }) => {
  if (!data || data.length === 0) {
      return (
          <div className="chart-container">
              <p>No data available to display.</p>
          </div>
      );
  }
const truncateName = (name, length = 10) =>
name.length > length ? `${name.substring(0, length)}...` : name;

  return (
      <div
          className="chart-container"
          style={{
              backgroundColor: "transparent",
              border: "none",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              paddingRight: "0px",
          }}
      >
          <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data} margin={{ top: 0, right: 20, left: 20, bottom: 5 }}>
                  <XAxis 
                  dataKey="name" tick={{ fontSize: "15px", fill: "black" }} 
                     angle={-6} // Rotate the labels
                     textAnchor="end" // Align the labels properly
                     interval={0} />
                  <YAxis
                      tick={{ fontSize: "15px", fill: "black" }}
                      label={{
                          value: "Selling Price",
                          angle: -90,
                          position: "insideLeft",
                          offset: -10,
                          fontSize: 15,
                          fontWeight: 500,
                          fill: "black",
                      }}
                  />
                  <Tooltip
                      contentStyle={{
                          backgroundColor: "#f5f5f5",
                          fontSize: "14px",
                      }}
                      labelStyle={{
                          fontSize: "14px",
                          color: "#555",
                      }}
                  />
                  <Bar dataKey="value"   fill="black" radius={25} />
              </BarChart>
          </ResponsiveContainer>
      </div>
  );
};
export default ComparisonChart;

// // ComparisonChart component
// const ComparisonChart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <div className="chart-container">
//         <p>No data available to display.</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="chart-container"
//       style={{
//         backgroundColor: "transparent",
//         border: "none",
//         display: "flex", // Flexbox for aligning to the left
//         justifyContent: "flex-start", // Align to the left
//         alignItems: "flex-start", // Align to the top
//         width: "100%", // Ensure full width
//         paddingRight: "0px", // Optional: Adds some space from the left edge
//       }}
//     >
//       <ResponsiveContainer width="100%" height={220}>
//         <BarChart data={data} margin={{ top: 0, right: 20, left: 20, bottom: 5 }}>
//         <XAxis
//         dataKey="name"
//         tick={{ fontSize: "15px", fill: "black" }} // Customize X-axis labels
   
//      />
//       <YAxis
//         tick={{ fontSize: "15px", fill: "black" }} // Customize Y-axis labels
//         label={{
//           value: "Selling Price",
//           angle: -90,
//           position: "insideLeft",
//           offset: -10,
//           fontSize: 15,
//           fontWeight: 900,
//           fill: "black",
//         }}
//       />
//         <Tooltip
//         contentStyle={{
//           backgroundColor: "#f5f5f5", // Background color of tooltip
//           fontSize: "14px", // Font size of tooltip content
//         }}
//         labelStyle={{
//           fontSize: "14px", // Font size of tooltip label
//           color: "#555", // Label color
//         }}
//       />
//           <Bar dataKey="value" fill="black" radius={25} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ComparisonChart;