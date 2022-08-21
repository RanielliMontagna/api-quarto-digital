import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max99999,
  min0,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

export class EditarProdutoController {
  async handle(request: Request, response: Response) {
    const { id, nome, preco } = request.body;

    const produtosRepository = new ProdutosRepository();

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo preço
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: preco,
      nome: "preço",
    });

    // Edita o produto no banco de dados
    const produto = await produtosRepository.editarProduto({
      id,
      nome,
      preco,
    });

    return response.json(produto);
  }
}
