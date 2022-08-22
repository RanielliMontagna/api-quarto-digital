import express from "express";
import "express-async-errors";

import { routes } from "./routes/routes";
import { SentryMiddleware } from "./middlewares/sentry";
import { Swagger } from "./swagger";

require("dotenv").config();

const app = express();

// Configurações do express
app.use(express.json());

// Faz configurações do Swagger
Swagger(app);

// Rotas
app.use(routes);

// Middleware utilizado para o sentry
SentryMiddleware(app);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}!`));

export { app };
