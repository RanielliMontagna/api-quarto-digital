import { prismaClient } from "../../database/prismaClient";

export class AuthenticationRepository {
  async deletarToken({ id }: { id: number }) {
    await prismaClient.token.deleteMany({
      where: {
        usuario: { id: Number(id) },
      },
    });
  }

  async guardarToken({ id, token }: { id: number; token: string }) {
    await prismaClient.token.create({
      data: {
        token,
        usuarioId: id,
      },
    });
  }
}
