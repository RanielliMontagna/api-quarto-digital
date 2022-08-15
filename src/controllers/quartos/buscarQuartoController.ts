import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class BuscarQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o quarto no banco de dados
    const quarto = await prismaClient.quarto
      .findFirst({
        where: {
          id: Number(id),
          usuarioId: token.id,
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o quarto.");
      });

    // Erro caso o quarto não seja encontrado
    campoNaoEncontrado({ value: quarto, nome: "quarto" });

    return response.json(quarto);
  }
}
