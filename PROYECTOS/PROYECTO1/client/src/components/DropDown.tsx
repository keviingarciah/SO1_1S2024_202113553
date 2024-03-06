import { useState } from "react";

function Dropdown() {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="form-select block w-40 mt-1 text-center rounded py-2 bg-docker-blue hover:bg-docker-blue-hover text-white font-semibold"
    >
      <option value="">PROCESOS</option>
      <option value="opcion1">PID - 1</option>
      <option value="opcion2">PID - 2</option>
      <option value="opcion3">PID - 3</option>
    </select>
  );
}

export default Dropdown;
