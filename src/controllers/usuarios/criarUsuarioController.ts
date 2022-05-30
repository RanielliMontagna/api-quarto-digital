import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Usuario } from "@prisma/client";

import {
  campoObrigatorio,
  composeValidator,
  isString,
} from "../../utils/validations";

export class CriarUsuarioController {
  async handle(request: Request<Usuario>, response: Response) {
    const { email, nome, senha } = request.body;

    // Validações no campo email
    composeValidator({
      validators: [campoObrigatorio, isString],
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

    // Cria o usuário no banco de dados
    const usuario = await prismaClient.usuario
      .create({
        data: {
          email,
          nome,
          senha,
        },
      })
      .catch(() => {
        //Retorna erro caso o usuário não seja criado
        throw new Error("Ocorreu um erro ao criar o usuário.");
      });

    return response.json(usuario);
  }
}
