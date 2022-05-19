import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

import { campoObrigatorio, isNumber, isString } from "../../utils/validations";

export class CriarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { nome, preco } = request.body;

    // Erro caso o nome não seja informado
    campoObrigatorio({ value: nome, nome: "nome" });

    // Erro caso o preço não seja informado
    campoObrigatorio({ value: preco, nome: "preço" });

    // Verifica se o nome é uma string
    isString({ value: nome, nome: "nome" });

    // Verifica se o preço é um número
    isNumber({ value: preco, nome: "preço" });

    // Cria o produto no banco de dados
    const produto = await prismaClient.produto.create({
      data: {
        nome,
        preco,
      },
    });

    //Retorna erro caso o produto não seja criado
    if (!produto) throw new Error("Ocorreu um erro ao criar o produto");

    return response.json(produto);
  }
}
