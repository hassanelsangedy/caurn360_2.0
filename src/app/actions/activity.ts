"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitCheckIn(data: {
    participacaoId: string;
    presente: boolean;
    diario?: string;
    sentimento?: string;
    fotoEvidencia?: string;
}) {
    try {
        const checkIn = await prisma.frequencia.create({
            data: {
                participacaoId: data.participacaoId,
                presente: data.presente,
                diario: data.diario,
                sentimento: data.sentimento,
                fotoEvidencia: data.fotoEvidencia,
                data: new Date()
            }
        });

        // Trigger notification if high risk associate (mock logic)
        const participacao = await prisma.participacaoPrograma.findUnique({
            where: { id: data.participacaoId },
            include: { associado: true, programa: true }
        });

        if (participacao?.associado.nivelRisco === 1) {
            console.log(`[ALERT] High Risk Associate ${participacao.associado.nome} checked in for ${participacao.programa.nome}`);
        }

        revalidatePath("/dashboard/associado");
        return { success: true, data: checkIn };
    } catch (error) {
        console.error("Check-in error:", error);
        return { success: false, error: "Failed to submit check-in" };
    }
}

export async function createPost(data: {
    participacaoId: string;
    programaId: string;
    conteudo?: string;
    imagemUrl?: string;
    tipo?: "Social" | "Evidencia";
}) {
    try {
        const participacao = await prisma.participacaoPrograma.findUnique({
            where: { id: data.participacaoId },
            include: { programa: true }
        });

        if (!participacao) throw new Error("Participation not found");

        const visibilidade = participacao.programa.isPrivate ? "Privado" : "Publico";

        const post = await prisma.postagem.create({
            data: {
                programaId: data.programaId,
                participacaoId: data.participacaoId,
                conteudo: data.conteudo,
                imagemUrl: data.imagemUrl,
                tipo: data.tipo || "Social",
                visibilidade: visibilidade
            }
        });

        revalidatePath(`/programas/${data.programaId}`);
        return { success: true, data: post };
    } catch (error) {
        console.error("Post creation error:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function createComment(data: {
    postagemId: string;
    autorId: string;
    autorNome: string;
    autorTipo: "Profissional" | "Associado";
    texto: string;
}) {
    try {
        const comment = await prisma.comentario.create({
            data: {
                postagemId: data.postagemId,
                autorId: data.autorId,
                autorNome: data.autorNome,
                autorTipo: data.autorTipo,
                texto: data.texto
            }
        });

        return { success: true, data: comment };
    } catch (error) {
        console.error("Comment error:", error);
        return { success: false, error: "Failed to submit comment" };
    }
}

export async function updateConsent(participacaoId: string, consent: { usoImagem: boolean; usoVoz: boolean }) {
    try {
        await prisma.participacaoPrograma.update({
            where: { id: participacaoId },
            data: {
                usoImagemConsentimento: consent.usoImagem,
                usoVozConsentimento: consent.usoVoz
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Consent update error:", error);
        return { success: false };
    }
}

export async function getActivityFeed(programaId: string, associadoId?: string) {
    try {
        const programa = await prisma.programa.findUnique({
            where: { id: programaId }
        });

        if (!programa) return [];

        // If private, only show if it's the specific associate's post or user is professional
        // For now, simplify logic to fetch all visible posts
        const posts = await prisma.postagem.findMany({
            where: {
                programaId: programaId,
                OR: [
                    { visibilidade: "Publico" },
                    associadoId ? { participacao: { associadoId } } : {}
                ]
            },
            include: {
                participacao: { include: { associado: true } },
                comentarios: { orderBy: { createdAt: "asc" } },
                reacoes: true
            },
            orderBy: { createdAt: "desc" }
        });

        return posts;
    } catch (error) {
        console.error("Feed fetch error:", error);
        return [];
    }
}
