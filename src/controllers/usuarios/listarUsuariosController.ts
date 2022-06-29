import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

export class ListarUsuariosController {
  async handle(_: Request, response: Response) {
    const usuario = await prismaClient.usuario
      .findMany({
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
