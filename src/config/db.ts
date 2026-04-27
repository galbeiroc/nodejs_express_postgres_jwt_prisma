import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB Connect via Prisma");
  } catch (err: any) {
    console.log(`DB connection error: ${err.message}`);
    process.exit(1);
  }
};

const disConnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disConnectDB };
