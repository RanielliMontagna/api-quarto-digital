import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { AuthenticationRepository } from "../../repositories/authentication/authenticationRepository";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class RegisterController {
  async handle(request: Request, response: Response) {
    const { email, nome, senha } = request.body;

    const usuariosRepository = new UsuariosRepository();
    const authenticationRepository = new AuthenticationRepository();

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
    const usuario = await usuariosRepository.usuarioExiste({ email });

    if (usuario) {
      throw new ValidationError("Usuário já existe.");
    } else {
      // Cria o usuário
      const usuarioCriado = await usuariosRepository.criarUsuario({
        email: email.toLowerCase(),
        nome,
        senha: senhaCriptografada,
      });

      // Cria o token de autenticação
      let token;
      if (process.env.JWT_SECRET) {
        token = jwt.sign(
          { id: usuarioCriado.id, nome: usuarioCriado.nome },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
      } else {
        throw new ValidationError("JWT_SECRET não definido.");
      }

      // Guarda o token no banco de dados
      await authenticationRepository.guardarToken({
        token,
        id: usuarioCriado.id,
      });

      // Retorna o token
      return response.json({ token });
    }
  }
}
