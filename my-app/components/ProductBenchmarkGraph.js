import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBenchmarkGraph = () => {
  // Static data for the product benchmark (top products based on unit sales)
  const data = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Units Sold',
        data: [500, 450, 400, 350, 300], // Static values for the top-selling products
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue color
        borderColor: 'rgba(54, 162, 235, 1)', // Dark blue color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Top Selling Products (Units Sold)',
      },
    },
  };

  return (
    <div className="graphContainer">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductBenchmarkGraph;
