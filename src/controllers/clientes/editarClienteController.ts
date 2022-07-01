import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isCpfCnpj,
  isNumber,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class EditarClienteController {
  async handle(request: Request, response: Response) {
    const { id, email, nome, telefone, dataNasc, cpfCnpj } = request.body;
    const token = useTokenDecoded(request);

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

    // Validações no campo cpfCnpj
    composeValidator({
      validators: [campoObrigatorio, isString, isCpfCnpj],
      value: cpfCnpj,
      nome: "cpfCnpj",
    });

    // Validações no campo email
    composeValidator({
      validators: [campoObrigatorio, isString, emailValido],
      value: email,
      nome: "email",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: telefone,
      nome: "telefone",
    });

    // Validações no campo data de nascimento
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: dataNasc,
      nome: "data de nascimento",
    });

    // Verifica se já existe um cliente com o mesmo cpfCnpj
    if (cpfCnpj) {
      const cliente = await prismaClient.cliente.findFirst({
        where: { cpfCnpj, usuarioId: token.id, NOT: { id: Number(id) } },
      });
      if (cliente) {
        throw new ValidationError("Já existe um cliente com este CPF/CNPJ");
      }
    }

    // Verificar se já existe um cliente com o email informado
    const clienteExistente = await prismaClient?.cliente?.findFirst({
      where: {
        email,
        usuarioId: token.id,
        NOT: { id: Number(id) },
      },
    });

    if (clienteExistente) {
      throw new ValidationError("Já existe um cliente com este email");
    }

    // Edita o cliente no banco de dados
    const cliente = await prismaClient?.cliente
      ?.update({
        data: {
          email,
          nome,
          telefone,
          dataNasc,
          alteradoEm: new Date(),
        },
        where: {
          id: Number(id),
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

    return response.json(cliente);
  }
}
