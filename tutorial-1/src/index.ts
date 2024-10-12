import { createConnection } from "typeorm";
import { ClientEntity } from "./entities/client.entities";
import { BankerEntity } from "./entities/banker.entities";
import { TransactionEntity } from "./entities/transactions";

const main = async () => {
    try {
        const connection = await createConnection({
            type: 'postgres',
            username: 'postgres',
            password: 'root',
            host: 'localhost',
            port: 5432,
            database: 'graphql-db',
            schema: 'public',
            entities: [
                ClientEntity,
                BankerEntity,
                TransactionEntity
            ],
            synchronize: true,
        })
        console.log("Database connection established!");
    }
    catch (error) {
        console.error("Error connecting to the database", error);
    }
}
main()