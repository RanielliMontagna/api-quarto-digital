import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarProdutosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);

    const produto = await prismaClient.produto
      .findMany({
        where: {
          usuarioId: id,
        },
        select: {
          id: true,
          nome: true,
          preco: true,
        },
      })
      .catch(() => {
        //Retornar erro caso os produtos não sejam listados
        throw new Error("Ocorreu um erro ao listar os produtos");
      });

    return response.json(produto);
  }
}
