const API_URL = "http://localhost:8000";

export const newSimulation = () => fetch(`${API_URL}/simulate/start`);

export const stopSimulation = (pid: string) =>
  fetch(`${API_URL}/simulate/stop?pid=${pid}`);

export const resumeSimulation = (pid: string) =>
  fetch(`${API_URL}/simulate/resume?pid=${pid}`);

export const killSimulation = (pid: string) =>
  fetch(`${API_URL}/simulate/kill?pid=${pid}`);
