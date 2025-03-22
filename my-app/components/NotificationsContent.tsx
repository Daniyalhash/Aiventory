import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { fetchStockData } from "@/utils/api";
import "@/styles/NotificationsContent.css";

export default function NotificationsContent() {
  const [showNotification, setShowNotification] = useState(true);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // Fetch stock data
  const { data: benchmarks } = useSWR(
    userId ? ["get-stock-levels", userId] : null,
    () => fetchStockData(userId),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  // Map stock data or use defaults
  const benchmarkData = benchmarks
    ? benchmarks.map((item, index) => ({
        name: item.name,
        value: item.value,
        color: index === 0 ? "#FF5C8D" : index === 1 ? "#FFB84D" : "#4CAF50",
      }))
    : [
        { name: "Out of Stock", value: 0, color: "#FF5C8D" },
        { name: "Low Stock", value: 0, color: "#FFB84D" },
        { name: "Healthy Stock", value: 0, color: "#4CAF50" },
      ];

  // Extract stock levels
  const outOfStock = benchmarkData.find(item => item.name === "Out of Stock")?.value || 0;
  const lowStock = benchmarkData.find(item => item.name === "Low Stock")?.value || 0;

  // If no issues, hide notification
  if (!showNotification || (outOfStock === 0 && lowStock === 0)) return null;

  // Dismiss notification
  const dismissNotification = () => setShowNotification(false);

  return (
    <section className="notifications-section">
      <div className="notifications-box">
        <FontAwesomeIcon icon={faCircleXmark} className="close-icon" onClick={dismissNotification} />
        <h4 className="date-icon">{new Date().toLocaleTimeString()}</h4>

        <div className="notifications-box-sec1">
          <FontAwesomeIcon icon={faTriangleExclamation} className="alert-icon" />
        </div>

        <div className="notifications-box-sec2">
          <h2 className="notifications-main-text">Inventory Alert</h2>
          {outOfStock > 0 && <h2 className="notifications-text">{outOfStock} products are out of stock!</h2>}
          {lowStock > 0 && <h2 className="notifications-text">{lowStock} products have low stock!</h2>}
          <Link href="/dashboard/insights" className="visit-page-btn">
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}
