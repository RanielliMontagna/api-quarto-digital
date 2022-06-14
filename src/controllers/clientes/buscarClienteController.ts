import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class BuscarClienteController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o cliente no banco de dados
    const cliente = await prismaClient.cliente
      .findFirst({
        where: {
          id: Number(id),
          usuarioId: token.id,
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o cliente.");
      });

    // Erro caso o cliente não seja encontrado
    campoNaoEncontrado({ value: cliente, nome: "cliente" });

    return response.json(cliente);
  }
}
