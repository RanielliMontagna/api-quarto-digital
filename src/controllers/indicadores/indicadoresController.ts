import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class IndicadoresController {
  async handle(request: Request, response: Response) {
    const token = useTokenDecoded(request);

    //Taxa de ocupação
    const quartosTotais = await prismaClient.quarto.count();
    const quartosOcupados = await prismaClient.quarto.count({
      where: {
        status: 1,
        usuarioId: token.id,
      },
    });

    //Nº de hóspedes
    const hospedes = await prismaClient.hospedagem.count({
      where: {
        status: 0,
        usuarioId: token.id,
      },
    });

    //Receita mensal
    const receitasMensais = await prismaClient.financeiro.findMany({
      where: {
        usuarioId: token.id,
        criadoEm: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });

    const somaReceitasMensais = receitasMensais.reduce(
      (total, receita) => total + receita.valor,
      0
    );

    const taxaOcupacao = +((quartosOcupados / quartosTotais) * 100).toFixed(2);

    return response.status(200).json({
      taxaOcupacao,
      hospedes,
      receitasMensais: somaReceitasMensais,
    });
  }
}
