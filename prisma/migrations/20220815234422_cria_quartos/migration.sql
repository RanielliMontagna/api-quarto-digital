-- CreateTable
CREATE TABLE "quartos" (
    "id" SERIAL NOT NULL,
    "identificacao" INTEGER NOT NULL,
    "tipo" TEXT,
    "diaria" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alteradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,

    CONSTRAINT "quartos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quartos" ADD CONSTRAINT "quartos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
