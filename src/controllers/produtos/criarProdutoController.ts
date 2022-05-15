import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class CriarProdutoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;

    const produto = await prismaClient.produto.create({
      data: {
        nome,
        preco,
      },
    });

    return response.json(produto);
  }
}
