import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import type {
  IBuscarServico,
  IBuscarServicos,
  ICriarServico,
  IDeletarServico,
  IEditarServico,
} from "./servicosRepository.types";

export class ServicosRepository {
  // Buscar serviço pelo id
  async buscarServico({ id, usuarioId }: IBuscarServico) {
    const servico = await prismaClient.servico
      .findFirst({
        where: { id, usuarioId },
        select: { id: true, nome: true, preco: true },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o servico.");
      });

    return servico;
  }

  // Buscar todos os serviços
  async buscarServicos({ params, usuarioId }: IBuscarServicos) {
    const servicos = await prismaClient.servico
      .findMany({
        where: { usuarioId, ...params },
        select: { id: true, nome: true, preco: true },
        orderBy: { nome: "asc" },
      })
      .catch(() => {
        //Retornar erro caso os serviços não sejam listados
        throw new Error("Ocorreu um erro ao listar os serviços");
      });

    return servicos;
  }

  // Criar um serviço
  async criarServico({ nome, preco, usuarioId }: ICriarServico) {
    const servico = await prismaClient.servico
      .create({
        data: { nome, preco, usuarioId },
        select: { id: true, nome: true, preco: true },
      })
      .catch(() => {
        //Retorna erro caso o serviço não seja criado
        throw new Error("Ocorreu um erro ao criar o serviço.");
      });

    return servico;
  }

  // Editar um serviço
  async editarServico({ id, nome, preco }: IEditarServico) {
    const servico = await prismaClient?.servico
      ?.update({
        data: { nome, preco, alteradoEm: new Date() },
        select: { id: true, nome: true, preco: true },
        where: { id },
      })
      .catch((error) => {
        //Retorna erro caso o serviço não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Serviço não encontrado.");
        } else {
          throw new Error("Erro ao editar serviço.");
        }
      });

    return servico;
  }

  // Deletar um serviço
  async deletarServico({ id }: IDeletarServico) {
    await prismaClient.servico
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o servico não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Serviço não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o servico.");
        }
      });
  }
}
