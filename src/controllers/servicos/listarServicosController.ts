import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ListarServicosController {
  async handle(_: Request, response: Response) {
    const servico = await prismaClient.servico.findMany();

    return response.json(servico);
  }
}
