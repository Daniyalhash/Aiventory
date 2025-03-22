import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import DashboardCard3 from '@/components/DashboardCard3';

import Link from 'next/link';
import useSWR from 'swr';
import { fetchTotalProducts } from '@/utils/api'; // Import API function

const Cards = () => {
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
    <div className="cardSection">
      {/* <DashboardCard
        title="Automate Vendors"
        value={data ? data.total_vendors : "Loading..."}
        description="Vendors"
        link="/dashboard/vendor"
        bgColor="bg-custom-one"
        as={Link}
        href="/dashboard/vendors"
      >
        <span className="arrow right" />
      </DashboardCard> */}
 <DashboardCard3
        title="Automate Vendors"
        value={data ? data.total_vendors : "Loading..."}
        description="Vendors"
        link="/dashboard/vendor"
        bgColor="#9FE870"
        as={Link}
        href="/dashboard/vendors"
        promotion='Top Vendor'
      >
        <span className="arrow right" />
      </DashboardCard3>
      <DashboardCard3
        title="Total Products"
        value={data ? data.total_unique_products : "Loading..."}
        description="Size of Inventory"
        link="/dashboard/inventory"
        bgColor="green-card" // Use class name for green

        as={Link}
        arrow="right"
        promotion='Top Vendor'

      >
        <span className="arrow right" />
      </DashboardCard3>

      <DashboardCard3
        title="Expiry Products"
        value={data ? data.expired_products_list : "Loading..."}
        description="Low stock product"
        link="/dashboard/inventory"
        bgColor="green-card" // Use class name for green
        arrow="right"
        as={Link}
        promotion='Top Vendor'

      >
        <span className="arrow right" />
      </DashboardCard3>
    </div>
  );
};

export default Cards;
