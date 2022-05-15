import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class EditarProdutoController {
  async handle(request: Request, response: Response) {
    const { id, nome, preco } = request.body;

    const produto = await prismaClient.produto.update({
      data: {
        nome,
        preco,
      },
      where: {
        id,
      },
    });

    return response.json(produto);
  }
}
