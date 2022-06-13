import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import jwt from "jsonwebtoken";
import { IToken } from "../../middlewares/jwt";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);

    // Exclui tokens existentes do usuário
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(id) },
      },
    });

    return response.status(200).json();
  }
}
