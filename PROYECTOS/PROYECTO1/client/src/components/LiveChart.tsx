import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LiveChartProps {
  used: number;
  free: number;
}

function LiveChart({ used, free }: LiveChartProps) {
  const data = {
    labels: ["Memoria en Uso", "Memoria Libre"],
    datasets: [
      {
        label: "Gigabytes (GB)",
        data: [used, free],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default LiveChart;
