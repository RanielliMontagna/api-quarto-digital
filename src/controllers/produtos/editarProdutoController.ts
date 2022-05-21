import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";
import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max99999,
  min0,
} from "../../utils/validations";

export class EditarProdutoController {
  async handle(request: Request<Produto>, response: Response) {
    const { id, nome, preco } = request.body;

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
    const produto = await prismaClient?.produto
      ?.update({
        data: {
          nome,
          preco,
        },
        where: {
          id,
        },
      })
      .catch((error) => {
        //Retorna erro caso o produto não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new Error("Produto não encontrado.");
        } else {
          throw new Error("Erro ao editar produto.");
        }
      });

    return response.json(produto);
  }
}
