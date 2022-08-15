import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarQuartosController {
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

    // Endpoint para listar todos os quartos
    const quarto = await prismaClient.quarto
      .findMany({
        where: {
          usuarioId: id,
          ...params,
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
        orderBy: {
          identificacao: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os quartos não sejam listados
        throw new Error("Ocorreu um erro ao listar os quartos");
      });

    return response.json(quarto);
  }
}
