import React from 'react';
import DashboardCard2 from '@/components/DashboardCard2';
import CompetitorComparisonChart from '@/components/CompetitorComparisonChart';
import SimpleStockPieChart from '@/components/SimpleStockPieChart';

import useSWR from 'swr';
import { fetchDashboardVisuals } from '@/utils/api';

const Cards2 = () => {
  // Retrieve userId from localStorage (only in client-side)
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const stockData = {
    outOfStock: 10,  // Example data
    lowStock: 25,
    healthyStock: 65,
  };
  // Use SWR for fetching benchmark data -- API
  const { data: benchmarkData, error } = useSWR(
    userId ? ['get-dashboard-visuals', userId] : null, 
    () => fetchDashboardVisuals(userId!), 
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="LargecardSection">
      <DashboardCard2
        title="Product Benchmarking"
        value={0}
        link="/dashboard/insights"
        bgColor="bg-custom-one"
        graphContent={<CompetitorComparisonChart data={benchmarkData || []} />}
      />
          <DashboardCard2
        title="Stock Analysis"
        value={0}
        link="/dashboard/insights"
        bgColor="bg-custom-third"
        graphContent={<SimpleStockPieChart />}
        />
    </div>
  );
};

export default Cards2;
