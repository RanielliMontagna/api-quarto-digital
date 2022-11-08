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

    // reservas atuais
    //TODO: fazer logica de reservas
    const reservas = 15;

    //grafico de receitas do ano mes a mes
    const receitasAnuais = await prismaClient.financeiro.findMany({
      where: {
        usuarioId: token.id,
        criadoEm: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lte: new Date(new Date().getFullYear(), 11, 31),
        },
      },
    });

    const receitasAnuaisMes = receitasAnuais.reduce((acc: any, receita) => {
      const mes = receita.criadoEm.getMonth();
      const valor = receita.valor;

      if (acc[mes]) {
        acc[mes].valor += valor;
      } else {
        acc[mes] = {
          mes,
          valor,
        };
      }

      return acc;
    }, {});

    return response.status(200).json({
      taxaOcupacao,
      hospedes,
      receitasMensais: somaReceitasMensais,
      reservas,
      receitasAnuais: Object.values(receitasAnuaisMes),
    });
  }
}
