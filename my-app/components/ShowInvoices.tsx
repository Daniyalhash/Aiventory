// components/ShowInvoices.tsx
import '@/styles/ShowInvoice.css';
import Link from "next/link";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faChevronLeft,
    faEdit,
    faCamera,
    faSave,
    faPlus
} from "@fortawesome/free-solid-svg-icons";

export default function ShowInvoices() {
    const invoices = [
        {
          id: 1,
          client: "John Doe",
          date: "2024-12-29", // Use ISO 8601 format for consistent date handling
          products: [
            {
              name: "Apples",
              category: "Fruits",
              quantity: 3,
              price: 1.99,
            },
            {
              name: "Milk (1 Gallon)", // Clarify unit for clarity
              category: "Dairy",
              quantity: 1,
              price: 3.79,
            },
          ],
        },
        {
          id: 2,
          client: "Jane Smith",
          date: "2024-12-28",
          products: [
            {
              name: "Bread",
              category: "Bakery",
              quantity: 2,
              price: 2.49,
            },
            {
              name: "Eggs (Dozen)", // Clarify unit for clarity
              category: "Dairy",
              quantity: 1,
              price: 3.29,
            },
            {
              name: "Chicken Breasts", // More specific product name
              category: "Meat",
              quantity: 2,
              price: 7.99,
            },
          ],
        },
        {
          id: 3,
          client: "David Lee",
          date: "2024-12-27",
          products: [
            {
              name: "Brown Rice (2 lbs)", // Clarify unit for clarity
              category: "Grains",
              quantity: 1,
              price: 4.25,
            },
            {
              name: "Black Beans (Can)", // Clarify unit for clarity
              category: "Pantry",
              quantity: 2,
              price: 1.59,
            },
          ],
        },
      ];
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
                <th>Client</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  {invoice.products.map((product, index) => (
                    <tr key={`${invoice.id}-${product.name}`}>
                      {index === 0 && <td rowSpan={invoice.products.length}>{invoice.id}</td>} {/* rowSpan for the first product */}
                      {index === 0 && <td rowSpan={invoice.products.length}>{invoice.client}</td>} {/* rowSpan for the first product */}
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
                          <Link href={`/invoices/${invoice.id}`}>
                            <span className="view-action">View</span>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }