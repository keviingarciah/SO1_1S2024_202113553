import LiveChart from "../components/LiveChart";
import HistoryChart from "../components/HistoryChart";

function MonitoringPage() {
  return (
    <div className="flex flex-col items-center w-auto gap-32 mt-5 mb-32">
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Uso de la Memoria RAM
        </p>
        <LiveChart />
      </div>
      <div className="flex flex-col items-center w-2/5 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4 ">
        <p className="text-4xl font-bold text-docker-text mb-4">Uso del CPU</p>
        <LiveChart />
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
