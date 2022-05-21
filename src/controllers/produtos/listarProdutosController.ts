import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Produto } from "@prisma/client";

export class ListarProdutosController {
  async handle(_: Request<Produto>, response: Response) {
    const produto = await prismaClient.produto.findMany().catch(() => {
      //Retornar erro caso os produtos não sejam listados
      throw new Error("Ocorreu um erro ao listar os produtos");
    });

    return response.json(produto);
  }
}
