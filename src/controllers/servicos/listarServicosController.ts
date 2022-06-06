import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ListarServicosController {
  async handle(_: Request, response: Response) {
    const servico = await prismaClient.servico.findMany().catch(() => {
      //Retornar erro caso os serviços não sejam listados
      throw new Error("Ocorreu um erro ao listar os serviços");
    });

    return response.json(servico);
  }
}
