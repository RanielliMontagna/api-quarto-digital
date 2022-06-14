import { Router } from "express";

import { BuscarClienteController } from "../controllers/clientes/buscarClienteController";
import { CriarClienteController } from "../controllers/clientes/criarClienteController";
import { EditarClienteController } from "../controllers/clientes/editarClienteController";
import { ExcluirClienteController } from "../controllers/clientes/excluirClienteController";
import { ListarClientesController } from "../controllers/clientes/listarClientesController";

const clientesRouter = Router();

const criarCliente = new CriarClienteController();
const buscarCliente = new BuscarClienteController();
const listarCliente = new ListarClientesController();
const excluirCliente = new ExcluirClienteController();
const editarCliente = new EditarClienteController();

/**
 * @openapi
 * /clientes:
 *   get:
 *     tags: [Clientes]
 *     description: Retorna os clientes cadastrados referente ao usuário logado.
 *     summary: Retorna os clientes cadastrados.
 *     responses:
 *       200:
 *         description: Retorna os clientes cadastrados.
 */
clientesRouter.get("/", listarCliente.handle);

/**
 * @openapi
 * /clientes/{id}:
 *   get:
 *     tags: [Clientes]
 *     description: Retorna os clientes cadastrados referente ao usuário logado.
 *     summary: Retorna os clientes cadastrados com o id especificado.
 *     responses:
 *       200:
 *         description: Retorna o produto cadastrado com o id especificado.
 */
clientesRouter.get("/:id", buscarCliente.handle);

/**
 * @openapi
 * /clientes:
 *   post:
 *     tags: [Clientes]
 *     description: Insere um novo produto referente ao usuário logado.
 *     summary: Insere um novo produto.
 *     responses:
 *       200:
 *         description: Retorna o produto inserido.
 */
clientesRouter.post("/", criarCliente.handle);

/**
 * @openapi
 * /clientes/{id}:
 *   delete:
 *     tags: [Clientes]
 *     description: Faz a exclusão do produto referente ao usuário logado.
 *     summary: Faz a exclusão do produto.
 *     responses:
 *       200:
 *         description: Retorna o produto excluído.
 */
clientesRouter.delete("/:id", excluirCliente.handle);

/**
 * @openapi
 * /clientes:
 *   put:
 *     tags: [Clientes]
 *     description: Faz a edição dos clientes cadastrados referente ao usuário logado.
 *     summary: Faz a edição de um produto.
 *     responses:
 *       200:
 *         description: Retorna o produto editado.
 */
clientesRouter.put("/", editarCliente.handle);

export { clientesRouter };
