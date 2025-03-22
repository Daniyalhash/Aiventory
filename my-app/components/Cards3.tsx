import React, { useState } from 'react';
import DashboardCard4 from '@/components/DashboardCard4';
import PredictedDemandChart from './PredictedDemandChart';
// import useSWR from 'swr';
// import { fetchDashboardVisuals } from '@/utils/api';
import SalesBarChart from './SalesBarChart';
const Cards3 = () => {
  const [selectedRangePrediction, setSelectedRangePrediction] = useState('Day 5');
  const [selectedRangeSales, setSelectedRangeSales] = useState('Day 5');


  return (
    <div className="LargecardSection">
      <DashboardCard4
        title="Product Prediction"
        value={0}
        bgColor="bg-custom-one"
        graphContent={<PredictedDemandChart selectedRange={selectedRangePrediction} />}
        onRangeChange={setSelectedRangePrediction} // Pass selected range to the chart

      />
      {/* Second Card - Monthly Sales Analysis */}
      <DashboardCard4
        title="Monthly Sales Analysis"
        value={0}
        bgColor="bg-custom-third"
        graphContent={<SalesBarChart selectedRange={selectedRangeSales} />}
        onRangeChange={setSelectedRangeSales} // This state is for Sales Analysis only
      />
    </div>
  );
};

export default Cards3;
