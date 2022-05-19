import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

export class ListarServicosController {
  async handle(_: Request<Servico>, response: Response) {
    const servico = await prismaClient.servico.findMany();

    //Retornar erro caso os serviços não sejam listados
    if (!servico) throw new Error("Ocorreu um erro ao listar os serviços");

    return response.json(servico);
  }
}
