import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";
import CustomerModel from "../repositories/customer/repository/sequelize/customer.model";
import ProductModel from "../repositories/product/repository/sequelize/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel]);
  sequelize.addModels([ProductModel]);
  await sequelize.sync();
}
setupDb();
