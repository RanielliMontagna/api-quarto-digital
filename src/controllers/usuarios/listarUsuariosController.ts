import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Usuario } from "@prisma/client";

export class ListarUsuariosController {
  async handle(_: Request<Usuario>, response: Response) {
    const usuario = await prismaClient.usuario.findMany().catch(() => {
      //Retornar erro caso os usuários não sejam listados
      throw new Error("Ocorreu um erro ao listar os usuários");
    });

    return response.json(usuario);
  }
}
