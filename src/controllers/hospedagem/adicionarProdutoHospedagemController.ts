import { Request, Response } from "express";

import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import { ProdutosRepository } from "../../repositories/produtos/produtosRepository";

import useTokenDecoded from "../../utils/useTokenDecoded";
import {
  campoObrigatorio,
  composeValidator,
  isInteger,
} from "../../utils/validations";

export class AdicionarProdutoHospedagemController {
  async handle(request: Request, response: Response) {
    // Pega o id do usuário
    const token = useTokenDecoded(request);

    // Busca os dados da requisição
    const { codigoHospedagem, codigoProduto, quantidade } = request.body;

    const produtosRepository = new ProdutosRepository();
    const hospedagemRepository = new HospedagemRepository();

    // Validações no campo codigoHospedagem
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoHospedagem,
      nome: "codigoHospedagem",
    });

    // Validações no campo codigoProduto
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoProduto,
      nome: "codigoProduto",
    });

    // Validações no campo quantidade
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: quantidade,
      nome: "quantidade",
    });

    // Buscar informações do produto
    const produto = await produtosRepository.buscarProduto(codigoProduto);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Buscar informações da hospedagem
    const hospedagem = await hospedagemRepository.buscarHospedagem({
      codigoHospedagem,
      codigoUsuario: Number(token.id),
    });

    if (!hospedagem) {
      throw new Error("Hospedagem não encontrada");
    }

    // Adiciona o produto na hospedagem
    await hospedagemRepository.adicionarProdutoHospedagem({
      codigoHospedagem,
      codigoUsuario: Number(token.id),
      produto: {
        codigo: produto.id,
        nome: produto.nome,
        preco: produto.preco,
      },
      quantidade,
    });

    return response.status(200).json({
      message: "Produto adicionado com sucesso",
    });
  }
}
