import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tarefasService } from "../services/tarefasService";
import TaskCard from "../components/TaskCard";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    setCarregando(true);
    setErro("");
    try {
      const dados = await tarefasService.listar();
      setTarefas(dados);
    } catch {
      setErro("Não foi possível conectar com a API. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleToggle(tarefa) {
    try {
      const atualizada = await tarefasService.atualizar(tarefa.id, {
        completed: !tarefa.completed,
      });
      setTarefas((prev) =>
        prev.map((t) => (t.id === tarefa.id ? atualizada.tarefa : t))
      );
    } catch {
      alert("Erro ao atualizar tarefa.");
    }
  }

  async function handleDelete(id) {
    try {
      await tarefasService.excluir(id);
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Erro ao excluir tarefa.");
    }
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.completed;
    if (filtro === "concluidas") return t.completed;
    return true;
  });

  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-ink-100">Minhas tarefas</h1>
          {!carregando && !erro && (
            <p className="text-sm text-ink-400 mt-1 font-mono">
              {concluidas}/{total} concluídas
            </p>
          )}
        </div>
        <Link to="/nova" className="btn-primary">
          + Nova tarefa
        </Link>
      </div>

      {!carregando && !erro && tarefas.length > 0 && (
        <div className="flex gap-1 mb-6">
          {[
            { key: "todas", label: "Todas" },
            { key: "pendentes", label: "Pendentes" },
            { key: "concluidas", label: "Concluídas" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                filtro === key
                  ? "bg-lime-400 text-ink-900 font-medium"
                  : "text-ink-400 hover:text-ink-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {carregando && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4 h-16 animate-pulse bg-ink-700" />
          ))}
        </div>
      )}

      {erro && (
        <div className="card p-6 text-center">
          <p className="text-red-400 mb-3">{erro}</p>
          <button onClick={carregarTarefas} className="btn-primary">
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && tarefasFiltradas.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-ink-400 mb-1">
            {filtro === "todas"
              ? "Nenhuma tarefa ainda."
              : `Nenhuma tarefa ${filtro === "pendentes" ? "pendente" : "concluída"}.`}
          </p>
          {filtro === "todas" && (
            <Link to="/nova" className="text-lime-400 text-sm hover:underline">
              Criar primeira tarefa →
            </Link>
          )}
        </div>
      )}

      {!carregando && !erro && tarefasFiltradas.length > 0 && (
        <div className="space-y-2">
          {tarefasFiltradas.map((tarefa) => (
            <TaskCard
              key={tarefa.id}
              tarefa={tarefa}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}