import { Request, Response } from "express";

import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

import useTokenDecoded from "../../utils/useTokenDecoded";
import {
  campoObrigatorio,
  composeValidator,
  isInteger,
} from "../../utils/validations";

export class AdicionarServicoHospedagemController {
  async handle(request: Request, response: Response) {
    // Pega o id do usuário
    const token = useTokenDecoded(request);

    // Busca os dados da requisição
    const { codigoHospedagem, codigoServico, quantidade } = request.body;

    const servicosRepository = new ServicosRepository();
    const hospedagemRepository = new HospedagemRepository();

    // Validações no campo codigoHospedagem
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoHospedagem,
      nome: "codigoHospedagem",
    });

    // Validações no campo codigoServico
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoServico,
      nome: "codigoServico",
    });

    // Validações no campo quantidade
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: quantidade,
      nome: "quantidade",
    });

    // Buscar informações do serviço
    const servico = await servicosRepository.buscarServico({
      id: codigoServico,
      usuarioId: token.id,
    });

    if (!servico) {
      throw new Error("Servico não encontrado");
    }

    // Buscar informações da hospedagem
    const hospedagem = await hospedagemRepository.buscarHospedagem({
      codigoHospedagem,
      codigoUsuario: Number(token.id),
    });

    if (!hospedagem) {
      throw new Error("Hospedagem não encontrada");
    }

    // Adiciona o servico na hospedagem
    await hospedagemRepository.adicionarServicoHospedagem({
      codigoHospedagem,
      codigoUsuario: Number(token.id),
      servico: {
        codigo: servico.id,
        nome: servico.nome,
        preco: servico.preco,
      },
      quantidade,
    });

    return response.status(200).json({
      message: "Servico adicionado com sucesso",
    });
  }
}
