import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Episode } from "../../models/Episode";

const episodesController = async (fastify: FastifyInstance) => {
  fastify.get("/", async (req: FastifyRequest, rep: FastifyReply) => {
    const { limit = 10, page = 1 } = req.query as any;
    const skip = page * limit - limit;
    try {
      if (skip < 0) {
        rep.code(200).send([]);
        return;
      }
      const episodes = await Episode.find({})
        .skip(skip)
        .limit(limit || 10);
      rep.code(200).send(episodes);
    } catch (error) {
      rep.code(500).send(error);
    }
  });

  fastify.get("/:number", async (req: FastifyRequest, rep: FastifyReply) => {
    const { number } = (req as any).params;
    try {
      const episodes = await Episode.findOne({ number });
      rep.code(200).send(episodes);
    } catch (error) {
      rep.code(500).send(error);
    }
  });
};

export default episodesController;
