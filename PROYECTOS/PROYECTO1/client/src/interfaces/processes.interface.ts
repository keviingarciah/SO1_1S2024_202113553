export interface Process {
  pid: number;
  name: string;
  ram: number;
  state: number;
  user: number;
  child: ChildProcess[];
}

export interface ChildProcess {
  pid: number;
  pidPadre: number;
  name: string;
  state: number;
}

export interface Node {
  id: number;
  label: string;
}

export interface Edge {
  from: number;
  to: number;
}
