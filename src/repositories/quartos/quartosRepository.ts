import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import type {
  IAlterarStatusQuarto,
  IBuscarQuarto,
  IBuscarQuartos,
  ICriarQuarto,
  IDeletarQuarto,
  IEditarQuarto,
  IIdentificacaoExiste,
} from "./quartosRepository.types";

export class QuartosRepository {
  // Buscar quarto pelo id
  async buscarQuarto({ id, usuarioId }: IBuscarQuarto) {
    const quarto = await prismaClient.quarto
      .findFirst({
        where: { id: Number(id), usuarioId },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o quarto.");
      });

    return quarto;
  }

  // Buscar todos os quartos
  async buscarQuartos({ params, usuarioId }: IBuscarQuartos) {
    const quartos = await prismaClient.quarto
      .findMany({
        where: { usuarioId, ...params },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
          Hospedagem: {
            select: {
              id: true,
              Cliente: {
                select: {
                  id: true,
                  nome: true,
                  telefone: true,
                },
              },
              dataEntrada: true,
              dataSaida: true,
              status: true,
            },
            where: {
              status: 0,
            },
          },
        },
        orderBy: { identificacao: "asc" },
      })
      .catch((err) => {
        //Retornar erro caso os quartos não sejam listados
        throw new Error("Ocorreu um erro ao listar os quartos");
      });

    return quartos?.map((quarto) => ({
      ...quarto,
      hospedagem: quarto.Hospedagem[0] || null,
      Hospedagem: undefined,
    }));
  }

  // Criar um quarto
  async criarQuarto({
    identificacao,
    diaria,
    status = 0,
    usuarioId,
  }: ICriarQuarto) {
    const quarto = await prismaClient.quarto
      .create({
        data: { identificacao, diaria, status, usuarioId },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch(() => {
        //Retorna erro caso o quarto não seja criado
        throw new Error("Ocorreu um erro ao criar o quarto.");
      });

    return quarto;
  }

  // Editar um quarto
  async editarQuarto({ id, identificacao, diaria, status = 0 }: IEditarQuarto) {
    const quarto = await prismaClient?.quarto
      ?.update({
        data: {
          identificacao,
          diaria,
          status,
          alteradoEm: new Date(),
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
        where: { id },
      })
      .catch((error) => {
        //Retorna erro caso o quarto não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Erro ao editar quarto.");
        }
      });

    return quarto;
  }

  // Deletar um quarto
  async deletarQuarto({ id }: IDeletarQuarto) {
    await prismaClient.quarto
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o quarto não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o quarto.");
        }
      });
  }

  //Alterar o status do quarto
  async alterarStatusQuarto({ id, status }: IAlterarStatusQuarto) {
    const quarto = await prismaClient.quarto
      .update({
        data: {
          status,
        },
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          identificacao: true,
          diaria: true,
          status: true,
        },
      })
      .catch((error) => {
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Quarto não encontrado.");
        } else {
          throw new Error("Erro ao atualizar o status do quarto.");
        }
      });

    return quarto;
  }

  // Verificar se a identificação do quarto já existe
  async identificacaoJaExiste({
    identificacao,
    idUsuario,
    idQuarto,
  }: IIdentificacaoExiste) {
    const quarto = await prismaClient.quarto.findFirst({
      where: {
        identificacao,
        usuarioId: Number(idUsuario),
        NOT: { id: idQuarto ? Number(idQuarto) : undefined },
      },
    });

    return quarto;
  }
}
