import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NovaTarefa from "./pages/NovaTarefa";
import EditarTarefa from "./pages/EditarTarefa";

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nova" element={<NovaTarefa />} />
          <Route path="/editar/:id" element={<EditarTarefa />} />
          <Route
            path="*"
            element={
              <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="font-mono text-lime-400 text-4xl mb-4">404</p>
                <p className="text-ink-400">Página não encontrada.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}