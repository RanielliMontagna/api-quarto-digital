import { Request } from "express";
import jwt from "jsonwebtoken";
import { IToken } from "../middlewares/jwt";
import { ValidationError } from "./errors/validationError";

const useTokenDecoded = (request: Request) => {
  // Busca o token no header
  let token = request.headers["authorization"];

  // Remove o Bearer do token
  if (token!.startsWith("Bearer ")) {
    token = token?.slice(7, token.length);
  }

  if (token) {
    //Fazer decoded do token
    const decoded = jwt.decode(token!) as IToken;

    //Returna o token
    return decoded;
  }

  throw new ValidationError("Token não encontrado");
};

export default useTokenDecoded;
