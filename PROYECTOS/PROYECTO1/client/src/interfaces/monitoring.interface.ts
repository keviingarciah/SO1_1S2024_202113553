export interface LiveMonitoring {
  ram: {
    free: number;
  };
  cpu: {
    free: number;
  };
}

export interface HistoryMonitoring {
  data: {
    ram: number[];
    cpu: number[];
  };
  history: {
    time: string[];
  };
}
