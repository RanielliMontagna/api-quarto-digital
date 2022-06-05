import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";

export class BuscarServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o serviço no banco de dados
    const servico = await prismaClient.servico
      .findFirst({
        where: {
          id: Number(id),
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o serviço.");
      });

    // Erro caso o serviço não seja encontrado
    campoNaoEncontrado({ value: servico, nome: "serviço" });

    return response.json(servico);
  }
}
