"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Registra o interesse de um associado em um programa.
 */
export async function registrarInteressePrograma(associadoId: string, programaId: string) {
    try {
        // Verifica se já existe uma requisição pendente ou aprovação
        const existente = await prisma.requisicaoPrograma.findFirst({
            where: {
                associadoId,
                programaId,
                status: { in: ["Pendente", "Aprovado"] }
            }
        });

        if (existente) {
            return { success: false, message: "Você já possui uma solicitação para este programa." };
        }

        await prisma.requisicaoPrograma.create({
            data: {
                associadoId,
                programaId,
                status: "Pendente",
            },
        });

        revalidatePath("/dashboard/associado");
        revalidatePath(`/programas/${programaId}`);
        return { success: true };
    } catch (error) {
        console.error("Erro ao registrar interesse:", error);
        return { success: false, message: "Erro interno ao processar solicitação." };
    }
}

/**
 * Lista requisições para o dashboard do profissional.
 */
export async function getRequisoesProgramas() {
    return await prisma.requisicaoPrograma.findMany({
        include: {
            associado: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

/**
 * Processa a decisão do profissional (Aprovar/Recusar).
 */
export async function decidirRequisicao(requisicaoId: string, status: "Aprovado" | "Recusado", feedback?: string) {
    try {
        const requisicao = await prisma.requisicaoPrograma.update({
            where: { id: requisicaoId },
            data: {
                status,
                feedbackProfissional: feedback,
            },
            include: {
                associado: true
            }
        });

        // Se aprovado, cria a participação oficial
        if (status === "Aprovado") {
            await prisma.participacaoPrograma.create({
                data: {
                    associadoId: requisicao.associadoId,
                    programaId: requisicao.programaId,
                    status: "Ativo",
                },
            });
        }

        revalidatePath("/profissional/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Erro ao decidir requisição:", error);
        return { success: false };
    }
}

/**
 * Registra presença (frequência) em um programa.
 */
export async function registrarPresenca(participacaoId: string, sentimento?: string) {
    try {
        // Verifica se já marcou presença hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const check = await prisma.frequencia.findFirst({
            where: {
                participacaoId,
                data: {
                    gte: hoje
                }
            }
        });

        if (check) return { success: false, message: "Presença já registrada hoje." };

        await prisma.frequencia.create({
            data: {
                participacaoId,
                sentimento,
                presente: true,
            },
        });

        revalidatePath("/dashboard/associado");
        return { success: true };
    } catch (error) {
        console.error("Erro ao registrar presença:", error);
        return { success: false };
    }
}
