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

servicosRouter.get("/", JwtMiddleware, listarServico.handle);
servicosRouter.get("/:id", JwtMiddleware, buscarServico.handle);
servicosRouter.post("/", JwtMiddleware, criarServico.handle);
servicosRouter.delete("/:id", JwtMiddleware, excluirServico.handle);
servicosRouter.put("/", JwtMiddleware, editarServico.handle);

export { servicosRouter };
