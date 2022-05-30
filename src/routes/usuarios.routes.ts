import { Router } from "express";

import { ListarUsuariosController } from "../controllers/usuarios/listarUsuariosController";
import { CriarUsuarioController } from "../controllers/usuarios/criarUsuarioController";
import { ExcluirUsuarioController } from "../controllers/usuarios/excluirUsuarioController";
import { BuscarUsuarioController } from "../controllers/usuarios/buscarUsuarioController";
import { EditarUsuarioController } from "../controllers/usuarios/editarUsuarioController";

const usuariosRouter = Router();

const listarUsuarios = new ListarUsuariosController();
const buscarUsuario = new BuscarUsuarioController();
const criarUsuario = new CriarUsuarioController();
const excluirUsuario = new ExcluirUsuarioController();
const editarUsuario = new EditarUsuarioController();

usuariosRouter.get("/", listarUsuarios.handle);
usuariosRouter.get("/:id", buscarUsuario.handle);
usuariosRouter.post("/", criarUsuario.handle);
usuariosRouter.delete("/:id", excluirUsuario.handle);
usuariosRouter.put("/", editarUsuario.handle);

export { usuariosRouter };
