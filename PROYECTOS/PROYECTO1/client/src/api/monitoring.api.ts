const API_URL = "http://localhost:3000";

export const getLive = () => fetch(`${API_URL}/monitoring/live`);

export const getHistory = () => fetch(`${API_URL}/monitoring/history`);