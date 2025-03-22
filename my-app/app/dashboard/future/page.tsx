"use client";
// app/dashboard/page.tsx
import DashboardCard from '@/components/DashboardCard';
import FutureOver from '@/components/FutureOver';
import Cards4 from '@/components/Cards4';
import Cards3 from '@/components/Cards3';  // This is correct import, remove duplicate
import Cards5 from '@/components/Cards5';  // This is correct import, remove duplicate



import "@/styles/futurePage.css";
import ButtonFrame3 from '@/components/ButtonFrame3';

export default function Future() {
  // const userId = localStorage.getItem("userId"); // Retrieve from localStorage
  return (
    <div className="futurePage">
      <FutureOver />
      <ButtonFrame3 />

      <Cards3 />
      <div className="futureSub">
        <Cards4 />
        <Cards5 />
      </div>


      {/* Add other DashboardCard components here */}
    </div>
  );
}
