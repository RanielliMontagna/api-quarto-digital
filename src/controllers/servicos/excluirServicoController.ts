import { Request, Response } from "express";
import { Servico } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class ExcluirServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o serviço no banco de dados
    await prismaClient.servico
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o serviço não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Serviço não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o serviço.");
        }
      });

    return response.status(200).json();
  }
}
