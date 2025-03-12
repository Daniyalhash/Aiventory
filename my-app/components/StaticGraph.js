import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StaticGraph = () => {
  // Static data for the bar chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales Data',
        data: [12, 19, 3, 5, 2], // Static values (replace with dynamic data later)
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  return (
    <div className="graphContainer">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StaticGraph;
