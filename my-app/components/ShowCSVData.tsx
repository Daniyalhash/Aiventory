import React, { useState, useEffect } from "react";
import "@/styles/showCSVData.css";
import axios from "axios";

const ShowCSVData = ({ dataset }: { dataset: any[] }) => {
  const [loading, setLoading] = useState<boolean>(false); // Control loading state
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!dataset || dataset.length === 0) {
      setLoading(true); // If no dataset provided initially, show loading
    } else {
      setLoading(false);
    }
  }, [dataset]);

  // if (loading) {
  //   return <div className="loadingAnimation"><div className="gemini-shine"></div></div>;
  // }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!dataset || dataset.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="csv-table-container">
      <table className="csv-table">
        <thead>
          <tr>
            {Object.keys(dataset[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataset.map((product, idx) => (
            <tr key={idx}>
              {Object.values(product).map((value, idy) => (
                <td key={idy}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCSVData;