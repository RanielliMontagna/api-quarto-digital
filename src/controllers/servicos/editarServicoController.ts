import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class EditarServicoController {
  async handle(request: Request, response: Response) {
    const { id, nome, preco } = request.body;

    const servico = await prismaClient.servico.update({
      data: {
        nome,
        preco,
      },
      where: {
        id,
      },
    });

    return response.json(servico);
  }
}
