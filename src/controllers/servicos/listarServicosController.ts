import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarServicosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);

    const servico = await prismaClient.servico
      .findMany({
        where: {
          id: Number(id),
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os serviços não sejam listados
        throw new Error("Ocorreu um erro ao listar os serviços");
      });

    return response.json(servico);
  }
}
