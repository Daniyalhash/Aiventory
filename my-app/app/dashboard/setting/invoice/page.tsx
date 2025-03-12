"use client";
// app/dashboard/page.tsx
import InvoiceOver from "@/components/InvoiceOver";
import ShowInvoices from "@/components/ShowInvoices";

import "@/styles/notifications.css";

export default function Notifications() {
  
    return (
      <div className="NotificationsPage">
      <InvoiceOver />
        <ShowInvoices />
      </div>
    );
  }
  