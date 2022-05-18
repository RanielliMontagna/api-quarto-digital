import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

export class BuscarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id } = request.params;

    const produto = await prismaClient.produto.findFirst({
      where: {
        id: Number(id),
      },
    });

    return response.json(produto);
  }
}
