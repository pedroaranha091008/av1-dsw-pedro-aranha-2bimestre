import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log("Conexão Prisma: OK");
  } catch (error) {
    console.error("Falha na conexão Prisma:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { prisma, testPrismaConnection };
