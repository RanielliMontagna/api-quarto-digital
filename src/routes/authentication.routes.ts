import { Router } from "express";

import { LoginController } from "../controllers/authentication/loginController";
import { LogoutController } from "../controllers/authentication/logoutController";
import { RegisterController } from "../controllers/authentication/registerController";
import { ResetPasswordController } from "../controllers/authentication/resetPasswordController";
import { ChangePasswordController } from "../controllers/authentication/changePasswordController";

import { JwtMiddleware } from "../middlewares/jwt";

const authenticationRouter = Router();

const login = new LoginController();
const register = new RegisterController();
const logout = new LogoutController();
const resetPassword = new ResetPasswordController();
const changePassword = new ChangePasswordController();

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Autenticação]
 *     description: Faz o login do usuário.
 *     summary: Faz o login do usuário.
 *     responses:
 *       200:
 *         description: Retorna o token de autenticação.
 */
authenticationRouter.post("/login", login.handle);

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Autenticação]
 *     description: Faz o registro do usuário.
 *     summary: Faz o registro do usuário.
 *     responses:
 *       200:
 *         description: Retorna o token de autenticação.
 */
authenticationRouter.post("/register", register.handle);

/**
 * @openapi
 * /logout:
 *   get:
 *     tags: [Autenticação]
 *     description: Faz o logout do usuário.
 *     summary: Faz o logout do usuário.
 *     responses:
 *       200:
 *        description:
 */
authenticationRouter.get("/logout", JwtMiddleware, logout.handle);

/**
 * @openapi
 * /reset-password:
 *  post:
 *   tags: [Autenticação]
 *   description: Envia um email para o usuário com um link para resetar a senha.
 *   summary: Envia um email para o usuário com um link para resetar a senha.
 *   responses:
 *     200:
 *       description: Retorna o token de autenticação.
 */
authenticationRouter.post("/resetar-senha", resetPassword.handle);

/**
 * @openapi
 * /change-password:
 *   post:
 *    tags: [Autenticação]
 *    description: Altera a senha do usuário.
 *    summary: Altera a senha do usuário.
 *    responses:
 *     200:
 *      description: Retorna o token de autenticação.
 */
authenticationRouter.post("/alterar-senha", changePassword.handle);

export { authenticationRouter };
