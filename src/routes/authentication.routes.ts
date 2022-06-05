import { Router } from "express";

import { LoginController } from "../controllers/authentication/loginController";
import { LogoutController } from "../controllers/authentication/logoutController";
import { RegisterController } from "../controllers/authentication/registerController";
import { JwtMiddleware } from "../middlewares/jwt";

const authenticationRouter = Router();

const login = new LoginController();
const register = new RegisterController();
const logout = new LogoutController();

authenticationRouter.post("/login", login.handle);
authenticationRouter.post("/register", register.handle);
authenticationRouter.get("/logout", JwtMiddleware, logout.handle);

export { authenticationRouter };
