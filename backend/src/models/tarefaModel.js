import { prisma } from "../config/prisma.js";

export async function listar() {
  return prisma.task.findMany();
}

export async function buscarPorId(id) {
  return prisma.task.findUnique({
    where: { id }
  });
}

export async function criar({ title, description, completed = false }) {
  return prisma.task.create({
    data: {
      title,
      description,
      completed
    }
  });
}

export async function atualizar(id, dados) {
  const data = {};

  if (dados.title !== undefined) data.title = dados.title;
  if (dados.description !== undefined) data.description = dados.description;
  if (dados.completed !== undefined) data.completed = dados.completed;

  if (Object.keys(data).length === 0) {
    return null;
  }

  try {
    return await prisma.task.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro no Model atualizar:", error);
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro no Model excluir:", error);
    throw error;
  }
}
