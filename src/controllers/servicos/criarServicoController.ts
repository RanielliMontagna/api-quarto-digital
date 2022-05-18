import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

export class CriarServicoController {
  async handle(request: Request<Servico>, response: Response) {
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
