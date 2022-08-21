import { Request, Response } from "express";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

import { isInteger } from "../../utils/validations";

export class AlterarStatusQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    const quartosRepository = new QuartosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Verifica se o status é um número inteiro
    //TODO: fazer validação e criação dos status do quarto
    isInteger({ value: status, nome: "status" });

    const quarto = await quartosRepository.alterarStatusQuarto({
      id: Number(id),
      status: Number(status),
    });

    return response.json(quarto);
  }
}
