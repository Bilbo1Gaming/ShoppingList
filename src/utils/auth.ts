import db from "../utils/db";

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

export function isAuth(req: any, res: any, next: any) {
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

    let user = db.query(`SELECT * FROM users WHERE email = $email`).get({ email: email });
    if (!user) {
        console.log("New user with email:");
        console.log(email);
    }

    var id = "test";
    var name = "testname";

    console.log("Authenticated");

    req.user = {
        id: id,
        name: name,
        email: email,
        ip: ip,
    };

    next();
}
