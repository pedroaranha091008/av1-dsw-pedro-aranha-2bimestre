import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ tarefa, onToggle, onDelete }) {
  const [deletando, setDeletando] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    if (!confirm(`Excluir "${tarefa.title}"?`)) return;
    setDeletando(true);
    try {
      await onDelete(tarefa.id);
    } finally {
      setDeletando(false);
    }
  }

  const dataFormatada = new Date(tarefa.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`card p-4 flex gap-4 items-start transition-opacity ${
        deletando ? "opacity-40" : ""
      }`}
    >
      <button
        onClick={() => onToggle(tarefa)}
        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
        style={{
          borderColor: tarefa.completed ? "#c8e645" : "#4a4a3e",
          backgroundColor: tarefa.completed ? "#c8e645" : "transparent",
        }}
        title={tarefa.completed ? "Marcar como pendente" : "Marcar como concluída"}
      >
        {tarefa.completed && (
          <svg className="w-3 h-3 text-ink-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium leading-snug ${
            tarefa.completed ? "line-through text-ink-400" : "text-ink-100"
          }`}
        >
          {tarefa.title}
        </p>
        {tarefa.description && (
          <p className="text-sm text-ink-400 mt-1 leading-relaxed">
            {tarefa.description}
          </p>
        )}
        <p className="text-xs text-ink-500 font-mono mt-2">{dataFormatada}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => navigate(`/editar/${tarefa.id}`)}
          className="btn-ghost p-1.5 rounded hover:bg-ink-700"
          title="Editar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={deletando}
          className="btn-ghost p-1.5 rounded hover:bg-ink-700 hover:text-red-400"
          title="Excluir"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}