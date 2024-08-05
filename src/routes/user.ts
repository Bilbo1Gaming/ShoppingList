import type { FastifyInstance, FastifyPluginAsync } from "fastify";

module.exports = function routes(fastify: FastifyInstance, opts: any) {
    fastify.post("/create", async () => {});
};
