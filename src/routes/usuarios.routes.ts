import { Router } from "express";

import { ListarUsuariosController } from "../controllers/usuarios/listarUsuariosController";
import { CriarUsuarioController } from "../controllers/usuarios/criarUsuarioController";
import { ExcluirUsuarioController } from "../controllers/usuarios/excluirUsuarioController";
import { BuscarUsuarioController } from "../controllers/usuarios/buscarUsuarioController";
import { EditarUsuarioController } from "../controllers/usuarios/editarUsuarioController";
import { JwtMiddleware } from "../middlewares/jwt";

const usuariosRouter = Router();

const listarUsuarios = new ListarUsuariosController();
const buscarUsuario = new BuscarUsuarioController();
const criarUsuario = new CriarUsuarioController();
const excluirUsuario = new ExcluirUsuarioController();
const editarUsuario = new EditarUsuarioController();

usuariosRouter.get("/", JwtMiddleware, listarUsuarios.handle);
usuariosRouter.get("/:id", JwtMiddleware, buscarUsuario.handle);
usuariosRouter.post("/", JwtMiddleware, criarUsuario.handle);
usuariosRouter.delete("/:id", JwtMiddleware, excluirUsuario.handle);
usuariosRouter.put("/", JwtMiddleware, editarUsuario.handle);

export { usuariosRouter };
