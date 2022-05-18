import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

export class EditarServicoController {
  async handle(request: Request<Servico>, response: Response) {
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
