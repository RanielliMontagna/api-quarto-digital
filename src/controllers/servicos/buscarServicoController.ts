import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";

export class BuscarServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o serviço no banco de dados
    const servico = await prismaClient.servico.findFirst({
      where: {
        id: Number(id),
      },
    });

    // Erro caso o serviço não seja encontrado
    campoNaoEncontrado({ value: servico, nome: "serviço" });

    return response.json(servico);
  }
}
