import { Router } from "express";

import { LoginController } from "../controllers/authentication/loginController";
import { LogoutController } from "../controllers/authentication/logoutController";
import { RegisterController } from "../controllers/authentication/registerController";
import { JwtMiddleware } from "../middlewares/jwt";

const authenticationRouter = Router();

const login = new LoginController();
const register = new RegisterController();
const logout = new LogoutController();

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

export { authenticationRouter };
