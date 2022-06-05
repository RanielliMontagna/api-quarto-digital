import { ErrorRequestHandler, Express } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export const SentryMiddleware = (app: Express) => {
  if (process.env.NODE_ENV === "production") {
    // Inicia sentry e faz configurações iniciais
    Sentry.init({
      dsn: "https://b9767928369f4fe69769ed644dcd3248@o1065447.ingest.sentry.io/6416763",
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate: 1.0,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }

  // Middleware para erros do sentry
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Caso o erro seja um erro de validação, não envia para o sentry
        if (error.name === "ValidationError") {
          return false;
        }
        return true;
      },
    })
  );

  // Middleware para tratar erros
  const _errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== "development") {
      res.status(500).json({ erro: err.message } ?? res);
    } else {
      res
        .status(500)
        .json(
          err.message
            ? { erro: err.message }
            : { erro: "Ocorreu um erro ao processar a requisição" }
        );
    }
  };
  app.use(_errorHandler);
};
