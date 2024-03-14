import { useState } from "react";
import Button from "../components/Button";
import StateDiagram from "../components/StateDiagram";
import { Node, Edge } from "../interfaces/processes.interface";
import {
  newSimulation,
  stopSimulation,
  resumeSimulation,
  killSimulation,
} from "../api/simulation.api";

// RunningNodes and RunningEdges
const NewNodes = [
  { id: 1, label: "NEW" },
  { id: 2, label: "READY" },
  { id: 3, label: "RUNNING", color: "rgb( 133, 255, 111 )" },
];

const NewEdges = [
  { from: 1, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 2, to: 3, arrows: "to", color: "rgb( 24, 140, 255 )" },
];

// StopNodes and StopEdges
const StopNodes = [
  { id: 1, label: "NEW" },
  { id: 2, label: "READY", color: "rgb( 133, 255, 111 )" },
  { id: 3, label: "RUNNING" },
];

const StopEdges = [
  { from: 1, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 2, to: 3, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 3, to: 2, arrows: "to", color: "rgb( 0, 223, 20 )" },
];

// ResumeNodes and ResumeEdges
const ResumeNodes = [
  { id: 1, label: "NEW" },
  { id: 2, label: "READY" },
  { id: 3, label: "RUNNING", color: "rgb( 133, 255, 111 )" },
];

const ResumeEdges = [
  { from: 1, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 2, to: 3, arrows: "to", color: "rgb( 0, 223, 20 )" },
  { from: 3, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
];

// KillNodes and KillEdges
const KillNodes = [
  { id: 1, label: "NEW" },
  { id: 2, label: "READY" },
  { id: 3, label: "RUNNING" },
  { id: 4, label: "TERMINATED", color: "rgb( 133, 255, 111 )" },
];

const KillEdges = [
  { from: 1, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 2, to: 3, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 3, to: 2, arrows: "to", color: "rgb( 24, 140, 255 )" },
  { from: 3, to: 4, arrows: "to", color: "rgb( 24, 140, 255 )" },
];

function SimulationPage() {
  const [pid, setPid] = useState<string>("---");

  const [currentNodes, setCurrentNodes] = useState<Node[]>([]);
  const [currentEdges, setCurrentEdges] = useState<Edge[]>([]);

  const handleNew = () => {
    newSimulation()
      .then((response) => response.json())
      .then((data) => {
        const pid = data["pid"];
        setPid(pid);
      });

    setCurrentNodes(NewNodes);
    setCurrentEdges(NewEdges);
  };

  const handleStop = () => {
    stopSimulation(pid);

    setCurrentNodes(StopNodes);
    setCurrentEdges(StopEdges);
  };

  const handleResume = () => {
    resumeSimulation(pid);

    setCurrentNodes(ResumeNodes);
    setCurrentEdges(ResumeEdges);
  };

  const handleKill = () => {
    killSimulation(pid);

    setPid("---");
    setCurrentNodes(KillNodes);
    setCurrentEdges(KillEdges);
  };

  return (
    <div className="flex flex-col items-center w-auto h-auto mt-5">
      <div className="flex flex-col items-center w-5/6 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Diagrama de Estados
        </p>
        <div className="flex justify-start w-[90%]">
          <p className="text-lg bg-docker-blue text-white font-semibold py-2 px-6 rounded">
            {`PID: ${pid}`}
          </p>
        </div>
        <div className="flex justify-between mt-4 mb-4 w-[60%]">
          <Button type="new" onClick={() => handleNew()}>
            NEW
          </Button>
          <Button type="stop" onClick={() => handleStop()}>
            STOP
          </Button>
          <Button type="resume" onClick={() => handleResume()}>
            RESUME
          </Button>
          <Button type="kill" onClick={() => handleKill()}>
            KILL
          </Button>
        </div>
        <div className="flex justify-center mt-4 mb-4 w-full">
          <StateDiagram nodes={currentNodes} edges={currentEdges} />
        </div>
      </div>
    </div>
  );
}

export default SimulationPage;
