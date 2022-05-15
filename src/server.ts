import express from "express";
import { routes } from "./routes/routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(4003, () => console.log("Server está rodando na porta 4003!"));
