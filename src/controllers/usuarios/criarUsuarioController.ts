import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prismaClient } from "../../database/prismaClient";
import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class CriarUsuarioController {
  async handle(request: Request, response: Response) {
    const { email, nome, senha } = request.body;
    const usuariosRepository = new UsuariosRepository();

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
    const emailExistente = await prismaClient?.usuario?.findFirst({
      where: { email },
    });
    if (emailExistente) {
      throw new ValidationError("Já existe um usuário com este email");
    }

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
      const usuario = usuariosRepository.criarUsuario({
        email,
        nome,
        senha: senhaCriptografada,
      });

      return response.json(usuario);
    }
  }
}
