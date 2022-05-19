import { Request, Response } from "express";
import { Servico } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";

export class ExcluirServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o serviço no banco de dados
    const servico = await prismaClient.servico.delete({
      where: {
        id: Number(id),
      },
    });

    //Retorna erro caso o serviço não seja excluído
    if (!servico) throw new Error("Ocorreu um erro ao excluir o serviço");

    return response.status(200).json();
  }
}
