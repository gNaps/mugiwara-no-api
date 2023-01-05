import fastify from "fastify";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import sagasController from "./routes/sagas/sagas.controller";
import episodesController from "./routes/episodes/episodes.controller";
import chaptersController from "./routes/chapters/chapters.controller";
import volumesController from "./routes/volumes/volumes.controller";

const server = fastify({
  logger: true,
  bodyLimit: 30 * 1024 * 1024, // Default Limit set to 30MB
});
dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URI || "", {
    dbName: process.env.MONGO_DB_NAME || "test",
  });
} catch (error) {
  console.error(error);
}

server.register(cors);

server.register(sagasController, { prefix: "/sagas" });
server.register(episodesController, { prefix: "/episodes" });
server.register(chaptersController, { prefix: "/chapters" });
server.register(volumesController, { prefix: "/volumes" });

server.listen(
  { port: 8080, host: process.env.ENV_DEVELOP ? "127.0.0.1" : "0.0.0.0" },
  (error: any, address: any) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`Server running on ${address}`);
  }
);
