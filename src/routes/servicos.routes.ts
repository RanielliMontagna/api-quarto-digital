import { Router } from "express";

import { BuscarServicoController } from "../controllers/servicos/buscarServicoController";
import { CriarServicoController } from "../controllers/servicos/criarServicoController";
import { EditarServicoController } from "../controllers/servicos/editarServicoController";
import { ExcluirServicoController } from "../controllers/servicos/excluirServicoController";
import { ListarServicosController } from "../controllers/servicos/listarServicosController";
import { JwtMiddleware } from "../middlewares/jwt";

const servicosRouter = Router();

const criarServico = new CriarServicoController();
const buscarServico = new BuscarServicoController();
const listarServico = new ListarServicosController();
const excluirServico = new ExcluirServicoController();
const editarServico = new EditarServicoController();

/**
 * @openapi
 * /servicos:
 *   get:
 *     tags: [Serviços]
 *     description: Retorna os serviços cadastrados referente ao usuário logado.
 *     summary: Retorna os serviços cadastrados.
 *     responses:
 *       200:
 *         description: Retorna os serviços cadastrados.
 */
servicosRouter.get("/", JwtMiddleware, listarServico.handle);

/**
 * @openapi
 * /servicos/{id}:
 *   get:
 *     tags: [Serviços]
 *     description: Retorna os serviços cadastrados referente ao usuário logado.
 *     summary: Retorna os serviços cadastrados com o id especificado.
 *     responses:
 *       200:
 *         description: Retorna o serviço cadastrado com o id especificado.
 */
servicosRouter.get("/:id", JwtMiddleware, buscarServico.handle);

/**
 * @openapi
 * /servicos:
 *   post:
 *     tags: [Serviços]
 *     description: Insere um novo serviço referente ao usuário logado.
 *     summary: Insere um novo serviço.
 *     responses:
 *       200:
 *         description: Retorna o serviço inserido.
 */
servicosRouter.post("/", JwtMiddleware, criarServico.handle);

/**
 * @openapi
 * /servicos/{id}:
 *   delete:
 *     tags: [Serviços]
 *     description: Faz a exclusão do serviço referente ao usuário logado.
 *     summary: Faz a exclusão do serviço.
 *     responses:
 *       200:
 *         description: Retorna o serviço excluído.
 */
servicosRouter.delete("/:id", JwtMiddleware, excluirServico.handle);

/**
 * @openapi
 * /servicos:
 *   put:
 *     tags: [Serviços]
 *     description: Faz a edição dos servicos cadastrados referente ao usuário logado.
 *     summary: Faz a edição de um serviço.
 *     responses:
 *       200:
 *         description: Retorna o serviço editado.
 */
servicosRouter.put("/", JwtMiddleware, editarServico.handle);

export { servicosRouter };
