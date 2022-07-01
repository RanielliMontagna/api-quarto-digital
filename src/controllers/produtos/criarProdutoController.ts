import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max999999,
  min0,
} from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class CriarProdutoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;
    const { id } = useTokenDecoded(request);

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo preço
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max999999],
      value: preco,
      nome: "preço",
    });

    // Cria o produto no banco de dados
    const produto = await prismaClient.produto
      .create({
        data: {
          nome,
          preco,
          usuarioId: Number(id),
        },
        select: {
          id: true,
          nome: true,
          preco: true,
        },
      })
      .catch(() => {
        //Retorna erro caso o produto não seja criado
        throw new Error("Ocorreu um erro ao criar o produto.");
      });

    return response.json(produto);
  }
}
