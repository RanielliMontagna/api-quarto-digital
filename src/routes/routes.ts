import { Router } from "express";
import { produtosRouter } from "./produtos.routes";
import { servicosRouter } from "./servicos.routes";
import { usuariosRouter } from "./usuarios.routes";
import { authenticationRouter } from "./authentication.routes";
import { JwtMiddleware } from "../middlewares/jwt";

const routes = Router();

routes.use("/", authenticationRouter);

// Filtro de autenticação
routes.use(JwtMiddleware);

routes.use("/produtos", produtosRouter);
routes.use("/servicos", servicosRouter);
routes.use("/usuarios", usuariosRouter);

export { routes };
