import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

export class BuscarServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { id } = request.params;

    const servico = await prismaClient.servico.findFirst({
      where: {
        id: Number(id),
      },
    });

    return response.json(servico);
  }
}
