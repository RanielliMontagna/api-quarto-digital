import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { isInteger } from "../../utils/validations";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui tokens existentes do usuário
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(id) },
      },
    });

    return response.status(200).json();
  }
}
