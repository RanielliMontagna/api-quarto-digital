import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class ExcluirServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const servicosRepository = new ServicosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o serviço no banco de dados
    await servicosRepository.deletarServico({ id: Number(id) });

    return response.status(200).json();
  }
}
