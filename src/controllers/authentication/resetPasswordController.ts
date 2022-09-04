import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationRepository } from "../../repositories/authentication/authenticationRepository";

import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";
import { ValidationError } from "../../utils/errors/validationError";
import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isString,
} from "../../utils/validations";

export class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const usuariosRepository = new UsuariosRepository();
    const authenticationRepository = new AuthenticationRepository();

    // Validações no campo email
    composeValidator({
      validators: [campoObrigatorio, isString, emailValido],
      value: email,
      nome: "email",
    });

    // Verifica se o usuário existe no banco de dados
    const usuario = await usuariosRepository.usuarioExiste({ email });

    if (!usuario) {
      throw new ValidationError("Email informado não foi encontrado");
    } else {
      // Cria o token de autenticação
      let token;
      try {
        if (process.env.JWT_SECRET) {
          token = jwt.sign(
            {
              id: usuario.id,
              email: usuario.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          // Salva o token no banco de dados
          await authenticationRepository.guardarToken({
            id: usuario.id,
            token,
          });

          // Envia o email
          await authenticationRepository.enviarEmail({
            email: usuario.email,
            token,
          });
        }
      } catch (error) {
        throw new Error("Erro ao criar token de autenticação.");
      }

      return response.status(200).json({
        message:
          "Um email foi enviado para você com um link para resetar a senha.",
      });
    }
  }
}
