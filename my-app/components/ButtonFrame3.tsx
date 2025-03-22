import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "@/components/Button";
import {
  faPlus,
  faFilter,
  faSearch,
  faChartLine,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import '@/styles/buttonFrame.css';

const ButtonFrame3 = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Select Time Period");

  // Define the toggleDropdown function before using it
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setDropdownOpen(false);
  };

  const buttonData = [
    { id: 1, text: "Select Category", icon: faPlus, onClick: () => onActionClick("addProduct") },
    { id: 2, text: "Select Product", icon: faFilter, onClick: () => onActionClick("filterCategory") },
    { id: 3, text: "Search Product", icon: faSearch, onClick: () => onActionClick("searchProduct") },
    { id: 4, text: "Select Time Period", icon: faCalendarAlt, onClick: toggleDropdown }, // Calendar button
    { id: 5, text: "Predict Demand", icon: faChartLine, onClick: () => onActionClick("predictSales") },
  ];

  return (
    <div className="buttonContainer">
      {buttonData.map((button) => (
        <Button
          key={button.id}
          text={button.text}
          icon={button.icon}
          onClick={button.onClick}
        />
      ))}
      {/* Dropdown for Time Period Selection */}
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <div onClick={() => handlePeriodSelect("Last Month")}>Last Month</div>
          <div onClick={() => handlePeriodSelect("Last 3 Months")}>Last 3 Months</div>
          <div onClick={() => handlePeriodSelect("Last Year")}>Last Year</div>
          <div onClick={() => handlePeriodSelect("Custom Range")}>Custom Range</div>
        </div>
      )}
    </div>
  );
};

export default ButtonFrame3;