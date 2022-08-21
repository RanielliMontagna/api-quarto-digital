import { Request, Response } from "express";

import { isInteger } from "../../utils/validations";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

export class ExcluirQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const quartosRepository = new QuartosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o quarto no banco de dados
    await quartosRepository.deletarQuarto({ id: Number(id) });

    return response.status(200).json();
  }
}
