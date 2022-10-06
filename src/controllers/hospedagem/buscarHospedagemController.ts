import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";
import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";

export class BuscarHospedagemController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    // Verifica se o id é um número inteiro
    isInteger({ value: Number(id), nome: "código" });

    const hospedagemRepository = new HospedagemRepository();

    // Busca a hospedagem no banco de dados
    const hospedagem = await hospedagemRepository.buscarHospedagem({
      codigoHospedagem: Number(id),
      codigoUsuario: Number(token.id),
    });

    // Erro caso a hospedagem não seja encontrada
    campoNaoEncontrado({ value: hospedagem, nome: "hospedagem" });

    return response.json(hospedagem);
  }
}
