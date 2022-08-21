import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class BuscarServicoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    const servicosRepository = new ServicosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o serviço no banco de dados
    const servico = await servicosRepository.buscarServico({
      id: Number(id),
      usuarioId: Number(token.id),
    });

    // Erro caso o serviço não seja encontrado
    campoNaoEncontrado({ value: servico, nome: "serviço" });

    return response.json(servico);
  }
}
