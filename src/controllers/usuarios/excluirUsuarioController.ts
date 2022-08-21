import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class ExcluirUsuarioController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const usuariosRepository = new UsuariosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui tokens existentes do usuário
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(id) },
      },
    });

    // Exclui o produto no banco de dados
    usuariosRepository.deletarUsuario({ id: Number(id) });

    return response.status(200).json();
  }
}
