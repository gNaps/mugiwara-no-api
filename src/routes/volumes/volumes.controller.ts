import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Volume } from "../../models/Volume";

const volumesController = async (fastify: FastifyInstance) => {
  fastify.get("/", async (req: FastifyRequest, rep: FastifyReply) => {
    const { limit = 10, page = 1 } = req.query as any;
    const skip = page * limit - limit;
    try {
      if (skip < 0) {
        rep.code(200).send([]);
        return;
      }
      const volumes = await Volume.find({})
        .skip(skip)
        .limit(limit || 10);
      rep.code(200).send(volumes);
    } catch (error) {
      rep.code(500).send(error);
    }
  });

  fastify.get("/:number", async (req: FastifyRequest, rep: FastifyReply) => {
    const { number } = (req as any).params;
    try {
      const volumes = await Volume.findOne({ number });
      rep.code(200).send(volumes);
    } catch (error) {
      rep.code(500).send(error);
    }
  });
};

export default volumesController;
