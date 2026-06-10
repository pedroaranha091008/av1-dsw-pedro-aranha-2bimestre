import { useState } from "react";

export default function TaskForm({ inicial = {}, onSubmit, carregando, submitLabel = "Salvar" }) {
  const [title, setTitle] = useState(inicial.title || "");
  const [description, setDescription] = useState(inicial.description || "");
  const [completed, setCompleted] = useState(inicial.completed || false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!title.trim()) {
      setErro("O título é obrigatório.");
      return;
    }

    try {
      await onSubmit({ title: title.trim(), description: description.trim() || undefined, completed });
    } catch (err) {
      setErro(err?.response?.data?.erro || "Erro ao salvar tarefa.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-ink-300 mb-1.5">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que precisa ser feito?"
          className="input-field"
          disabled={carregando}
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm text-ink-300 mb-1.5">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes opcionais..."
          rows={3}
          className="input-field resize-none"
          disabled={carregando}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-4 h-4 accent-lime-400"
          disabled={carregando}
        />
        <label htmlFor="completed" className="text-sm text-ink-300">
          Marcar como concluída
        </label>
      </div>

      {erro && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
          {erro}
        </p>
      )}

      <button type="submit" disabled={carregando} className="btn-primary w-full">
        {carregando ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}