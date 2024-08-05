import Fastify from "fastify";
import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const fastify: FastifyInstance = Fastify({
    logger: true,
});

import { z } from "zod";

import db from "./utils/db";

console.log(db.query("SELECT $message").all({ message: "Hello from DB" }));

import { getUserData as getUserData } from "./utils/auth";

// Routes
fastify.register(require("./routes/user"), { prefix: "/api/user" });

//
fastify.get("/status", { preHandler: [getUserData] }, async (req, res) => {
    return { status: "online" };
});

try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
