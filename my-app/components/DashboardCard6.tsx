import React, { useState } from 'react';
import '../src/styles/dashboardCard6.css';

const DashboardCard6 = ({ title, value, description, bgColor, graphContent, onRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('Week 5'); // Default range

  // Available options based on data length
  const generateRangeOptions = () => {
    return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  };

  const handleRangeChange = (event) => {
    const newRange = event.target.value;
    setSelectedRange(newRange);
    onRangeChange(newRange); // Send the selected range to parent
  };

  return (
    <div className={`card6 ${bgColor}`}>
      <div className="cardContent2">
        <div className="cardInside">
          <h3 className="cardTitle2">{title}</h3> 

          {/* Dropdown Button for Filtering */}
          <select className="rangeDropdown" value={selectedRange} onChange={handleRangeChange}>
            {generateRangeOptions().map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div className="graphSection2">
          {/* <p>{description}</p> */}
          <div className="graphShow">
            {graphContent} {/* Render the chart here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard6;
