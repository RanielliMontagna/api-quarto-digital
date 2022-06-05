import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";

export interface IToken extends JwtPayload {
  id: number;
  nome: string;
}

export const JwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET não definido");

  if (!token) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  if (token.startsWith("Bearer ")) {
    // Remove o Bearer do token
    const tokenWithoutBearer = token.slice(7, token.length);

    // Verifica o token
    jwt.verify(tokenWithoutBearer, secret, async (err, decoded) => {
      if (err?.message === "jwt expired") {
        return res.status(401).json({ erro: "Token expirado" });
      }

      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      const tokenDecoded = decoded as IToken;
      if (!tokenDecoded.exp) {
        return res.status(401).json({ erro: "Token expirado" });
      }

      // Verifica se o token existe no banco de dados
      const tokenExists = await prismaClient.token
        .findFirst({
          where: {
            token: tokenWithoutBearer,
          },
        })
        .catch(() => {
          throw new Error("Ocorreu um erro ao verificar o token");
        });

      if (!tokenExists) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      return next();
    });
  } else {
    return res.status(401).json({
      erro: "Token inválido",
    });
  }
};
