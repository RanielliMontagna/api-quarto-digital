import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  campoObrigatorio,
  composeValidator,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { AuthenticationRepository } from "../../repositories/authentication/authenticationRepository";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;

    const usuariosRepository = new UsuariosRepository();
    const authenticationRepository = new AuthenticationRepository();

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
    const usuario = await usuariosRepository.usuarioExiste({ email });

    if (!usuario) {
      throw new ValidationError("Usuário ou senha incorretos.");
    }

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, String(usuario?.senha));

    // Retorna erro caso a senha esteja incorreta
    if (!senhaCorreta) {
      throw new ValidationError("Usuário ou senha incorretos.");
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
      await authenticationRepository.guardarToken({
        token,
        id: usuario?.id,
      });
    }

    //Retorna o token
    return response.json({
      token,
    });
  }
}
