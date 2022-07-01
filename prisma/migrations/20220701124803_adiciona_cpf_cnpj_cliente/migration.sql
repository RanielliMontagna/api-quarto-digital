/*
  Warnings:

  - A unique constraint covering the columns `[cpfCnpj]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cpfCnpj" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpfCnpj_key" ON "clientes"("cpfCnpj");
