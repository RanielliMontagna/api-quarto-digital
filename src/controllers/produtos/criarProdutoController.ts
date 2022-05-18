import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

export class CriarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
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
