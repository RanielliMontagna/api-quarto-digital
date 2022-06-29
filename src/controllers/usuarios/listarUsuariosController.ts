import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ListarUsuariosController {
  async handle(request: Request, response: Response) {
    const { query } = request;

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

    const usuario = await prismaClient.usuario
      .findMany({
        where: {
          ...params,
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os usuários não sejam listados
        throw new Error("Ocorreu um erro ao listar os usuários");
      });

    return response.json(usuario);
  }
}
