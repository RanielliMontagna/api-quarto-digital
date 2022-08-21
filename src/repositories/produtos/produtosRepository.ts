import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import type {
  IBuscarProduto,
  IBuscarProdutos,
  ICriarProduto,
  IDeletarProduto,
  IEditarProduto,
} from "./produtosRepository.types";

export class ProdutosRepository {
  // Buscar produto pelo id
  async buscarProduto({ id, usuarioId }: IBuscarProduto) {
    const produto = await prismaClient.produto
      .findFirst({
        where: { id, usuarioId },
        select: { id: true, nome: true, preco: true },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o produto.");
      });

    return produto;
  }

  // Buscar todos os produtos
  async buscarProdutos({ params, usuarioId }: IBuscarProdutos) {
    const produtos = await prismaClient.produto
      .findMany({
        where: { usuarioId, ...params },
        select: { id: true, nome: true, preco: true },
        orderBy: { nome: "asc" },
      })
      .catch(() => {
        //Retornar erro caso os produtos não sejam listados
        throw new Error("Ocorreu um erro ao listar os produtos");
      });

    return produtos;
  }

  // Criar um produto
  async criarProduto({ nome, preco, usuarioId }: ICriarProduto) {
    const produto = await prismaClient.produto
      .create({
        data: { nome, preco, usuarioId },
        select: { id: true, nome: true, preco: true },
      })
      .catch(() => {
        //Retorna erro caso o produto não seja criado
        throw new Error("Ocorreu um erro ao criar o produto.");
      });

    return produto;
  }

  // Editar um produto
  async editarProduto({ id, nome, preco }: IEditarProduto) {
    const produto = await prismaClient?.produto
      ?.update({
        data: { nome, preco, alteradoEm: new Date() },
        select: { id: true, nome: true, preco: true },
        where: { id },
      })
      .catch((error) => {
        //Retorna erro caso o produto não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Produto não encontrado.");
        } else {
          throw new Error("Erro ao editar produto.");
        }
      });

    return produto;
  }

  // Deletar um produto
  async deletarProduto({ id }: IDeletarProduto) {
    await prismaClient.produto
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o produto não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Produto não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o produto.");
        }
      });
  }
}
