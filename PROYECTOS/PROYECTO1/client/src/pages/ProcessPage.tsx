import { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import ProcessTree from "../components/ProcessTree";

import { getProcesses } from "../api/processes.api";
import { Process, Node, Edge } from "../interfaces/processes.interface";

function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    getProcessTree();
  }, []);

  useEffect(() => {
    if (selectedProcess) {
      console.log("Proceso seleccionado padre:", selectedProcess);
      console.log("Procesos hijos:", selectedProcess.child);

      const nodes = generateNodes(selectedProcess);
      const edges = generateEdges(selectedProcess);

      console.log("Nodos:", nodes);
      console.log("Edges:", edges);

      setNodes(nodes);
      setEdges(edges);
    }
  }, [selectedProcess]);

  function getProcessTree() {
    getProcesses()
      .then((response) => response.json())
      .then((data) => {
        const processes = data["processes"].slice(0, 100);
        setProcesses(processes);
      });
  }

  function generateNodes(process: Process): Node[] {
    const nodes: Node[] = [];

    // Add the parent process
    nodes.push({ id: process.pid, label: `${process.pid}\n${process.name}` });

    // Add the child processes
    process.child.forEach((childProcess) => {
      nodes.push({
        id: childProcess.pid,
        label: `${childProcess.pid}\n${childProcess.name}`,
      } as Node);
    });
    return nodes;
  }

  function generateEdges(process: Process): Edge[] {
    const edges: Edge[] = process.child.map((childProcess) => {
      return { from: childProcess.pid, to: childProcess.pidPadre } as Edge;
    });
    return edges;
  }

  return (
    <div className="flex flex-col items-center w-auto h-auto mt-5">
      <div className="flex flex-col items-center w-5/6 bg-white shadow-lg rounded-lg px-10 pt-8 pb-4">
        <p className="text-4xl font-bold text-docker-text mb-4">
          Árbol de Procesos
        </p>
        <div className="flex justify-start w-[90%]">
          <DropDown
            processes={processes}
            onProcessChange={setSelectedProcess}
          />
        </div>
        <div className="flex justify-center mt-4 mb-4 w-full">
          <ProcessTree nodes={nodes} edges={edges} />
        </div>
      </div>
    </div>
  );
}

export default ProcessesPage;
