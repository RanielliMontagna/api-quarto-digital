import { Router } from "express";

import { LoginController } from "../controllers/authentication/loginController";
import { RegisterController } from "../controllers/authentication/registerController";

const authenticationRouter = Router();

const login = new LoginController();
const register = new RegisterController();

authenticationRouter.post("/login", login.handle);
authenticationRouter.post("/register", register.handle);

export { authenticationRouter };
