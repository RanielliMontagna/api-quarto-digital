import { Request, Response } from "express";
import { UsuariosRepository } from "../../repositories/usuarios/usuariosRepository";

export class ListarUsuariosController {
  async handle(request: Request, response: Response) {
    const { query } = request;

    const usuariosRepository = new UsuariosRepository();

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        nome: {
          contains: String(query?.search),
          mode: "insensitive",
        },
      };
    }

    const usuarios = await usuariosRepository.buscarUsuarios({ params });

    return response.json(usuarios);
  }
}
