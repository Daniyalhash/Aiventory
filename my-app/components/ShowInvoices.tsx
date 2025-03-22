// components/ShowInvoices.tsx
import '@/styles/ShowInvoice.css';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faPlus
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Vendor from '../app/dashboard/vendor/page';
export default function ShowInvoices() {
  const searchParams = useSearchParams();

  const productname = searchParams.get("productname");
  const category = searchParams.get("category");
  const stockquantity = searchParams.get("stockquantity");
  const vendor = searchParams.get("vendor");
  const vendorPhone = searchParams.get("vendorPhone");
  const deliveryTime = searchParams.get("deliveryTime");
  const reliabilityScore = searchParams.get("reliabilityScore"); 
  const [invoices, setInvoices] = useState<any[]>([]); // Use any[] for flexibility


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  console.log("Query Parameters:", {
    productname,
    category,
    stockquantity,
    vendor,
    vendorPhone,
    deliveryTime,
    reliabilityScore
  });
  const savedInvoices = useRef(new Set()); // Track saved invoices to avoid duplicates
  const fetchInvoices = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/aiventory/get-invoices/");
      if (!response.ok) throw new Error("Failed to fetch invoices");
  
      const data = await response.json();
      console.log("Fetched invoices:", data);
  
      // Extract the invoices array from the response
      setInvoices(data.invoices || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]); // Prevent UI crash
    }
  };
  
  useEffect(() => {
    console.log("Received values:", { vendor, productname, category, stockquantity });
    console.log("Updated invoices state:", invoices);

    if (vendor && productname && category && stockquantity) {
      const invoiceId = `${vendor}-${productname}-${category}-${stockquantity}`; // Unique ID
  
      // ✅ Prevent saving the same invoice twice
      if (savedInvoices.current.has(invoiceId)) {
        console.log("Invoice already saved, skipping...");
        return;
      }
  
      const newInvoice = {
        id: invoices.length + 1,
        vendor: vendor.trim(),
        date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
        products: [
          {
            name: productname.trim(),
            category: category.trim(),
            quantity: parseInt(stockquantity as string, 10) || 1,
            price: 3.79,
          },
        ],
      };
  
      setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  
      // ✅ Mark this invoice as saved
      savedInvoices.current.add(invoiceId);
      
      // ✅ Save to backend
      saveInvoice(newInvoice);
    }
    fetchInvoices();

  }, [vendor, productname, category, stockquantity]);
  // Function to generate PDF
  const generatePDF = async (id: number) => {
    setSelectedInvoiceId(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    if (!pdfRef.current) return;
  
    // Temporarily show pdfRef
    pdfRef.current.style.position = "absolute";
    pdfRef.current.style.visibility = "visible";
   
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save(`Invoice_${id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  
    // Hide pdfRef again after capture
    pdfRef.current.style.position = "absolute";
    pdfRef.current.style.visibility = "hidden";
    pdfRef.current.style.zIndex = "auto";

  };

  const saveInvoice = async (invoiceData: any) => {
  

  try {
      const response = await fetch("http://127.0.0.1:8000/aiventory/save-invoice/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
      });

      const data = await response.json();
      console.log("Invoice Response:", data);
  } catch (error) {
      console.error("Error saving invoice:", error);
  }
};



  console.log("pdfRef:", pdfRef.current);
  // Handle Confirm Button Click
  const handleConfirmClick = (id: number) => {
    console.log("Selected Invoice ID:", id); // Debugging
    setSelectedInvoiceId(id);
    setIsPopupOpen(true);
  };
  
  console.log("Invoices:", invoices);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedInvoiceId(null);
  };
  // const handleDeleteOrder = () => {
  //   console.log(`Order ${selectedInvoiceId} deleted.`);
  //   setInvoices(prev => prev.filter(inv => inv.id !== selectedInvoiceId));
  //   handleClosePopup();
  // };
  const handleDeleteOrder = async () => {
    if (!selectedInvoiceId) return;
    
    console.log(`Deleting invoice: ${selectedInvoiceId}`);

    try {
        const response = await fetch(`http://127.0.0.1:8000/delete-invoice/${selectedInvoiceId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete invoice: ${response.status}`);
        }

        console.log("Invoice deleted successfully");
        setInvoices(prev => prev.filter(inv => inv._id !== selectedInvoiceId));
        // handleClosePopup();
    } catch (error) {
        console.error("Error deleting invoice:", error);
    }
};
  const handleConfirmOrder = () => {
    if (!selectedInvoiceId) return;
  
    const invoice = invoices.find(inv => inv.id === selectedInvoiceId);
    if (!invoice) return;
  
    // Format invoice details as a message
    const invoiceDetails = `📦 *Invoice Details*
  🛒 Product: ${invoice.products[0].name}
  📂 Category: ${invoice.products[0].category}
  📦 Quantity: ${invoice.products[0].quantity}
  💰 Total: $${invoice.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}
  🚚 Vendor: ${invoice.vendor}
  📅 Date: ${invoice.date}`;
  
    console.log("Sending invoice via WhatsApp:", invoiceDetails);
  
  
    handleClosePopup();
  };

  return (
    <section className="invoice-section">
      <div className="invoice-container">
        <div className="invoice-header">
          <h2>Invoices</h2>
          <button className="create-invoice-button">
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vendor</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>PDF</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                {invoice.products.map((product, index) => (
                  <tr key={`${invoice.id}-${product.name}`}>
                    {index === 0 && <td rowSpan={invoice.products.length}>{invoice.id}</td>}
                    {index === 0 && <td rowSpan={invoice.products.length}>{invoice.vendor}</td>}
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    {index === 0 && (
                      <td rowSpan={invoice.products.length}>
                        ${invoice.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}
                      </td>
                    )}
                    {index === 0 && (
                      <td rowSpan={invoice.products.length}>
                        <button className="view-action" onClick={() => generatePDF(invoice.id)}>View PDF</button>
                      </td>
                    )}
                    <td>
                      <button className="confirm-order-btn" onClick={() => handleConfirmClick(invoice._id)}>Confirm</button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Confirm Action</h3>
              <p>Are you sure you want to confirm or delete this order?</p>
              <div className="popup-buttons">
                <button onClick={handleDeleteOrder} className="delete-button">Delete Order</button>
                <button onClick={handleConfirmOrder} className="confirm-button">Confirm Order</button>
                <button onClick={handleClosePopup} className="cancel-button">Cancel</button>
              </div>
            </div>
          </div>
        )}
        {/* Hidden div for PDF generation */}
        {selectedInvoiceId !== null && (
          <div ref={pdfRef} style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
            <div className="invoice-pdf">
              <h2>Aiventory Invoice</h2>
              <p><strong>Vendor:</strong> {invoices.find(inv => inv.id === selectedInvoiceId)?.vendor}</p>
              <p><strong>Date:</strong> {invoices.find(inv => inv.id === selectedInvoiceId)?.date}</p>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.find(inv => inv.id === selectedInvoiceId)?.products.map((product, index) => (
                    <tr key={index}>
                      <td>{productname}</td>
                      <td>{category}</td>
                      <td>{
                        stockquantity
                      }</td>
                      <td>${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}