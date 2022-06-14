import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isNumber,
  isString,
  max999999,
  min0,
} from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ValidationError } from "../../utils/errors/validationError";

export class CriarClienteController {
  async handle(request: Request, response: Response) {
    const { email, nome, telefone, dataNasc } = request.body;
    const { id } = useTokenDecoded(request);

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

    // Verificar se já existe um cliente com o email informado
    const clienteExistente = await prismaClient?.cliente?.findFirst({
      where: {
        email,
        usuarioId: id,
      },
    });

    if (clienteExistente) {
      throw new ValidationError("Já existe um cliente com este email");
    }

    // Cria o cliente no banco de dados
    const cliente = await prismaClient.cliente
      .create({
        data: {
          email,
          nome,
          telefone,
          dataNasc,
          usuarioId: Number(id),
        },
      })
      .catch(() => {
        //Retorna erro caso o cliente não seja criado
        throw new Error("Ocorreu um erro ao criar o cliente.");
      });

    return response.json(cliente);
  }
}
