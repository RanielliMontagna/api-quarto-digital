import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class BuscarUsuarioController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o usuário no banco de dados
    const usuario = await prismaClient.usuario
      .findFirst({
        where: {
          id: Number(id),
        },
      })
      .catch((err) => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o usuário.");
      });

    // Erro caso o usuário não seja encontrado
    campoNaoEncontrado({ value: usuario, nome: "usuário" });

    return response.json(usuario);
  }
}
