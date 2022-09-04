import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IToken } from "../../middlewares/jwt";
import { AuthenticationRepository } from "../../repositories/authentication/authenticationRepository";

import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";
import { ValidationError } from "../../utils/errors/validationError";
import {
  campoObrigatorio,
  composeValidator,
  isString,
} from "../../utils/validations";

export class ChangePasswordController {
  async handle(request: Request, response: Response) {
    const { senha } = request.body;
    const token = request.headers["authorization"];

    const usuariosRepository = new UsuariosRepository();
    const authenticationRepository = new AuthenticationRepository();

    // Validações no campo senha
    //TODO: Criar validação de senha
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: senha,
      nome: "senha",
    });

    if (!token) {
      throw new ValidationError("Token não encontrado");
    }

    // Verifica se o token é válido
    let decodedToken;
    try {
      decodedToken = jwt.decode(token.slice(7, token.length)) as IToken;
    } catch (error) {
      throw new ValidationError("Token inválido");
    }

    // Verifica se o token existe no banco de dados
    const tokenExiste = await authenticationRepository.tokenExiste({
      token: token.slice(7, token.length),
    });

    if (!tokenExiste) {
      throw new ValidationError("Token inválido");
    }

    // Verifica se o usuário existe no banco de dados
    const usuario = await usuariosRepository.usuarioExiste({
      email: decodedToken?.email,
    });

    if (!usuario) {
      throw new ValidationError("Usuário não encontrado");
    }

    // Atualiza a senha do usuário
    await usuariosRepository.atualizarSenha({
      id: usuario.id,
      senha,
    });

    // Deleta o token do banco de dados
    await authenticationRepository.deletarToken({
      id: usuario.id,
    });

    return response.status(200).json({
      message: "Senha alterada com sucesso",
    });
  }
}
