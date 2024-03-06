import LiveChart from "../components/LiveChart";
import HistoryChart from "../components/HistoryChart";
import { useState, useEffect } from "react";

import { getLive, getHistory } from "../api/monitoring.api";

function MonitoringPage() {
  const [freeRam, setFreeRam] = useState(0);
  const [usedRam, setUsedRam] = useState(0);

  const [freeCpu, setFreeCpu] = useState(0);
  const [usedCpu, setUsedCpu] = useState(0);

  const [historyRam, setHistoryRam] = useState([]);
  const [historyCpu, setHistoryCpu] = useState([]);
  const [historyTime, setHistoryTime] = useState([]);

  useEffect(() => {
    getHistoryMonitoring();

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

        const ramFree = liveJson["ram"]["free"];
        const ramUsed = 13900 - ramFree;
        setFreeRam(ramFree);
        setUsedRam(ramUsed);

        const cpuUsed = liveJson["cpu"]["percentage"];
        const cpuFree = 100 - cpuUsed;
        setFreeCpu(cpuFree);
        setUsedCpu(cpuUsed);
      });
  }

  function getHistoryMonitoring() {
    getHistory()
      .then((response) => response.json())
      .then((data) => {
        const historyJson = data;
        const historyData = historyJson["data"];
        const historyHistory = historyJson["history"];

        setHistoryRam(historyData["ram"].reverse());
        setHistoryCpu(historyData["cpu"].reverse());
        setHistoryTime(historyHistory["time"].reverse());
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
        <HistoryChart ram={historyRam} cpu={historyCpu} time={historyTime} />
      </div>
    </div>
  );
}

export default MonitoringPage;
