import { Router } from "express";

import { BuscarQuartoController } from "../controllers/quartos/buscarQuartoController";
import { CriarQuartoController } from "../controllers/quartos/criarQuartoController";
import { EditarQuartoController } from "../controllers/quartos/editarQuartoController";
import { ExcluirQuartoController } from "../controllers/quartos/excluirQuartoController";
import { ListarQuartosController } from "../controllers/quartos/listarQuartosController";
import { AlterarStatusQuartoController } from "../controllers/quartos/alterarStatusQuartoController";

const quartosRouter = Router();

const criarQuarto = new CriarQuartoController();
const buscarQuarto = new BuscarQuartoController();
const listarQuarto = new ListarQuartosController();
const excluirQuarto = new ExcluirQuartoController();
const editarQuarto = new EditarQuartoController();
const alterarStatusQuarto = new AlterarStatusQuartoController();

/**
 * @openapi
 * /quartos:
 *   get:
 *     tags: [Quartos]
 *     description: Retorna os quartos cadastrados referente ao usuário logado.
 *     summary: Retorna os quartos cadastrados.
 *     responses:
 *       200:
 *        description: Retorna os quartos cadastrados.
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            data:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                id:
 *                 type: integer
 *                 description: O id do quarto.
 *                 example: 1
 *                identificacao:
 *                 type: number
 *                 description: A identificação do quarto.
 *                 example: 301
 *                diaria:
 *                  type: number
 *                  description: A diária do quarto.
 *                  example: 100.00
 *                status:
 *                  type: integer
 *                  description: O status do quarto.
 *                  example: 1
 *                  enum:
 *                  - 0 - Disponível
 *                  - 1 - Ocupado
 *                  - 2 - Em limpeza/manutenção
 */
quartosRouter.get("/", listarQuarto.handle);

/**
 * @openapi
 * /quartos/{id}:
 *   get:
 *     tags: [Quartos]
 *     description: Retorna os quartos cadastrados referente ao usuário logado.
 *     summary: Retorna os quartos cadastrados com o id especificado.
 *     responses:
 *       200:
 *         description: Retorna o quarto cadastrado com o id especificado.
 */
quartosRouter.get("/:id", buscarQuarto.handle);

/**
 * @openapi
 * /quartos:
 *   post:
 *     tags: [Quartos]
 *     description: Insere um novo quarto referente ao usuário logado.
 *     summary: Insere um novo quarto.
 *     responses:
 *       200:
 *         description: Retorna o quarto inserido.
 */
quartosRouter.post("/", criarQuarto.handle);

/**
 * @openapi
 * /quartos/{id}:
 *   delete:
 *     tags: [Quartos]
 *     description: Faz a exclusão do quarto referente ao usuário logado.
 *     summary: Faz a exclusão do quarto.
 *     responses:
 *       200:
 *         description: Retorna o quarto excluído.
 */
quartosRouter.delete("/:id", excluirQuarto.handle);

/**
 * @openapi
 * /quartos:
 *   put:
 *     tags: [Quartos]
 *     description: Faz a edição dos quartos cadastrados referente ao usuário logado.
 *     summary: Faz a edição de um quarto.
 *     responses:
 *       200:
 *         description: Retorna o quarto editado.
 */
quartosRouter.put("/", editarQuarto.handle);

/**
 * @openapi
 * /quartos/alterar-status/{id}:
 * put:
 *  tags: [Quartos]
 *  description: Altera o status do quarto.
 *  summary: Altera o status do quarto.
 *  responses:
 *      200:
 *          description: Retorna o quarto editado.
 *
 */
quartosRouter.put("/alterar-status/:id", alterarStatusQuarto.handle);

export { quartosRouter };
