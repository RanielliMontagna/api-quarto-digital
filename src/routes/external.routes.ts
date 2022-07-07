import { Router } from "express";
import { CnpjController } from "../services/cnpj/cnpjController";

const cnpjRouter = Router();

const buscarCnpj = new CnpjController();

/**
 * @openapi
 * /cnpj/{cnpj}:
 *   get:
 *     tags: [Geral]
 *     description: Retorna informações do CNPJ informado.
 *     summary: Retorna informações do CNPJ informado.
 *     responses:
 *       200:
 *         description: Retorna informações do CNPJ informado.
 */
cnpjRouter.get("/cnpj/:cnpj", buscarCnpj.handle);

export { cnpjRouter };
