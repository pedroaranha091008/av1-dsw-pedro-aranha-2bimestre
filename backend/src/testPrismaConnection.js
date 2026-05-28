import { testPrismaConnection } from "./config/prisma.js";

try {
  await testPrismaConnection();
  process.exit(0);
} catch (error) {
  process.exit(1);
}
