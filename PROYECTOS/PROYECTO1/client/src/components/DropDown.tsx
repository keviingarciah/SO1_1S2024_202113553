import { Process } from "../interfaces/processes.interface";
import { useState, useEffect } from "react";

interface DropdownProps {
  processes: Process[];
  onProcessChange: (process: Process | null) => void;
}

function Dropdown({ processes, onProcessChange }: DropdownProps) {
  const [value, setValue] = useState<Process | null>(null);

  useEffect(() => {
    //console.log("Procesos:", processes);
  }, [processes]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProcess = processes.find(
      (process) => process.pid.toString() === event.target.value
    );
    //console.log("Proceso seleccionado:", selectedProcess);
    if (selectedProcess) {
      setValue(selectedProcess);
      onProcessChange(selectedProcess);
    } else {
      setValue(null);
      onProcessChange(null);
    }
  };

  return (
    <select
      value={value?.pid || ""}
      onChange={handleChange}
      className="form-select block w-40 mt-1 text-center rounded py-2 bg-docker-blue hover:bg-docker-blue-hover text-white font-semibold text-lg"
    >
      <option value="">PROCESOS</option>
      {processes.map((process, index) => (
        <option key={index} value={process.pid}>
          PID - {process.pid}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
