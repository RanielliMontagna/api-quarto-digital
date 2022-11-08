import { Request, Response } from "express";

import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarHospedagensController {
  async handle(request: Request, response: Response) {
    const hospedagemRepository = new HospedagemRepository();

    // Pega o id do usuário
    const token = useTokenDecoded(request);

    // Busca as hospedagens no banco de dados
    const hospedagens = await hospedagemRepository.listarHospedagens();

    // Retorna as hospedagens
    return response.json(hospedagens);
  }
}
