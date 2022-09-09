/*
  Warnings:

  - Made the column `clienteId` on table `hospedagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quartoId` on table `hospedagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuarioId` on table `hospedagens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hospedagemId` on table `produtos_hospedagem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `produtoId` on table `produtos_hospedagem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hospedagemId` on table `servicos_hospedagem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servicoId` on table `servicos_hospedagem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "hospedagens" DROP CONSTRAINT "hospedagens_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "hospedagens" DROP CONSTRAINT "hospedagens_quartoId_fkey";

-- DropForeignKey
ALTER TABLE "hospedagens" DROP CONSTRAINT "hospedagens_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "produtos_hospedagem" DROP CONSTRAINT "produtos_hospedagem_hospedagemId_fkey";

-- DropForeignKey
ALTER TABLE "produtos_hospedagem" DROP CONSTRAINT "produtos_hospedagem_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "servicos_hospedagem" DROP CONSTRAINT "servicos_hospedagem_hospedagemId_fkey";

-- DropForeignKey
ALTER TABLE "servicos_hospedagem" DROP CONSTRAINT "servicos_hospedagem_servicoId_fkey";

-- AlterTable
ALTER TABLE "hospedagens" ALTER COLUMN "clienteId" SET NOT NULL,
ALTER COLUMN "quartoId" SET NOT NULL,
ALTER COLUMN "usuarioId" SET NOT NULL;

-- AlterTable
ALTER TABLE "produtos_hospedagem" ALTER COLUMN "hospedagemId" SET NOT NULL,
ALTER COLUMN "produtoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "servicos_hospedagem" ALTER COLUMN "hospedagemId" SET NOT NULL,
ALTER COLUMN "servicoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos_hospedagem" ADD CONSTRAINT "produtos_hospedagem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_hospedagem" ADD CONSTRAINT "produtos_hospedagem_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos_hospedagem" ADD CONSTRAINT "servicos_hospedagem_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos_hospedagem" ADD CONSTRAINT "servicos_hospedagem_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
