import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";

export class BuscarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o produto no banco de dados
    const produto = await prismaClient.produto
      .findFirst({
        where: {
          id: Number(id),
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o produto.");
      });

    // Erro caso o produto não seja encontrado
    campoNaoEncontrado({ value: produto, nome: "produto" });

    return response.json(produto);
  }
}
