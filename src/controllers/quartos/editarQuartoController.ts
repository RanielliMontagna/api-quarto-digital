import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max99999,
  min0,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class EditarQuartoController {
  async handle(request: Request, response: Response) {
    const { id, identificacao, diaria } = request.body;

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

    // Validações no campo identificacao
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: identificacao,
      nome: "identificacao",
    });

    // Validações no campo diaria
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: diaria,
      nome: "diaria",
    });

    // Edita o quarto no banco de dados
    const quarto = await prismaClient?.quarto
      ?.update({
        data: {
          identificacao,
          diaria,
          alteradoEm: new Date(),
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
        where: {
          id,
        },
      })
      .catch((error) => {
        //Retorna erro caso o quarto não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Erro ao editar quarto.");
        }
      });

    return response.json(quarto);
  }
}
