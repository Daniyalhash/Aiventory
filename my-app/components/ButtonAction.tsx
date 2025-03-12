import React from "react";
import "@/styles/buttonAction.css"; // Import your CSS styles

const ButtonAction = ({ action, onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file); // Trigger the shared upload logic
      console.log("Uploaded file:", file.name);
    }
  };

  const handleFileExport = () => {
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
    case "addProduct":
      return (
        <div className="action-container add-product">
          <p className="addP">Add product details below:</p>
          <input type="text" placeholder="Product Name" className="input-field" />
          <input type="number" placeholder="Product Price" className="input-field" />
          <input type="text" placeholder="Product Category" className="input-field" />
          <button className="action-button" onClick={() => console.log("Product added")}>Submit</button>
        </div>
      );
      case "importCSV":
        return (
          <div className="action-container import-csv">
            <p className="importP">Upload a CSV file:</p>
            <input
              type="file"
              accept=".csv"
              className="file-upload"
              onChange={handleFileChange}
            />
          </div>
        );
    case "exportCSV":
      return (
        <div className="action-container export-csv">
          <p className="exportP">Click below to export data/Download data:</p>
          <button className="action-button" onClick={handleFileExport}>Export CSV</button>
        </div>
      );
    case "sortAZ":
      return <p className="action-container sortP">Sorting products by A-Z...</p>;
    case "filterCategory":
      return <p className="action-container filterP">Filtering products by category...</p>;
    case "searchProduct":
      return (
        <div className="action-container search-product">
          <p>Search for a product:</p>
          <input type="text" placeholder="Enter product name" className="input-field search-bar" />
          <button className="action-button" onClick={() => console.log("Search performed")}>Search</button>
        </div>
      );
    default:
      return <p className="action-container pre">Please select an action to perform.</p>;
  }
};

export default ButtonAction;
