const API_URL = "http://localhost:3000";

export const getProcesses = () => fetch(`${API_URL}/processes`);
