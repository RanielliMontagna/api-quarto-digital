import { Router } from "express";
import cors from "cors";

import { quartosRouter } from "./quartos.routes";
import { produtosRouter } from "./produtos.routes";
import { servicosRouter } from "./servicos.routes";
import { usuariosRouter } from "./usuarios.routes";
import { clientesRouter } from "./clientes.routes";
import { hospedagemRouter } from "./hospedagem.routes";
import { cnpjRouter } from "./external.routes";

import { authenticationRouter } from "./authentication.routes";
import { JwtMiddleware } from "../middlewares/jwt";
import { CheckHealthController } from "../controllers/health/checkHealthController";
import { IndicadoresController } from "../controllers/indicadores/indicadoreSController";

const routes = Router();
const checkHealth = new CheckHealthController();
const indicadores = new IndicadoresController();

// Liberar origens das requisições
routes.use(cors({ origin: "*" }));

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

/**
 * @openapi
 * /indicadores:
 *  get:
 *   tags: [Indicadores]
 *   description: Retorna os indicadores do sistema.
 *   summary: Retorna os indicadores do sistema.
 *   responses:
 *    200:
 *     description: Retorna os indicadores do sistema.
 */
routes.get("/indicadores", indicadores.handle);

// Endpoints de autenticação
routes.use("/", authenticationRouter);

// Filtro de autenticação
routes.use(JwtMiddleware);

// Restante dos endpoints
routes.use("/quartos", quartosRouter);
routes.use("/produtos", produtosRouter);
routes.use("/servicos", servicosRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/clientes", clientesRouter);
routes.use("/hospedagem", hospedagemRouter);
routes.use("/", cnpjRouter);

export { routes };
