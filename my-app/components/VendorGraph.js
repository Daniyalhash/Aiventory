import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VendorGraph = () => {
  // Static data for the bar chart (Vendor count)
  const data = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'], // Vendors
    datasets: [
      {
        label: 'Best Vendors Count',
        data: [5, 8, 3, 10, 7], // Vendor count (static values, can be dynamic later)
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      title: {
        display: true,
        text: 'Best Vendors Count',
      },
    },
  };

  return (
    <div className="graphContainer">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VendorGraph;
