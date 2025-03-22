"use client";
// app/dashboard/page.tsx
import NotificationsOver from "@/components/NotificationsOver"
import NotificationsContent from "@/components/NotificationsContent"

import "@/styles/notifications.css";

export default function Notifications() {
  
    return (
      <div className="NotificationsPage">
      <NotificationsOver />
      <NotificationsContent />
      </div>
    );
  }
  