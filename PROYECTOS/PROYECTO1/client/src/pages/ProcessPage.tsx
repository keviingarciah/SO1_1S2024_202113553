import { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import ProcessTree from "../components/ProcessTree";

import { getProcesses } from "../api/processes.api";

interface Process {
  pid: number;
  name: string;
  ram: number;
  state: number;
  user: number;
  child: ChildProcess[];
}

interface ChildProcess {
  pid: number;
  pidPadre: number;
  name: string;
  state: number;
}

function ProcessesPage() {
  useEffect(() => {
    getProcessTree();
  }, []);

  function getProcessTree() {
    getProcesses()
      .then((response) => response.json())
      .then((data) => {
        const processes = data["processes"].slice(0, 50);
        console.log(processes);

        processes.map((process: Process, index: number) => {
          console.log(`Proceso ${index + 1}:`, process);
        });
      });
  }

  const nodes = [
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ];

  const edges = [
    { from: 2, to: 1 },
    { from: 3, to: 1 },
    { from: 4, to: 2 },
    { from: 5, to: 3 },
  ];

  return (
    <div className="flex flex-col items-center w-auto h-auto mt-5">
      <div className="flex flex-col items-center w-5/6 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Árbol de Procesos
        </p>
        <div className="flex justify-start w-[90%]">
          <DropDown />
        </div>
        <div className="flex justify-center mt-4 mb-4 w-full">
          <ProcessTree nodes={nodes} edges={edges} />
        </div>
      </div>
    </div>
  );
}

export default ProcessesPage;
