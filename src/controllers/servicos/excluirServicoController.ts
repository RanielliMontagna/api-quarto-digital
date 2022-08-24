import { Request, Response } from "express";

import { isInteger } from "../../utils/validations";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class ExcluirServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const servicosRepository = new ServicosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: Number(id), nome: "código" });

    // Exclui o serviço no banco de dados
    await servicosRepository.deletarServico({ id: Number(id) });

    return response.status(200).json();
  }
}
