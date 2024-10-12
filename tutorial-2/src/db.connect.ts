import { DataSource } from "typeorm";

async function connectDB() {
    const source = new DataSource({
        type: "postgres",
        username: "postgres",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "graphql-db",
        logging: false,
        schema: "public",
        entities : ["src/entities/*{.ts,.js}"],
        synchronize : true
    });

    try {
        await source.initialize();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }

    return source;
}

export default connectDB;
