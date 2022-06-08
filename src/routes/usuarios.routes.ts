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

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     description: Lista os usuários que estão cadastrados no sistema.
 *     summary: Lista os usuários que estão cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Retorna a lista de usuários.
 */
usuariosRouter.get("/", listarUsuarios.handle);

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     description: Lista um usuário pelo id informado.
 *     summary: Lista um usuário.
 *     responses:
 *       200:
 *         description: Retorna o usuário.
 */
usuariosRouter.get("/:id", buscarUsuario.handle);

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     description: Cria um novo usuário no sistema.
 *     summary: Cria um novo usuário.
 *     responses:
 *       200:
 *         description: Retorna o usuário.
 */
usuariosRouter.post("/", criarUsuario.handle);

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     description: Exclui um usuário pelo id informado.
 *     summary: Exclui um usuário.
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de sucesso.
 */
usuariosRouter.delete("/:id", excluirUsuario.handle);

/**
 * @openapi
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     description: Edita um usuário pelo id informado.
 *     summary: Edita um usuário.
 *     responses:
 *       200:
 *         description: Retorna o usuário editado.
 */
usuariosRouter.put("/", editarUsuario.handle);

export { usuariosRouter };
