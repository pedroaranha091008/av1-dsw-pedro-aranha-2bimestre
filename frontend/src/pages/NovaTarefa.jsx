import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tarefasService } from "../services/tarefasService";
import TaskForm from "../components/TaskForm";

export default function NovaTarefa() {
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(dados) {
    setCarregando(true);
    try {
      await tarefasService.criar(dados);
      navigate("/");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-ink-400 hover:text-ink-100 transition-colors">
          ← Voltar
        </Link>
        <h1 className="text-2xl font-semibold text-ink-100 mt-3">Nova tarefa</h1>
      </div>

      <div className="card p-6">
        <TaskForm
          onSubmit={handleSubmit}
          carregando={carregando}
          submitLabel="Criar tarefa"
        />
      </div>
    </div>
  );
}