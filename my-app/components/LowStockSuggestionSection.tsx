import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import "@/styles/low.css";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";

type LowStockProduct = {
  productname: string;
  category: string;
  stockquantity: number;
  vendors: VendorDetails[]; // Array of vendors
};

type VendorDetails = {
  DeliveryTime: number;
  ReliabilityScore: number;
  vendor: string;
  vendorPhone : string;
};




const LowStockSuggestionSection: React.FC = () => {
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);  // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const productsPerPage = 3;  // Number of products per page
  const [selectedProduct, setSelectedProduct] = useState<LowStockProduct | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

  // const [vendorDetails, setVendorDetails] = useState<Vendor[]>([]);
  const router = useRouter();

  const [vendorDetails, setVendorDetails] = useState<VendorDetails[] | null>(null); // State for vendor details
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      const userId = localStorage.getItem("userId"); // Retrieve user_id from localStorage
      console.log("User ID being sent:", userId); // Debug log

      try {
        const response = await axios.get('http://127.0.0.1:8000/aiventory/get-categories-p/', {
          params: { user_id: userId },
        });
        console.log("Low stock response:", response.data); // Log the entire response for debugging

        if (response.status === 200 && Array.isArray(response.data.low_stock_products)) {
          const sanitizedData = response.data.low_stock_products.map(product => ({
            ...product,
            vendors: Array.isArray(product.vendors) ? product.vendors : [],
          }));
          setLowStockProducts(sanitizedData);
        } else {
          setError(response.data.error || "Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Something went wrong. Please try again.");
      }
    };

    // Use mock data for local testing
    // setLowStockProducts(mockLowStockProducts);

    // Call the fetch function for live data
    fetchLowStockProducts();
  }, []);


  const fetchVendorDetails = async (product: LowStockProduct) => {
   
    const userId = localStorage.getItem("userId"); // Retrieve user_id from localStorage
    console.log("Fetching vendor details for:", product.productname);
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/aiventory/get-vendor-details/', {
        params: { user_id: userId, category: product.category, vendor_id: product.vendor_id, productname: product.productname }, // Assuming `id` is the product's unique identifier
      });

      if (response.status === 200 && response.data.vendors && Array.isArray(response.data.vendors)) {
        setVendorDetails(response.data.vendors); // Extract the vendors array correctly
      } else {
        console.error("Invalid vendor data format:", response.data);
        setError("Invalid vendor data received.");
        setVendorDetails(null);
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVendors = (product: LowStockProduct, index: number) => {
    if (selectedProductIndex === index) {
      setSelectedProductIndex(null);
      setVendorDetails(null);
      setSelectedProduct(null); // Reset selected product when closing

    } else {
      setSelectedProductIndex(index);
      fetchVendorDetails(product);
      setSelectedProduct(product); // ✅ Set selected product here

    }
  };
  const handleConfirmOrder = (vendor: VendorDetails) => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }

    const invoiceURL = `/dashboard/setting/invoice?productname=${encodeURIComponent(selectedProduct.productname)}
    &category=${encodeURIComponent(selectedProduct.category)}
    &stockquantity=${selectedProduct.stockquantity}
    &vendor=${encodeURIComponent(vendor.vendor)}
    &vendorPhone=${encodeURIComponent(vendor.vendorPhone)}
    &deliveryTime=${vendor.DeliveryTime}
    &reliabilityScore=${vendor.ReliabilityScore}`;
  
    console.log("Redirecting to:", invoiceURL); // ✅ Check in console
  
    router.push(invoiceURL);
  };
  // const handleConfirmOrder = (vendor: VendorDetails) => {
  //   // Check if a product is selected
  //   if (!selectedProduct) {
      
  //     console.log("Please select a product first!");
  //     return; // Prevent proceeding if no product is selected
  //   }
  
  //   // Print the selected product and vendor details to the console
  //   console.log("Selected Product:", selectedProduct);
  //   console.log("Vendor Name:", vendor.vendor);
  //   console.log("Vendor Phone:", vendor.vendorPhone);
  //   console.log("Delivery Time:", vendor.DeliveryTime);
  //   console.log("Reliability Score:", vendor.ReliabilityScore);
  // };
  // Filter products based on search term
  const filteredProducts = lowStockProducts.filter(product =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get the current products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Total pages calculation
  // const totalPages = Math.ceil(lowStockProducts.length / productsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };



  const renderVendors = () => {
    if (!vendorDetails || vendorDetails.length === 0) {
      return <p>No vendors available.</p>;
    }
  
    return (
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Delivery Time</th>
            <th>Reliability Score</th>
            <th>Phone</th>

            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {vendorDetails.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.vendor}</td>
              <td>{vendor.DeliveryTime} days</td>
              <td>{vendor.ReliabilityScore}</td>
              <td>{vendor.vendorPhone}</td>

              <td>
              <button className="confirm-order-btn" onClick={() => handleConfirmOrder(vendor)}>
              Confirm Order</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="low-stock-suggestion-section">
      {/* <h2>Low Stock Products( {lowStockProducts.length} )</h2> */}
      <div className="low-stock-sub-section">
        <h2>Low Stock Products ({filteredProducts.length})</h2>
        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>



      {error && <p className="error-message">Error: {error}</p>}
      <div className="products-container">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div
              key={index}
              className="low-stock-product"
            >
              <h3>{product.productname}</h3>
              <p>Category: {product.category}</p>
              <p>Stock Quantity: {product.stockquantity}</p>
              <button onClick={() => handleToggleVendors(product, index)}>
                {selectedProductIndex === index ? "Close" : "Show Vendors"}
              </button>
              {selectedProductIndex === index && (
                <div className="vendor-details-container slide-in">
                  {renderVendors()} {/* Call renderVendors function */}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No low stock products found.</p>
        )}
      </div>

      {/* Total count display */}
      <p className="total-count">
        Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, lowStockProducts.length)} of {lowStockProducts.length} low stock products
      </p>

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faAngleLeft} /> Previous
        </button>

        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProduct >= filteredProducts.length}>
          Next <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>


    </div>
  );
};

export default LowStockSuggestionSection;