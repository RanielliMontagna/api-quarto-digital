/*
  Warnings:

  - Added the required column `produtoNome` to the `produtos_hospedagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoPreco` to the `produtos_hospedagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicoNome` to the `servicos_hospedagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicoPreco` to the `servicos_hospedagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos_hospedagem" ADD COLUMN     "produtoNome" TEXT NOT NULL,
ADD COLUMN     "produtoPreco" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "servicos_hospedagem" ADD COLUMN     "servicoNome" TEXT NOT NULL,
ADD COLUMN     "servicoPreco" DOUBLE PRECISION NOT NULL;
