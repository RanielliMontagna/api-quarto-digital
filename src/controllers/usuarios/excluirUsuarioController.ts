import { Request, Response } from "express";
import { Usuario } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

import { isInteger } from "../../utils/validations";

export class ExcluirUsuarioController {
  async handle(request: Request<Usuario>, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui tokens existentes do usuário
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(id) },
      },
    });

    // Exclui o produto no banco de dados
    await prismaClient.usuario
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        //Retorna erro caso o produto não seja excluído
        if (error?.meta.cause === "Record to delete does not exist.") {
          throw new Error("Usuário não encontrado.");
        } else {
          throw new Error("Ocorreu um erro ao excluir o usuário.");
        }
      });

    return response.status(200).json();
  }
}
