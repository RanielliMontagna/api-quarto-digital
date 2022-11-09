import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";

import type {
  IBuscarCliente,
  IBuscarClientes,
  ICpfCnpjJaExiste,
  ICriarCliente,
  IDeletarCliente,
  IEditarCliente,
  IEmailJaExiste,
} from "./clientesRepository.types";

export class ClientesRepository {
  // Buscar cliente pelo id
  async buscarCliente({ id, usuarioId }: IBuscarCliente) {
    const cliente = await prismaClient.cliente
      .findFirst({
        where: {
          id: Number(id),
          usuarioId,
        },
        select: {
          id: true,
          nome: true,
          cpfCnpj: true,
          email: true,
          telefone: true,
          dataNasc: true,
        },
      })
      .catch(() => {
        //Retorna erro caso de algum problema na busca
        throw new Error("Ocorreu um erro ao buscar o cliente.");
      });

    return cliente;
  }

  // Buscar todos os clientes
  async buscarClientes({ params, usuarioId }: IBuscarClientes) {
    const clientes = await prismaClient.cliente
      .findMany({
        where: {
          usuarioId,
          ...params,
        },
        select: {
          id: true,
          nome: true,
          cpfCnpj: true,
          email: true,
          telefone: true,
          dataNasc: true,
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os clientes não sejam listados
        throw new Error("Ocorreu um erro ao listar os clientes");
      });

    return clientes;
  }

  // Criar um cliente
  async criarCliente(props: ICriarCliente) {
    const cliente = await prismaClient.cliente
      .create({
        data: {
          email: props.email || null,
          cpfCnpj: props.cpfCnpj,
          nome: props.nome,
          telefone: props.telefone,
          dataNasc: props.dataNasc,
          usuarioId: props.usuarioId,
        },
        select: {
          id: true,
          nome: true,
          cpfCnpj: true,
          email: true,
          telefone: true,
          dataNasc: true,
        },
      })
      .catch((err) => {
        console.log(err);

        //Retorna erro caso o cliente não seja criado
        throw new Error("Ocorreu um erro ao criar o cliente.");
      });

    return cliente;
  }

  // Editar um cliente
  async editarCliente(props: IEditarCliente) {
    const cliente = await prismaClient?.cliente
      ?.update({
        data: {
          email: props.email,
          nome: props.nome,
          telefone: props.telefone,
          dataNasc: props.dataNasc,
          alteradoEm: new Date(),
        },
        select: {
          id: true,
          nome: true,
          cpfCnpj: true,
          email: true,
          telefone: true,
          dataNasc: true,
        },
        where: {
          id: Number(props.id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o cliente não seja editado
        if (error?.meta.cause === "Record to update not found.") {
          throw new ValidationError("Cliente não encontrado.");
        } else {
          throw new Error("Erro ao editar cliente.");
        }
      });

    return cliente;
  }

  // Deletar um cliente
  async deletarCliente({ id }: IDeletarCliente) {
    await prismaClient.cliente
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o cliente não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new ValidationError("Cliente não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o cliente.");
        }
      });
  }

  // Verifica se o email já está cadastrado
  async emailJaExiste({ email, idUsuario, idCliente }: IEmailJaExiste) {
    const clienteExistente = await prismaClient?.cliente?.findFirst({
      where: {
        email,
        usuarioId: Number(idUsuario),
        NOT: { id: idCliente ? Number(idCliente) : undefined },
      },
    });

    return clienteExistente;
  }

  // Verifica se o cpf/cnpj já está cadastrado
  async cpfCnpjJaExiste({ cpfCnpj, idUsuario, idCliente }: ICpfCnpjJaExiste) {
    const clienteExistente = await prismaClient?.cliente?.findFirst({
      where: {
        cpfCnpj,
        usuarioId: Number(idUsuario),
        NOT: { id: idCliente ? Number(idCliente) : undefined },
      },
    });

    return clienteExistente;
  }
}
