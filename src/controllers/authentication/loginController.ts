import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prismaClient } from "../../database/prismaClient";
import {
  campoObrigatorio,
  composeValidator,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;

    // Validações no campo email
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: email,
      nome: "email",
    });

    // Validações no campo senha
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: senha,
      nome: "senha",
    });

    // Verifica se o usuário existe no banco de dados
    const usuario = await prismaClient.usuario
      .findFirst({
        where: {
          email,
        },
      })
      .catch(() => {
        //Retorna erro caso o usuário não seja encontrado
        throw new ValidationError("Ocorreu um erro ao encontrar o usuário.");
      });

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, String(usuario?.senha));

    // Retorna erro caso a senha esteja incorreta
    if (!senhaCorreta) {
      throw new ValidationError("Senha incorreta.");
    }

    let token;
    // Criar token de autenticação
    if (process.env.JWT_SECRET) {
      token = jwt.sign(
        { id: usuario?.id, nome: usuario?.nome },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
    } else {
      throw new ValidationError("JWT_SECRET não definido.");
    }

    if (usuario) {
      //Guardar token no banco de dados
      await prismaClient.token.create({
        data: {
          token,
          usuarioId: usuario?.id,
        },
      });
    }

    //Retorna o token
    return response.json({
      token,
    });
  }
}
