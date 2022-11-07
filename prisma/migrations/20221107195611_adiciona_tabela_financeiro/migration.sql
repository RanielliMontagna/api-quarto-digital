-- CreateTable
CREATE TABLE "financeiros" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospedagemId" INTEGER,
    "usuarioId" INTEGER,

    CONSTRAINT "financeiros_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
