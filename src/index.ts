import Fastify from "fastify";
import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const fastify: FastifyInstance = Fastify({
    logger: true,
});

import { z } from "zod";

import db from "./utils/db";

db.exec("PRAGMA journal_mode = WAL;");
console.log(db.query("SELECT $message").all({ message: "Hello from DB" }));

import { isAuth } from "./utils/auth";

fastify.get("/", { preHandler: [isAuth] }, async (req, res) => {
    console.log("Request");
    console.log(req.user);
    return "hello world";
});

try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
