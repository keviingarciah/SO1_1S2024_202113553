const API_URL = "/api";

export const getLive = () => fetch(`${API_URL}/monitoring/live`);

export const getHistory = () => fetch(`${API_URL}/monitoring/history`);
