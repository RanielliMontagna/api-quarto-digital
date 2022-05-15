import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ListarProdutosController {
  async handle(_: Request, response: Response) {
    const produto = await prismaClient.produto.findMany();

    return response.json(produto);
  }
}
