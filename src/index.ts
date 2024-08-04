import Fastify from "fastify"
import type { FastifyInstance, RouteShorthandOptions } from "fastify"
import { Server, IncomingMessage, ServerResponse } from 'http'

const fastify: FastifyInstance = Fastify({
    logger: true
  })
  
import { z } from "zod";

fastify.get("/", async (req, res) => {
    return "hello world"
})

try {
    await fastify.listen({ port: 5000 , host:"0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }