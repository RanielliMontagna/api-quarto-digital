import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

export class ListarServicosController {
  async handle(_: Request<Servico>, response: Response) {
    const servico = await prismaClient.servico.findMany();

    return response.json(servico);
  }
}
