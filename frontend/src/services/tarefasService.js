import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const tarefasService = {
  async listar() {
    const { data } = await api.get("/tarefas");
    return data;
  },

  async buscarPorId(id) {
    const { data } = await api.get(`/tarefas/${id}`);
    return data;
  },

  async criar(tarefa) {
    const { data } = await api.post("/tarefas", tarefa);
    return data;
  },

  async atualizar(id, tarefa) {
    const { data } = await api.put(`/tarefas/${id}`, tarefa);
    return data;
  },

  async excluir(id) {
    const { data } = await api.delete(`/tarefas/${id}`);
    return data;
  },
};