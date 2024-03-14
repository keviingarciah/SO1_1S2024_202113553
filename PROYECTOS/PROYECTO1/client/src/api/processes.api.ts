const API_URL = "http://localhost:8000";

export const getProcesses = () => fetch(`${API_URL}/processes`);
