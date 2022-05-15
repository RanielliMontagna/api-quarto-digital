import { Router } from "express";
import { produtosRouter } from "./produtos.routes";

const routes = Router();

routes.use("/produtos", produtosRouter);

export { routes };
