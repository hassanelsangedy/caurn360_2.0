-- CreateTable
CREATE TABLE "Associado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "dataNascimento" DATETIME,
    "genero" TEXT,
    "nivelRisco" INTEGER NOT NULL DEFAULT 3,
    "ultimaInteracao" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "faltaConsecutivas" INTEGER NOT NULL DEFAULT 0,
    "custoMensal" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Programa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "eixo" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "ParticipacaoPrograma" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "associadoId" TEXT NOT NULL,
    "programaId" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    CONSTRAINT "ParticipacaoPrograma_associadoId_fkey" FOREIGN KEY ("associadoId") REFERENCES "Associado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ParticipacaoPrograma_programaId_fkey" FOREIGN KEY ("programaId") REFERENCES "Programa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "associadoId" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "profissional" TEXT,
    CONSTRAINT "Interacao_associadoId_fkey" FOREIGN KEY ("associadoId") REFERENCES "Associado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "associadoId" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "score" REAL,
    "detalhes" TEXT,
    "profissional" TEXT,
    CONSTRAINT "Avaliacao_associadoId_fkey" FOREIGN KEY ("associadoId") REFERENCES "Associado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IndicadorGlobal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nps" REAL NOT NULL DEFAULT 0,
    "sinistralidadeReducao" REAL NOT NULL DEFAULT 0,
    "atendimentosDigitais" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Associado_cpf_key" ON "Associado"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Programa_nome_key" ON "Programa"("nome");
