import { Request, Response } from "express";
import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";

import useTokenDecoded from "../../utils/useTokenDecoded";
import {
  campoObrigatorio,
  composeValidator,
  isInteger,
} from "../../utils/validations";

export class AlterarStatusHospedagemController {
  async handle(request: Request, response: Response) {
    // Pega o id do usuário
    const token = useTokenDecoded(request);

    // Busca os dados da requisição
    const { codigoHospedagem, status } = request.body;

    const hospedagemRepository = new HospedagemRepository();

    // Validações no campo codigoHospedagem
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoHospedagem,
      nome: "codigoHospedagem",
    });

    // Validações no campo status
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: status,
      nome: "status",
    });

    // Buscar informações da hospedagem
    const hospedagem = await hospedagemRepository.buscarHospedagem({
      codigoHospedagem,
      codigoUsuario: Number(token.id),
    });

    if (!hospedagem) {
      throw new Error("Hospedagem não encontrada");
    }

    // Alterar status da hospedagem
    await hospedagemRepository.alterarStatusHospedagem({
      codigoHospedagem,
      status,
    });

    return response.status(200).json({
      message: "Status da hospedagem alterado com sucesso",
    });
  }
}
