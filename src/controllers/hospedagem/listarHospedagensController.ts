import { Request, Response } from "express";

import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarHospedagensController {
  async handle(request: Request, response: Response) {
    const hospedagemRepository = new HospedagemRepository();

    // Pega o id do usuário e os parâmetros da query
    const token = useTokenDecoded(request);
    const { query } = request;

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        Cliente: {
          nome: {
            contains: String(query?.search),
            mode: "insensitive",
          },
        },
      };
    }

    // Busca as hospedagens no banco de dados
    const hospedagens = await hospedagemRepository.listarHospedagens({
      usuarioId: token.id,
      params,
    });

    // Retorna as hospedagens
    return response.json(hospedagens);
  }
}
