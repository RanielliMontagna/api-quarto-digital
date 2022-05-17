import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class CriarServicoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;

    const servico = await prismaClient.servico.create({
      data: {
        nome,
        preco,
      },
    });

    return response.json(servico);
  }
}
