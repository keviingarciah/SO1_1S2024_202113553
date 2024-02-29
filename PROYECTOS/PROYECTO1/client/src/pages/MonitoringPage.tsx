import LiveChart from "../components/LiveChart";
import HistoryChart from "../components/HistoryChart";
import { useState, useEffect } from "react";

import { getLive } from "../api/monitoring";

function MonitoringPage() {
  const [freeRam, setFreeRam] = useState(0);
  const [usedRam, setUsedRam] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveMonitoring();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  function getLiveMonitoring() {
    getLive()
      .then((response) => response.json())
      .then((data) => {
        const liveJson = data;

        const ramFree = liveJson["ram"]["free"];
        const ramUsed = 13900 - ramFree;

        setFreeRam(ramFree);
        setUsedRam(ramUsed);
      });
  }

  return (
    <div className="flex flex-col items-center w-auto gap-32 mt-5 mb-32">
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Uso de la Memoria RAM
        </p>
        <LiveChart used={usedRam} free={freeRam} />
      </div>
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4 ">
        <p className="text-4xl font-bold text-docker-text mb-4">Uso del CPU</p>
        <LiveChart used={50} free={50} />
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
