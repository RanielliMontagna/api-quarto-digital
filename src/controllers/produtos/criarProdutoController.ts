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
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

export class CriarProdutoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;
    const { id } = useTokenDecoded(request);

    const produtosRepository = new ProdutosRepository();

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
    const produto = await produtosRepository.criarProduto({
      nome,
      preco,
      usuarioId: Number(id),
    });

    return response.json(produto);
  }
}
