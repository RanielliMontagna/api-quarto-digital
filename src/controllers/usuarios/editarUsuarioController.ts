import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isNumber,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class EditarUsuarioController {
  async handle(request: Request, response: Response) {
    const { id, email, nome, senha } = request.body;

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
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

    // Validações no campo senha
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: senha,
      nome: "senha",
    });

    // Verificar se já existe um usuário com o email informado
    const clienteExistente = await prismaClient?.usuario?.findFirst({
      where: {
        email,
        NOT: { id: Number(id) },
      },
    });
    if (clienteExistente) {
      throw new ValidationError("Já existe um usuário com este email");
    }

    // Edita o usuário no banco de dados
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

    return response.json(usuario);
  }
}
