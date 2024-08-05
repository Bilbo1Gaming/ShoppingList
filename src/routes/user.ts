import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { UserSchema, UserUpdateSchema } from "../schema/user";
import type { User } from "../schema/user";
import { getUserData } from "../utils/auth";
import db from "../utils/db";

console.log("Loaded /user");

export default function routes(fastify: FastifyInstance, opts: any, done: any) {
    fastify.post("/update", { preHandler: [getUserData] }, async (req, res) => {
        console.log("REQ BODY:", req.body);
        console.log("User:", req.user);
        const data = UserUpdateSchema.safeParse(req.body);

        // only continue if the value is true, otherwise return
        if (data.success != true) {
            console.log("Bad Request");
            return res.code(400).send("400: Bad Request\n" + JSON.stringify(data.error.issues, null, 4));
        }

        const update: any = data.data.data;
        if (update.hasOwnProperty("name")) {
            console.log("Updating name");
            db.query(`UPDATE users SET name = $name WHERE id = $id`).get({ name: update["name"], id: req.user.id });
        }
        if (update.hasOwnProperty("email")) {
            console.log("Updating email");
            db.query(`UPDATE users SET email = $email WHERE id = $id`).get({ email: update["email"], id: req.user.id });
        }

        return res.code(200).send({ user: db.query("SELECT * FROM users WHERE id = $id").get({ id: req.user.id }) });
    });
    done();
}
