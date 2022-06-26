import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class BuscarProdutoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o produto no banco de dados
    const produto = await prismaClient.produto
      .findFirst({
        where: {
          id: Number(id),
          usuarioId: token.id,
        },
        select: {
          id: true,
          nome: true,
          preco: true,
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o produto.");
      });

    // Erro caso o produto não seja encontrado
    campoNaoEncontrado({ value: produto, nome: "produto" });

    return response.json();
  }
}
