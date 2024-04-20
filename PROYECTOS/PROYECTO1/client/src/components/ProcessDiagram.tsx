import { useEffect, useRef } from "react";
import { Network } from "vis-network";

import { Node, Edge } from "../interfaces/processes.interface";

interface ProcessDiagramProps {
  nodes: Node[];
  edges: Edge[];
}

const ProcessDiagram = ({ nodes, edges }: ProcessDiagramProps) => {
  const container = useRef(null);
  const options = {};

  useEffect(() => {
    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} style={{ height: "426px", width: "1055px" }} />;
};

export default ProcessDiagram;
