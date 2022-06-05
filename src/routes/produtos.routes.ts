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

produtosRouter.get("/", JwtMiddleware, listarProduto.handle);
produtosRouter.get("/:id", JwtMiddleware, buscarProduto.handle);
produtosRouter.post("/", JwtMiddleware, criarProduto.handle);
produtosRouter.delete("/:id", JwtMiddleware, excluirProduto.handle);
produtosRouter.put("/", JwtMiddleware, editarProduto.handle);

export { produtosRouter };
