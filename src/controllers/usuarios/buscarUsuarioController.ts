import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class BuscarUsuarioController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const usuariosRepository = new UsuariosRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Busca o usuário no banco de dados
    const usuario = await usuariosRepository.buscarUsuario({ id: Number(id) });

    // Erro caso o usuário não seja encontrado
    campoNaoEncontrado({ value: usuario, nome: "usuário" });

    return response.json(usuario);
  }
}
