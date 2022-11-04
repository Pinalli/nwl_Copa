import Fastfy from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastfy({
    logger: true,
  }); //logs da aplicacao

  await fastify.register(cors, {
    //seguranca
    origin: true, //qualquer origem acessa o backend(www.qualquercoisa.com)
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();
    return { count };
  });

  await fastify.listen({ port: 3333 /* host: "0.0.0.0" */ });
}

bootstrap();
