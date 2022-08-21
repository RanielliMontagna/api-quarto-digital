import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

export class ExcluirProdutoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const produtosRepository = new ProdutosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    await produtosRepository.deletarProduto({
      id: Number(id),
    });

    return response.status(200).json();
  }
}
