import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Delete all existing data
    await prisma.indicadorGlobal.deleteMany({});
    await prisma.avaliacao.deleteMany({});
    await prisma.interacao.deleteMany({});
    await prisma.participacaoPrograma.deleteMany({});
    await prisma.programa.deleteMany({});
    await prisma.associado.deleteMany({});

    // Create Programs
    const caurnAtiva = await prisma.programa.create({
        data: { nome: "CaurnAtiva", eixo: "Suporte", description: "Promoção da saúde e atividade física" },
    });

    const pdbcv = await prisma.programa.create({
        data: { nome: "PDBCV", eixo: "Estratégia", description: "Bem com a Vida - Idosos e crônicos" },
    });

    const meta = await prisma.programa.create({
        data: { nome: "Meta", eixo: "Nutricional", description: "Redução de peso e IMC" },
    });

    const memoria = await prisma.programa.create({
        data: { nome: "Memória", eixo: "Psicossocial", description: "Estimulação cognitiva" },
    });

    // Create Associados
    const associados = [];
    for (let i = 0; i < 20; i++) {
        const risk = i % 10 === 0 ? 1 : i % 3 === 0 ? 2 : 3;
        const daysSinceLastContact = risk === 1 && i === 0 ? 45 : i % 5;
        const lastContact = new Date();
        lastContact.setDate(lastContact.getDate() - daysSinceLastContact);

        const assoc = await prisma.associado.create({
            data: {
                nome: `Associado ${i + 1}`,
                nivelRisco: risk,
                ultimaInteracao: lastContact,
                faltaConsecutivas: i % 7 === 0 ? 4 : 0,
                custoMensal: 500 + Math.random() * 1000,
            },
        });
        associados.push(assoc);
    }

    // Create Participations
    for (const assoc of associados) {
        await prisma.participacaoPrograma.create({
            data: {
                associadoId: assoc.id,
                programaId: Math.random() > 0.5 ? caurnAtiva.id : pdbcv.id,
            },
        });

        if (Math.random() > 0.7) {
            await prisma.participacaoPrograma.create({
                data: {
                    associadoId: assoc.id,
                    programaId: meta.id,
                },
            });
        }
    }

    // Create Global Indicators
    await prisma.indicadorGlobal.create({
        data: {
            nps: 9.7,
            sinistralidadeReducao: 0.184,
            atendimentosDigitais: 420,
        },
    });

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
