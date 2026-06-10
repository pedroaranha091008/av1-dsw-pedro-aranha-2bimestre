import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { tarefasService } from "../services/tarefasService";
import TaskForm from "../components/TaskForm";

export default function EditarTarefa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [buscando, setBuscando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscar() {
      try {
        const dados = await tarefasService.buscarPorId(id);
        setTarefa(dados);
      } catch (err) {
        if (err?.response?.status === 404) {
          setErro("Tarefa não encontrada.");
        } else {
          setErro("Erro ao carregar tarefa.");
        }
      } finally {
        setBuscando(false);
      }
    }
    buscar();
  }, [id]);

  async function handleSubmit(dados) {
    setCarregando(true);
    try {
      await tarefasService.atualizar(id, dados);
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
        <h1 className="text-2xl font-semibold text-ink-100 mt-3">Editar tarefa</h1>
      </div>

      <div className="card p-6">
        {buscando && (
          <div className="space-y-3">
            <div className="h-10 bg-ink-700 rounded animate-pulse" />
            <div className="h-20 bg-ink-700 rounded animate-pulse" />
            <div className="h-10 bg-ink-700 rounded animate-pulse" />
          </div>
        )}

        {!buscando && erro && (
          <div className="text-center">
            <p className="text-red-400 mb-4">{erro}</p>
            <Link to="/" className="btn-primary">
              Voltar para tarefas
            </Link>
          </div>
        )}

        {!buscando && tarefa && (
          <TaskForm
            inicial={tarefa}
            onSubmit={handleSubmit}
            carregando={carregando}
            submitLabel="Salvar alterações"
          />
        )}
      </div>
    </div>
  );
}