import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [carne, setCarne] = useState("");
  const [date, setDate] = useState("");
  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    try {
      // Hacer una solicitud al servidor
      const response = await fetch("http://localhost:5000/data");
      const data = await response.json();

      // Actualizar las variables con la respuesta del servidor
      setName(data.Name);
      setCarne(data.Carnet);
      setDate(data.Date);

      // Mostrar los datos después de obtener la respuesta
      setShowData(true);
    } catch (error) {
      console.error("Error al obtener los datos del servidor:", error);
    }
  };

  return (
    <>
      <h1>Tarea 1</h1>

      <div className="card">
        <button onClick={fetchData}>
          Obtener Datos
        </button>
        
        {/* Mostrar los datos solo si showData es true */}
        {showData && (
          <>
            <p>Nombre: {name}</p>
            <p>Carnet: {carne}</p>
            <p>Fecha: {date}</p>
          </>
        )}
      </div>
    </>
  )
}

export default App
