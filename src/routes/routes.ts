import { Router } from "express";

import { produtosRouter } from "./produtos.routes";
import { servicosRouter } from "./servicos.routes";
import { usuariosRouter } from "./usuarios.routes";
import { clientesRouter } from "./clientes.routes";

import { authenticationRouter } from "./authentication.routes";
import { JwtMiddleware } from "../middlewares/jwt";
import { CheckHealthController } from "../controllers/health/checkHealthController";

const routes = Router();
const checkHealth = new CheckHealthController();

/**
 * @openapi
 * /:
 *   get:
 *     tags: [HealthCheck]
 *     description: Testa a conectividade com o servidor.
 *     summary: Retorna o status do servidor.
 *     responses:
 *       200:
 *         description: Retorna o status do servidor.
 */
routes.get("/", checkHealth.handle);

// Endpoints de autenticação
routes.use("/", authenticationRouter);

// Filtro de autenticação
routes.use(JwtMiddleware);

// Restante dos endpoints
routes.use("/produtos", produtosRouter);
routes.use("/servicos", servicosRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/clientes", clientesRouter);

export { routes };
