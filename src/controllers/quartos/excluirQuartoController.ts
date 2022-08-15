import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class ExcluirQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o quarto no banco de dados
    await prismaClient.quarto
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o quarto não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o quarto.");
        }
      });

    return response.status(200).json();
  }
}
