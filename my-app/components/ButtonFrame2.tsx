import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "@/components/Button";
import { faPlus, faTrash, faEdit, faMagnifyingGlass, 
  faArrowDownAZ, 
  faDownload, 
  faFileImport, faFilter,
  faRotate  } from "@fortawesome/free-solid-svg-icons";import '@/styles/buttonFrame.css';

  const ButtonFrame2 = ({ onActionClick }) => {
    const buttonData = [
      
      { id: 1, text: "Add a Vendor", icon: faPlus, onClick: () => onActionClick("addVendor") },
      { id: 2, text: "Filter by Reliability Score", icon: faFilter, onClick: () => onActionClick("filterReliability") },
      { id: 3, text: "Sort by A-Z", icon: faArrowDownAZ, onClick: () => onActionClick("sortAZ2") },
      { id: 4, text: "Import CSV", icon: faFileImport, onClick: () => onActionClick("importCSV2") },
      { id: 5, text: "Export CSV", icon: faDownload, onClick: () => onActionClick("exportCSV2") },
      { id: 6, text: "Search a Vendor", icon: faMagnifyingGlass, onClick: () => onActionClick("searchVendor") },
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
      </div>
    );
  };

export default ButtonFrame2;
