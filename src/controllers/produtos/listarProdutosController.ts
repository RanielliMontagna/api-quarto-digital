import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

export class ListarProdutosController {
  async handle(_: Request<Produto>, response: Response) {
    const produto = await prismaClient.produto.findMany();

    return response.json(produto);
  }
}
