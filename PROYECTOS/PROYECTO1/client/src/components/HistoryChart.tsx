import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HistoryChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gráfica de rendimiento a lo largo del tiempo.",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Uso de Ram",
        data: [100, 200, 300, 400, 500, 1, 700],
        borderColor: "rgba(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Uso de CPU",
        data: [700, 1, 500, 400, 300, 200, 100],

        borderColor: "rgba(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default HistoryChart;
