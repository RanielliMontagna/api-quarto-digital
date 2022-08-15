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
import useTokenDecoded from "../../utils/useTokenDecoded";

export class CriarQuartoController {
  async handle(request: Request, response: Response) {
    const { identificacao, diaria } = request.body;
    const { id } = useTokenDecoded(request);

    // Validações no campo identificacao
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: identificacao,
      nome: "identificacao",
    });

    // Validações no campo diaria
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: diaria,
      nome: "diaria",
    });

    // Cria o quarto no banco de dados
    const quarto = await prismaClient.quarto
      .create({
        data: {
          identificacao,
          diaria,
          status: 0,
          usuarioId: Number(id),
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch(() => {
        //Retorna erro caso o quarto não seja criado
        throw new Error("Ocorreu um erro ao criar o quarto.");
      });

    return response.json(quarto);
  }
}
