import { Router } from "express";

import { BuscarServicoController } from "../controllers/servicos/buscarServicoController";
import { CriarServicoController } from "../controllers/servicos/criarServicoController";
import { EditarServicoController } from "../controllers/servicos/editarServicoController";
import { ExcluirServicoController } from "../controllers/servicos/excluirServicoController";
import { ListarServicosController } from "../controllers/servicos/listarServicosController";

const servicosRouter = Router();

const criarServico = new CriarServicoController();
const buscarServico = new BuscarServicoController();
const listarServico = new ListarServicosController();
const excluirServico = new ExcluirServicoController();
const editarServico = new EditarServicoController();

servicosRouter.get("/", listarServico.handle);
servicosRouter.get("/:id", buscarServico.handle);
servicosRouter.post("/", criarServico.handle);
servicosRouter.delete("/:id", excluirServico.handle);
servicosRouter.put("/", editarServico.handle);

export { servicosRouter };
