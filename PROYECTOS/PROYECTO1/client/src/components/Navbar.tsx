import { NavLink } from "react-router-dom";
import { FaDocker } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { TbBinaryTree2 } from "react-icons/tb";
import { TbHeartRateMonitor } from "react-icons/tb";

function Navbar() {
  return (
    <div className="bg-docker-blue">
      <nav className="flex items-center mx-5 p-4">
        <div className="text-white font-semibold text-4xl flex items  -center">
          <FaDocker className="mr-3 text-6xl" />
          <p className="mt-2">SO1</p>
        </div>
        <ul className="flex ml-auto text-white text-xl font-semibold">
          <li>
            <NavLink
              to="/monitoring"
              className=" hover:bg-docker-hover px-4 py-4 rounded"
            >
              <MdQueryStats className="mr-2 inline text-3xl" />
              Monitoreo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/processes"
              className=" hover:bg-docker-hover px-4 py-4 rounded"
            >
              <TbBinaryTree2 className="mr-2 inline text-3xl" />
              Diagrama de Procesos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/simulation"
              className=" hover:bg-docker-hover px-4 py-4 rounded"
            >
              <TbHeartRateMonitor className="mr-2 inline text-3xl" />
              Simulación de Estados
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
