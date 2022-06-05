import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prismaClient } from "../../database/prismaClient";
import { Usuario } from "@prisma/client";

import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class CriarUsuarioController {
  async handle(request: Request, response: Response) {
    const { email, nome, senha } = request.body;

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

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Verifica se o usuário existe no banco de dados
    const usuarioExistente = await prismaClient.usuario
      .findFirst({
        where: {
          email,
        },
      })
      .catch(() => {
        //Retorna erro caso o usuário não seja encontrado
        throw new ValidationError("Ocorreu um erro ao encontrar o usuário.");
      });

    if (usuarioExistente) {
      throw new ValidationError("Usuário já existe.");
    } else {
      // Cria o usuário no banco de dados
      const usuario = await prismaClient.usuario
        .create({
          data: {
            email: email.toLowerCase(),
            nome,
            senha: senhaCriptografada,
          },
        })
        .catch(() => {
          //Retorna erro caso o usuário não seja criado
          throw new Error("Ocorreu um erro ao criar o usuário.");
        });

      return response.json(usuario);
    }
  }
}
