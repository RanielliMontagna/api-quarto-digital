import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

export class ExcluirProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id } = request.params;

    await prismaClient.produto.delete({
      where: {
        id: Number(id),
      },
    });

    return response.status(200).json();
  }
}
