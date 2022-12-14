import { Response } from "express";
import nodemailer from "nodemailer";

import { prismaClient } from "../../database/prismaClient";
import { ValidationError } from "../../utils/errors/validationError";
import { resetPassowordEmailTemplate } from "./authenticationRepository.static";

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

  async tokenExiste({ token }: { token: string }) {
    const tokenExiste = await prismaClient.token.findFirst({
      where: {
        token,
      },
    });

    return tokenExiste;
  }

  async enviarEmail({
    email,
    token,
    response,
  }: {
    email: string;
    token: string;
    response: Response;
  }) {
    //create a func to send email using nodeMailer
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const api =
      process.env.NODE_ENV === "production"
        ? "https://app.quarto.digital"
        : "http://localhost:3000";

    const link = `${api}/redefinir-senha?token=${token}`;

    const mailOptions = {
      from: `Contato Quarto Digital <${process.env.EMAIL}>`,
      to: email,
      subject: "Redefinir senha",
      html: resetPassowordEmailTemplate({ link }),
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        throw new ValidationError("Erro ao enviar email");
      } else {
        return response.status(200).json({
          message:
            "Um email foi enviado para você com um link para resetar a senha.",
        });
      }
    });
  }
}
