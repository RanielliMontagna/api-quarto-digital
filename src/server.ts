import express from "express";
import "express-async-errors";

import { routes } from "./routes/routes";
import { SentryMiddleware } from "./middlewares/sentry";
import { JwtMiddleware } from "./middlewares/jwt";

const app = express();

// Configurações do express e roteamento de rotas
app.use(express.json());
app.use(routes);

// Middleware utilizado para o sentry
SentryMiddleware(app);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}!`));
