import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import { isInteger } from "../../utils/validations";

export class AlterarStatusQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Verifica se o status é um número inteiro
    //TODO: fazer validação e criação dos status do quarto
    isInteger({ value: status, nome: "status" });

    const quarto = await prismaClient.quarto
      .update({
        data: {
          status,
        },
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch((error) => {
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Erro ao atualizar o status do quarto.");
        }
      });

    return response.json(quarto);
  }
}
