import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import DashboardCard3 from '@/components/DashboardCard3';

import Link from 'next/link';
import useSWR from 'swr';
import { fetchTotalProducts } from '@/utils/api'; // Import API function
import DashboardCard5 from './DashboardCard5';

const Cards4 = () => {
  // Retrieve userId from localStorage (only on client-side)
  const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

  // Use SWR for data fetching
  const { data, error } = useSWR(userId ? ['get-total-products', userId] : null,
    () => fetchTotalProducts(userId!),
    {
      revalidateOnFocus: false, // Prevents refetching when switching tabs
      shouldRetryOnError: false, // Avoids unnecessary retries on failure
    }
  );

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="cardSection5">

      <DashboardCard5
        main="Forecast of sales"
        subTitle="from 12-06-2024 to 12-06-2025"
        value={2222}
        description="Total Sales"
        link="/dashboard/vendor"
        bgColor="#9FE870"
        as={Link}
        href="/dashboard/vendors"
        description2={
          <div>
            <p style={{ margin: 0 }}>
              The above sales value represents the total number of products you are expected to sell during the specified time period. 
            </p>
          
          </div>
        }      >
        <span className="arrow right" />
      </DashboardCard5>
      
    </div>
  );
};

export default Cards4;
