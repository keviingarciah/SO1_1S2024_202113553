import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "preact/hooks";
import { GetRamUsage } from "../wailsjs/go/main/App";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function App(props) {
  const [ramUsage, setRamUsage] = useState(0);
  const [ramFree, setRamFree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getRam();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getRam() {
    GetRamUsage().then((result) => {
      const ramUsage = parseInt(result);
      const ramFree = 8000000 - ramUsage;
      setRamUsage(ramUsage);
      setRamFree(ramFree);
    });
  }

  const data = {
    labels: ["RAM en uso", "RAM disponible"],
    datasets: [
      {
        data: [ramUsage, ramFree],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  return (
    <>
      <div className="bg-slate-900 flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-5">
            EN USO: {ramUsage}%
          </h1>
          <Pie data={data} />
        </div>
      </div>
    </>
  );
}
