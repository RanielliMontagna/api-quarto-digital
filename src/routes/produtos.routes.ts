import { Router } from "express";

import { BuscarProdutoController } from "../controllers/produtos/buscarProdutoController";
import { CriarProdutoController } from "../controllers/produtos/criarProdutoController";
import { EditarProdutoController } from "../controllers/produtos/editarProdutoController";
import { ExcluirProdutoController } from "../controllers/produtos/excluirProdutoController";
import { ListarProdutosController } from "../controllers/produtos/listarProdutosController";
import { JwtMiddleware } from "../middlewares/jwt";

const produtosRouter = Router();

const criarProduto = new CriarProdutoController();
const buscarProduto = new BuscarProdutoController();
const listarProduto = new ListarProdutosController();
const excluirProduto = new ExcluirProdutoController();
const editarProduto = new EditarProdutoController();

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     description: Retorna os produtos cadastrados referente ao usuário logado.
 *     summary: Retorna os produtos cadastrados.
 *     responses:
 *       200:
 *         description: Retorna os produtos cadastrados.
 */
produtosRouter.get("/", JwtMiddleware, listarProduto.handle);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     description: Retorna os produtos cadastrados referente ao usuário logado.
 *     summary: Retorna os produtos cadastrados com o id especificado.
 *     responses:
 *       200:
 *         description: Retorna o produto cadastrado com o id especificado.
 */
produtosRouter.get("/:id", JwtMiddleware, buscarProduto.handle);

/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     description: Insere um novo produto referente ao usuário logado.
 *     summary: Insere um novo produto.
 *     responses:
 *       200:
 *         description: Retorna o produto inserido.
 */
produtosRouter.post("/", JwtMiddleware, criarProduto.handle);

/**
 * @openapi
 * /produtos/{id}:
 *   delete:
 *     tags: [Produtos]
 *     description: Faz a exclusão do produto referente ao usuário logado.
 *     summary: Faz a exclusão do produto.
 *     responses:
 *       200:
 *         description: Retorna o produto excluído.
 */
produtosRouter.delete("/:id", JwtMiddleware, excluirProduto.handle);

/**
 * @openapi
 * /produtos:
 *   put:
 *     tags: [Produtos]
 *     description: Faz a edição dos produtos cadastrados referente ao usuário logado.
 *     summary: Faz a edição de um produto.
 *     responses:
 *       200:
 *         description: Retorna o produto editado.
 */
produtosRouter.put("/", JwtMiddleware, editarProduto.handle);

export { produtosRouter };
