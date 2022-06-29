import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarProdutosController {
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

    // Endpoint para listar todos os produtos
    const produto = await prismaClient.produto
      .findMany({
        where: {
          usuarioId: id,
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
        //Retornar erro caso os produtos não sejam listados
        throw new Error("Ocorreu um erro ao listar os produtos");
      });

    return response.json(produto);
  }
}
