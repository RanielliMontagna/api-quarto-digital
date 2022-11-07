import type { IAdicionarFinanceiro } from "./financeiroRepository.types";
import { prismaClient } from "../../database/prismaClient";

export class FinanceiroRepository {
  // Implementa nova receita ou despesa no financeiro
  async criarFinanceiro({
    tipo,
    valor,
    descricao,
    hospedagemId,
    usuarioId,
  }: IAdicionarFinanceiro) {
    await prismaClient.financeiro.create({
      data: {
        tipo,
        valor,
        descricao,
        hospedagemId,
        usuarioId,
      },
    });

    return;
  }
}
