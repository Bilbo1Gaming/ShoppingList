import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { UserSchema, UserUpdateSchema } from "../schema/user";
import type { User } from "../schema/user";
import { getUserData } from "../utils/auth";

console.log("Loaded /user");

export default function routes(fastify: FastifyInstance, opts: any, done: any) {
    fastify.post("/update", { preHandler: [getUserData] }, async (req, res) => {
        console.log(req.body);
        const data = UserUpdateSchema.safeParse(req.body);
        return res.send("test");
    });
    done();
}
