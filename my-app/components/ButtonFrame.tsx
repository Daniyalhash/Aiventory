import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "@/components/Button";
import { faPlus, faTrash, faEdit, faMagnifyingGlass, 
  faArrowDownAZ, 
  faDownload, 
  faFileImport, faFilter,
  faRotate  } from "@fortawesome/free-solid-svg-icons";import '@/styles/buttonFrame.css';

  const ButtonFrame = ({ onActionClick }) => {
    const buttonData = [
      
      { id: 1, text: "Add a Product", icon: faPlus, onClick: () => onActionClick("addProduct") },
      { id: 2, text: "Filter by Category", icon: faFilter, onClick: () => onActionClick("filterCategory") },
      { id: 3, text: "Sort by A-Z", icon: faArrowDownAZ, onClick: () => onActionClick("sortAZ") },
      { id: 4, text: "Import CSV", icon: faFileImport, onClick: () => onActionClick("importCSV") },
      { id: 5, text: "Export CSV", icon: faDownload, onClick: () => onActionClick("exportCSV") },
      { id: 6, text: "Search a Product", icon: faMagnifyingGlass, onClick: () => onActionClick("searchProduct") },
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

export default ButtonFrame;
