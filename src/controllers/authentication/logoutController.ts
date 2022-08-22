import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { AuthenticationRepository } from "../../repositories/authentication/authenticationRepository";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);

    const authenticationRepository = new AuthenticationRepository();

    // Exclui tokens existentes do usuário
    await authenticationRepository.deletarToken({ id: Number(id) });

    return response.status(200).json();
  }
}
