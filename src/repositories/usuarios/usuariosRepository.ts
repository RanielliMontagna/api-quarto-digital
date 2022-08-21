import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import type {
  IBuscarUsuario,
  IBuscarUsuarios,
  ICriarUsuario,
  IDeletarUsuario,
  IEditarUsuario,
  IEmailJaExiste,
} from "./usuariosRepository.types";

export class UsuariosRepository {
  // Buscar usuario pelo id
  async buscarUsuario({ id }: IBuscarUsuario) {
    const usuario = await prismaClient.usuario
      .findFirst({
        where: {
          id: Number(id),
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o usuário.");
      });

    return usuario;
  }

  // Buscar todos os usuarios
  async buscarUsuarios({ params }: IBuscarUsuarios) {
    const usuarios = await prismaClient.usuario
      .findMany({
        where: {
          ...params,
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os usuários não sejam listados
        throw new Error("Ocorreu um erro ao listar os usuários");
      });

    return usuarios;
  }

  // Criar um usuario
  async criarUsuario({ email, nome, senha }: ICriarUsuario) {
    const usuario = await prismaClient.usuario
      .create({
        data: { email: email.toLowerCase(), nome, senha },
      })
      .catch(() => {
        //Retorna erro caso o usuário não seja criado
        throw new Error("Ocorreu um erro ao criar o usuário.");
      });

    return usuario;
  }

  // Editar um usuario
  async editarUsuario({ email, nome, senha, id }: IEditarUsuario) {
    const usuario = await prismaClient?.usuario
      ?.update({
        data: {
          email: email.toLowerCase(),
          nome,
          senha,
          alteradoEm: new Date(),
        },
        where: {
          id,
        },
      })
      .catch((error) => {
        //Retorna erro caso o usuário não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Usuário não encontrado.");
        } else {
          throw new Error("Erro ao editar usuário.");
        }
      });

    return usuario;
  }

  // Deletar um usuario
  async deletarUsuario({ id }: IDeletarUsuario) {
    await prismaClient.usuario
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o usuario não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Usuario não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o usuario.");
        }
      });
  }

  // Verifica se o email já está cadastrado
  async emailJaExiste({ email, idUsuario }: IEmailJaExiste) {
    const clienteExistente = await prismaClient?.usuario?.findFirst({
      where: {
        email,
        NOT: { id: idUsuario ? Number(idUsuario) : undefined },
      },
    });

    return clienteExistente;
  }

  // Verifica se o usuário existe
  async usuarioExiste({ email }: { email: string }) {
    const usuarioExistente = await prismaClient.usuario
      .findFirst({ where: { email } })
      .catch(() => {
        //Retorna erro caso o usuário não seja encontrado
        throw new ValidationError("Ocorreu um erro ao encontrar o usuário.");
      });

    return usuarioExistente;
  }
}
