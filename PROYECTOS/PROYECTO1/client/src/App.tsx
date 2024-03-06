import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MonitoringPage from "./pages/MonitoringPage";
import ProcessesPage from "./pages/ProcessesPage";
import SimulationPage from "./pages/SimulationPage";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/processes" element={<ProcessesPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
