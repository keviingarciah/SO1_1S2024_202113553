import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center justify-center h-4/6">
        <div className="bg-white shadow-lg rounded-lg w-3/5">
          <div className="flex flex-col justify-center items-start px-10 py-12">
            <h1 className="text-5xl font-bold text-docker-text">
              PROYECTO 1 :)
            </h1>
            <p className="text-xl mt-4 font-sans text-docker-text">
              Sistema de monitoreo de recursos del sistema y gestión de procesos
              obteniendo información clave sobre el rendimiento del computador,
              procesos en ejecución y su administración a través de una interfaz
              amigable.
            </p>
            <div className="self-center mt-12">
              <Link
                to="/monitoring"
                className="bg-docker-blue hover:bg-docker-blue-hover px-96 py-4 rounded text-white text-2xl font-semibold"
              >
                ¡VAMOS!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
