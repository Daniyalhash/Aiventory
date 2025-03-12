import React from "react";
import "@/styles/buttonAction.css"; // Import your CSS styles

const ButtonAction2 = ({ action, onFileUpload }) => {
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file); // Trigger the shared upload logic
      console.log("Uploaded file:", file.name);
    }
  };

  const handleFileExport2 = () => {
    const data = new Blob(["Sample CSV data"], { type: "text/csv" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_data.csv";
    link.click();
    window.URL.revokeObjectURL(url);
    console.log("File exported");
  };
  switch (action) {
    case "addVendor":
      return (
        <div className="action-container add-product">
          <p className="addP">Add Vendor details below:</p>
          <input type="text" placeholder="Vendor Name" className="input-field" />
          <input type="number" placeholder="Vendor Price" className="input-field" />
          <input type="text" placeholder="Vendor Category" className="input-field" />
          <button className="action-button" onClick={() => console.log("Vendor added")}>Submit</button>
        </div>
      );
      case "importCSV2":
        return (
          <div className="action-container import-csv">
            <p className="importP">Upload a CSV file:</p>
            <input
              type="file"
              accept=".csv"
              className="file-upload"
              onChange={handleFileChange2}
            />
          </div>
        );
    case "exportCSV2":
      return (
        <div className="action-container export-csv">
          <p className="exportP">Click below to export data/Download data:</p>
          <button className="action-button" onClick={handleFileExport2}>Export CSV</button>
        </div>
      );
    case "sortAZ2":
      return <p className="action-container sortP">Sorting products by A-Z...</p>;
    case "filterReliability":
      return <p className="action-container filterP">Filtering vendor by Reliability Score...</p>;
    case "searchVendor":
      return (
        <div className="action-container search-product">
          <p>Search for a Vendor:</p>
          <input type="text" placeholder="Enter Vendors name" className="input-field search-bar" />
          <button className="action-button" onClick={() => console.log("Search performed")}>Search</button>
        </div>
      );
    default:
      return <p className="action-container pre2">Please select an action to perform.</p>;
  }
};

export default ButtonAction2;
