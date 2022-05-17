import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ExcluirServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    await prismaClient.servico.delete({
      where: {
        id: Number(id),
      },
    });

    return response.status(200).json();
  }
}
