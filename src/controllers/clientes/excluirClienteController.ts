import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class ExcluirClienteController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o cliente no banco de dados
    await prismaClient.cliente
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o cliente não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Cliente não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o cliente.");
        }
      });

    return response.status(200).json();
  }
}
