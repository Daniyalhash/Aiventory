"use client";
// app/dashboard/page.tsx
import DashboardCard from '@/components/DashboardCard';
import SectionHeading from '@/components/DashboardOver';
import Cards from '@/components/Cards';
import Cards2 from '@/components/Cards2';  // This is correct import, remove duplicate



import "@/styles/dashboardPage.css";

export default function DashboardPage() {
  // const userId = localStorage.getItem("userId"); // Retrieve from localStorage
  return (
    <div className="dashboardPage">
      <SectionHeading />

     <Cards />
  
     <Cards2 />
      {/* Add other DashboardCard components here */}
    </div>
  );
}
