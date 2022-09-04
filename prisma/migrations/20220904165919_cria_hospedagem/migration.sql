-- CreateTable
CREATE TABLE "produtos_hospedagem" (
    "id" SERIAL NOT NULL,
    "hospedagemId" INTEGER,
    "produtoId" INTEGER,
    "quantidade" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alteradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos_hospedagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos_hospedagem" (
    "id" SERIAL NOT NULL,
    "hospedagemId" INTEGER,
    "servicoId" INTEGER,
    "quantidade" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alteradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicos_hospedagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospedagens" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER,
    "quartoId" INTEGER,
    "usuarioId" INTEGER,
    "dataEntrada" TIMESTAMP(3) NOT NULL,
    "dataSaida" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alteradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hospedagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos_hospedagem" ADD CONSTRAINT "produtos_hospedagem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_hospedagem" ADD CONSTRAINT "produtos_hospedagem_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos_hospedagem" ADD CONSTRAINT "servicos_hospedagem_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos_hospedagem" ADD CONSTRAINT "servicos_hospedagem_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagens" ADD CONSTRAINT "hospedagens_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
