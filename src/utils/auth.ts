import type { User } from "../schema/user";
import db from "../utils/db";

import { v4 as uuidv4 } from "uuid";

const jwt = require("jsonwebtoken");

export function signJWT(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "3h",
        issuer: process.env.JWT_ISSUER,
    });
}

export function verifyJWT(data: any) {
    try {
        var decoded = jwt.verify(data, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
        });
        return decoded;
    } catch (err) {
        return;
    }
}

export function getUserData(req: any, res: any, next: any) {
    const email = req.headers["cf-access-authenticated-user-email"];
    const ip = req.headers["cf-connecting-ip"];

    if (!email && !ip) {
        console.log("User auth failed");
        return res.code(401).send();
    }

    console.log("Authenticating....");
    console.log(email);
    console.log(ip);

    // Check if user already exists in DB

    let user: Partial<User> = db.query(`SELECT * FROM users WHERE email = $email`).get({ email: email })!;
    if (!user) {
        console.log("Made New user with id:");
        const uuid = uuidv4();
        console.log(uuid);
        user = {
            id: uuid,
            name: email,
            email: email,
        };
        db.query(`INSERT INTO users (id, name, email) VALUES ($id, $name, $email) `).run(user);
    }

    console.log("Authenticated");

    user.ip = ip;
    req.user = user;

    next();
}
