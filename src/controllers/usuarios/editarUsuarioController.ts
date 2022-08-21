import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isNumber,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class EditarUsuarioController {
  async handle(request: Request, response: Response) {
    const { id, email, nome, senha } = request.body;
    const usuariosRepository = new UsuariosRepository();

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
    const usuarioExistente = await usuariosRepository.emailJaExiste({
      email,
      idUsuario: id,
    });
    if (usuarioExistente) {
      throw new ValidationError("Já existe um usuário com este email");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Edita o usuário no banco de dados
    const usuario = await usuariosRepository.editarUsuario({
      id: Number(id),
      email,
      nome,
      senha: senhaCriptografada,
    });

    return response.json(usuario);
  }
}
