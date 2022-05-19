import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";
import {
  campoObrigatorio,
  isInteger,
  isNumber,
  isString,
} from "../../utils/validations";

export class EditarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id, nome, preco } = request.body;

    // Erro de campo obrigatório
    campoObrigatorio({ value: id, nome: "id" });
    campoObrigatorio({ value: nome, nome: "nome" });
    campoObrigatorio({ value: preco, nome: "preço" });

    // Verifica os tipos de dados
    isInteger({ value: id, nome: "id" });
    isString({ value: nome, nome: "nome" });
    isNumber({ value: preco, nome: "preço" });

    // Edita o produto no banco de dados
    const produto = await prismaClient?.produto?.update({
      data: {
        nome,
        preco,
      },
      where: {
        id,
      },
    });

    // Retorna erro caso o produto não seja editado
    if (!produto) throw new Error("Ocorreu um erro ao atualizar o produto");

    return response.json(produto);
  }
}
