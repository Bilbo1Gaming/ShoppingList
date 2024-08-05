import type { FastifyRequest } from "fastify";

const jwt = require("jsonwebtoken");

function signJWT(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "3h",
        issuer: process.env.JWT_ISSUER,
    });
}

function verifyJWT(data: any) {
    try {
        var decoded = jwt.verify(data, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
        });
        return decoded;
    } catch (err) {
        return;
    }
}

function isAuth(req: any, res: any, next: any) {
    var token = req.cookies["authorisation"];

    if (!token && !Mtoken) {
        console.log("Player auth failed. no token");
        return res.redirect("/auth");
    }

    let decoded = verifyJWT(token);
    let Mdecoded = verifyJWT(Mtoken);

    if (!decoded && !Mdecoded) {
        console.log("Player auth failed. not valid JWT");
        return res.redirect("/auth");
    }

    try {
        var player = Player.find({ _id: decoded.id })[0];
    } catch (error) {
        player = {};
    }

    try {
        var manager = Manager.find({ _id: Mdecoded.id })[0];
    } catch (error) {
        manager = {};
    }

    if (!player && !manager) {
        console.log("Player auth failed. no player");
        return res.redirect("/auth");
    } else {
        if (player["jwt"] == token) {
            next();
        } else if (manager["jwt"] == Mtoken) {
            next();
        } else {
            console.log("Player auth failed. player JWT not match");
            return res.redirect("/auth");
        }
    }
}
