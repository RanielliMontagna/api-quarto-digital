import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import jwt from "jsonwebtoken";
import { IToken } from "../../middlewares/jwt";

export class LogoutController {
  async handle(request: Request, response: Response) {
    let token = request.headers["authorization"];

    if (token!.startsWith("Bearer ")) {
      token = token?.slice(7, token.length);
    }

    //Fazer decoded do token
    const decoded = jwt.decode(token!) as IToken;

    // Exclui tokens existentes do usuário
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(decoded.id) },
      },
    });

    return response.status(200).json();
  }
}
