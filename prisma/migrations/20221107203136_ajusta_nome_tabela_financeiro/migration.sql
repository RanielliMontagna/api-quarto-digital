/*
  Warnings:

  - You are about to drop the `financeiros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "financeiros" DROP CONSTRAINT "financeiros_hospedagemId_fkey";

-- DropForeignKey
ALTER TABLE "financeiros" DROP CONSTRAINT "financeiros_usuarioId_fkey";

-- DropTable
DROP TABLE "financeiros";

-- CreateTable
CREATE TABLE "financeiro" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospedagemId" INTEGER,
    "usuarioId" INTEGER,

    CONSTRAINT "financeiro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "financeiro" ADD CONSTRAINT "financeiro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiro" ADD CONSTRAINT "financeiro_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
