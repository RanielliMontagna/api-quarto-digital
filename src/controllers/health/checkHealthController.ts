import { Request, Response } from "express";

export class CheckHealthController {
  async handle(_: Request, response: Response) {
    return response.json({ status: "OK" });
  }
}
