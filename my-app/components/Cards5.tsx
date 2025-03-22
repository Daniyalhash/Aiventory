import React, { useState } from 'react';
import DashboardCard6 from '@/components/DashboardCard6';
import DemandPieChart from '@/components/DemandPieChart';

const Cards5 = () => {
  const [selectedRange, setSelectedRange] = useState('Week 5');

  return (
    <div className="LargecardSection6">
      <DashboardCard6
        title="Products Prediction Based On Category"
        value={0}
        bgColor="bg-custom-one"
        graphContent={<DemandPieChart selectedRange={selectedRange} />}
        onRangeChange={setSelectedRange} // Pass selected range to the chart
      />
    </div>
  );
};

export default Cards5;
