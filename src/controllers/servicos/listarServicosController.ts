import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarServicosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);
    const { query } = request;

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        nome: {
          contains: String(query?.search),
          mode: "insensitive",
        },
      };
    }

    const servicos = await prismaClient.servico
      .findMany({
        where: {
          usuarioId: Number(id),
          ...params,
        },
        select: {
          id: true,
          nome: true,
          preco: true,
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os serviços não sejam listados
        throw new Error("Ocorreu um erro ao listar os serviços");
      });

    return response.json(servicos);
  }
}
