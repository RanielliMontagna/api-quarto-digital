import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

export class BuscarQuartoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    const quartoRepository = new QuartosRepository();

    // Busca o quarto no banco de dados
    const quarto = await quartoRepository.buscarQuarto({
      id: Number(id),
      usuarioId: Number(token.id),
    });

    // Erro caso o quarto não seja encontrado
    campoNaoEncontrado({ value: quarto, nome: "quarto" });

    return response.json(quarto);
  }
}
