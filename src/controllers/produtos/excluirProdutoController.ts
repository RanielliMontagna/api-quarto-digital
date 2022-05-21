import { Request, Response } from "express";
import { Produto } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";

export class ExcluirProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o produto no banco de dados
    await prismaClient.produto
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o produto não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new Error("Produto não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o produto.");
        }
      });

    return response.status(200).json();
  }
}
