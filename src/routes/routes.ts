import { Router } from "express";
import { produtosRouter } from "./produtos.routes";
import { servicosRouter } from "./servicos.routes";
import { usuariosRouter } from "./usuarios.routes";
import { authenticationRouter } from "./authentication.routes";

const routes = Router();

routes.use("/produtos", produtosRouter);
routes.use("/servicos", servicosRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/", authenticationRouter);

export { routes };
