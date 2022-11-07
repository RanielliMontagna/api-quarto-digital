import { Request, Response } from "express";

import { FinanceiroRepository } from "../../repositories/financeiro/financeiroRepository";
import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";

import { composeValidator } from "./../../utils/validations/composeValidator";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { campoObrigatorio, isInteger, isNumber } from "../../utils/validations";

export class CheckoutHospedagemController {
  async handle(request: Request, response: Response) {
    const hospedagemRepository = new HospedagemRepository();
    const financeiroRepository = new FinanceiroRepository();

    // Pega o id do usuário
    const token = useTokenDecoded(request);

    // Código da hospedagem
    const { codigoHospedagem, valor } = request.body;

    // Validações no campo codigoHospedagem
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: Number(codigoHospedagem),
      nome: "codigoHospedagem",
    });

    // Validações no campo valor
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: Number(valor),
      nome: "valor",
    });

    // Alterar status da hospedagem para 1 (finalizada)
    await hospedagemRepository.alterarStatusHospedagem({
      codigoHospedagem: Number(codigoHospedagem),
      status: 1,
    });

    // Adiciona ao financeiro o valor referente a hospedagem
    await financeiroRepository.criarFinanceiro({
      tipo: 0,
      valor: Number(valor),
      hospedagemId: Number(codigoHospedagem),
      usuarioId: token.id,
    });

    return response.status(200).json({
      message: "Checkout realizado com sucesso!",
    });
  }
}
