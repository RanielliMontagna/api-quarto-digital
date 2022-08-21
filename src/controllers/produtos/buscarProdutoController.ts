import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

export class BuscarProdutoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    const produtosRepository = new ProdutosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o produto no banco de dados
    const produto = await produtosRepository.buscarProduto({
      id: Number(id),
      usuarioId: Number(token.id),
    });

    // Erro caso o produto não seja encontrado
    campoNaoEncontrado({ value: produto, nome: "produto" });

    return response.json(produto);
  }
}
