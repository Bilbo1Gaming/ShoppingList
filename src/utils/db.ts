import { Database } from "bun:sqlite";

function initializeDatabase() {
    try {
        const db = new Database("./persist/db.sqlite", {
            create: true,
            strict: true,
            readwrite: true,
            readonly: false,
        });
        console.log("Database connected successfully");
        return db;
    } catch (error) {
        console.error("There was an issue connecting to the DB", error);
        process.exit(1);
    }
}

const db = initializeDatabase();
console.log("DB intialised");

export default db;
