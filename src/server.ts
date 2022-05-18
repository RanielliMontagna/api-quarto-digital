import "express-async-errors";
import express, { ErrorRequestHandler } from "express";
import { routes } from "./routes/routes";

const app = express();

app.use(express.json());
app.use(routes);

const _errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    res.status(500).json(res);
  } else {
    res.status(500).json("Ocorreu um erro ao processar a requisição");
  }
};
app.use(_errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}!`));
