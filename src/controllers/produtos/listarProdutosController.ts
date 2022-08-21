import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

export class ListarProdutosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);
    const { query } = request;

    const produtosRepository = new ProdutosRepository();

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        nome: {
          contains: String(query?.search),
          mode: "insensitive",
        },
      };
    }

    // Endpoint para listar todos os produtos
    const produtos = await produtosRepository.buscarProdutos({
      params,
      usuarioId: Number(id),
    });

    console.log(produtos);

    return response.json(produtos);
  }
}
