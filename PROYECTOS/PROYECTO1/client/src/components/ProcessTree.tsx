import { useEffect, useRef } from "react";
import { Network } from "vis-network";

interface Node {
  id: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

interface ProcessTreeProps {
  nodes: Node[];
  edges: Edge[];
}

const ProcessTree = ({ nodes, edges }: ProcessTreeProps) => {
  const container = useRef(null);
  const options = {};

  useEffect(() => {
    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} style={{ height: "440px", width: "1055px" }} />;
};

export default ProcessTree;
