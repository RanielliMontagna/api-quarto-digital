-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_usuarioId_fkey";

-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
