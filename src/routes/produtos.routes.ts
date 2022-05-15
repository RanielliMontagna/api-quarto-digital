import { Router } from "express";

import { BuscarProdutoController } from "../controllers/produtos/buscarProdutoController";
import { CriarProdutoController } from "../controllers/produtos/criarProdutoController";
import { EditarProdutoController } from "../controllers/produtos/editarProdutoController";
import { ExcluirProdutoController } from "../controllers/produtos/excluirProdutoController";
import { ListarProdutosController } from "../controllers/produtos/listarProdutosController";

const produtosRouter = Router();

const criarProduto = new CriarProdutoController();
const buscarProduto = new BuscarProdutoController();
const listarProduto = new ListarProdutosController();
const excluirProduto = new ExcluirProdutoController();
const editarProduto = new EditarProdutoController();

produtosRouter.get("/", listarProduto.handle);
produtosRouter.get("/:id", buscarProduto.handle);
produtosRouter.post("/", criarProduto.handle);
produtosRouter.delete("/:id", excluirProduto.handle);
produtosRouter.put("/", editarProduto.handle);

export { produtosRouter };
