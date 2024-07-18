import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../model/Product.model";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [Product],
    logging:false
});


export default db;
