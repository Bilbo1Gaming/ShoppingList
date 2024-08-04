import Fastify from "fastify";
import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const fastify: FastifyInstance = Fastify({
    logger: true,
});

import { z } from "zod";

import { Database } from "bun:sqlite";
try {
    const db = new Database("./persist/db.sqlite", { create: true, strict: true });

    console.log(db.query("SELECT $message").all({ message: "Hello from DB" }));
} catch (error) {
    console.error("There was an issue connecting to the DB", error);
    process.exit(1);
}

fastify.get("/", async (req, res) => {
    return "hello world";
});

try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
