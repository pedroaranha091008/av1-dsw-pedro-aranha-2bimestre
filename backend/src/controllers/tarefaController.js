import * as TarefaModel from "../models/tarefaModel.js";

export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    return res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return res.status(500).json({ erro: "Erro interno ao listar tarefas" });
  }
}

export async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefa = await TarefaModel.buscarPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa por ID:", error);
    return res.status(500).json({ erro: "Erro interno ao buscar tarefa" });
  }
}

export async function criar(req, res) {
  const { title, description, completed } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ erro: "Descrição deve ser string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  try {
    const tarefaCriada = await TarefaModel.criar({
      title: title.trim(),
      description: description?.trim(),
      completed
    });

    return res.status(201).json({
      mensagem: "Tarefa criada com sucesso!",
      tarefa: tarefaCriada
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao criar tarefa" });
  }
}

export async function atualizar(req, res) {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  if (
    title === undefined &&
    description === undefined &&
    completed === undefined
  ) {
    return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado" });
  }

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ erro: "Título inválido" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ erro: "Descrição inválida" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  try {
    const tarefaAtualizada = await TarefaModel.atualizar(id, {
      title: title?.trim(),
      description: description?.trim(),
      completed
    });

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao atualizar tarefa" });
  }
}

export async function excluir(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefaRemovida = await TarefaModel.excluir(id);

    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa: tarefaRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao excluir tarefa" });
  }
}
