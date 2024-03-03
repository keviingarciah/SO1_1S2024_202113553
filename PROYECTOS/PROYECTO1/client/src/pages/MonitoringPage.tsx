import LiveChart from "../components/LiveChart";
import HistoryChart from "../components/HistoryChart";
import { useState, useEffect } from "react";

import { getLive } from "../api/monitoring";

function MonitoringPage() {
  const [freeRam, setFreeRam] = useState(0);
  const [usedRam, setUsedRam] = useState(0);

  const [freeCpu, setFreeCpu] = useState(0);
  const [usedCpu, setUsedCpu] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveMonitoring();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getLiveMonitoring() {
    getLive()
      .then((response) => response.json())
      .then((data) => {
        const liveJson = data;

        const ramFree = liveJson["ram"]["free"] - 337;
        const ramUsed = 13900 - ramFree;
        setFreeRam(ramFree);
        setUsedRam(ramUsed);

        const cpuData = liveJson["cpu"]["cpu_porcentaje"];

        console.log(cpuData);
        const cpuUsed = parseFloat((cpuData / 1000000).toFixed(2));
        const cpuFree = 100 - cpuUsed;
        setFreeCpu(cpuFree);
        setUsedCpu(cpuUsed);
      });
  }

  return (
    <div className="flex flex-col items-center w-auto gap-32 mt-5 mb-32">
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Uso de la Memoria RAM
        </p>
        <LiveChart
          used={usedRam}
          free={freeRam}
          labelTitle="RAM"
          labelData="Gigabytes(GB)"
        />
      </div>
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4 ">
        <p className="text-4xl font-bold text-docker-text mb-4">Uso del CPU</p>
        <LiveChart
          used={usedCpu}
          free={freeCpu}
          labelTitle="CPU"
          labelData="Porcentaje(%)"
        />
      </div>
      <div className="flex flex-col items-center  w-3/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4 ">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Historial de Rendimiento
        </p>
        <HistoryChart />
      </div>
    </div>
  );
}

export default MonitoringPage;
