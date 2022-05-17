import { Router } from "express";
import { produtosRouter } from "./produtos.routes";
import { servicosRouter } from "./servicos.routes";

const routes = Router();

routes.use("/produtos", produtosRouter);
routes.use("/servicos", servicosRouter);

export { routes };
