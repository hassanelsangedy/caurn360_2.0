"use server";

import { prisma } from "@/lib/db";

export async function getDashboardStats() {
    try {
        // 1. Dimension: APS Compliance
        const totalAssociados = await prisma.associado.count();
        const estratificados = await prisma.associado.count({
            where: { nivelRisco: { in: [1, 2, 3] } } // This logic depends on what we consider "estratificado"
        });

        const estratificacaoPercent = totalAssociados > 0 ? (estratificados / totalAssociados) * 100 : 0;

        // 2. Priority Alerts
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const priorityAlerts = await prisma.associado.count({
            where: {
                nivelRisco: 1,
                ultimaInteracao: { lt: thirtyDaysAgo }
            }
        });

        // 3. Menthal & Clinical Performance (Mock for Trend Chart)
        const mentalHealthData = [
            { name: "Jan", humor: 65, ansiedade: 40 },
            { name: "Fev", humor: 68, ansiedade: 38 },
            { name: "Mar", humor: 72, ansiedade: 35 },
            { name: "Abr", humor: 70, ansiedade: 32 },
            { name: "Mai", humor: 78, ansiedade: 28 },
            { name: "Jun", humor: 82, ansiedade: 25 },
        ];

        // 4. ROI & Sustainability
        const indicators = await prisma.indicadorGlobal.findFirst({
            orderBy: { data: 'desc' }
        });

        // 5. Operational (Occupancy & Activity Metrics)
        const occupancy = [
            { label: "Pilates", value: 92, color: "bg-health-blue", attendance: "94%", engagement: "82%" },
            { label: "Grupo Meta", value: 78, color: "bg-caurn-red", attendance: "88%", engagement: "75%" },
            { label: "Oficina Memória", value: 65, color: "bg-indigo-600", attendance: "72%", engagement: "60%" },
            { label: "Arte Terapia", value: 85, color: "bg-orange-500", attendance: "90%", engagement: "88%" },
            { label: "Hidroginástica", value: 70, color: "bg-cyan-500", attendance: "85%", engagement: "70%" },
            { label: "Cuidadores", value: 95, color: "bg-emerald-500", attendance: "98%", engagement: "92%" },
        ];

        return {
            estratificacaoPercent: estratificacaoPercent.toFixed(1) + "%",
            priorityAlerts,
            mentalHealthData,
            sinistralidadeReducao: indicators ? (indicators.sinistralidadeReducao * 100).toFixed(1) + "%" : "18.4%",
            atendimentosDigitais: indicators?.atendimentosDigitais || 420,
            nps: indicators?.nps || 9.7,
            occupancy
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return null;
    }
}

export async function getInactivityAlerts() {
    try {
        const alerts = await prisma.associado.findMany({
            where: {
                faltaConsecutivas: { gt: 3 }
            },
            include: {
                participacoes: {
                    include: {
                        programa: true
                    },
                    where: { status: "Ativo" },
                    take: 1
                }
            },
            take: 10
        });

        return alerts.map(a => ({
            id: a.id.substring(0, 3),
            name: a.nome,
            group: a.participacoes[0]?.programa?.nome || "Geral",
            missed: a.faltaConsecutivas,
            lastContact: a.ultimaInteracao?.toLocaleDateString('pt-BR') || "N/A",
            status: a.faltaConsecutivas > 4 ? "Crítico" : "Alerta",
            color: a.faltaConsecutivas > 4 ? "text-red-600 bg-red-50" : "text-orange-600 bg-orange-50"
        }));
    } catch (error) {
        console.error("Error fetching inactivity alerts:", error);
        return [];
    }
}
export async function getProgramActivityMetrics() {
    try {
        const programs = await prisma.programa.findMany();

        // In a real app, we'd aggregate participations and interactions
        // For now, we'll return enriched data for each program
        return [
            { id: "nutricao-ativa", name: "Nutrição Ativa", category: "Nutricional", metrics: { attendance: "92%", engagement: "High", improvement: "+14%", activeMembers: 35 }, status: "success" },
            { id: "bem-viver", name: "Grupo Bem Viver", category: "Psicossocial", metrics: { attendance: "85%", engagement: "Strong", improvement: "+22%", activeMembers: 24 }, status: "success" },
            { id: "memoria", name: "Grupo da Memória", category: "Cognitivo", metrics: { attendance: "78%", engagement: "Moderate", improvement: "+18%", activeMembers: 18 }, status: "warning" },
            { id: "pilates", name: "Grupo de Pilates", category: "Reabilitação", metrics: { attendance: "96%", engagement: "High", improvement: "+30%", activeMembers: 40 }, status: "success" },
            { id: "cuidadores", name: "Grupo de Cuidadores", category: "Suporte", metrics: { attendance: "82%", engagement: "Strong", improvement: "+15%", activeMembers: 12 }, status: "success" },
            { id: "meta", name: "Grupo Meta", category: "Nutricional", metrics: { attendance: "88%", engagement: "High", improvement: "-10% BMI", activeMembers: 22 }, status: "success" },
            { id: "hidrotreinamento", name: "Hidro / Treinamento", category: "Reabilitação", metrics: { attendance: "91%", engagement: "Moderate", improvement: "+12%", activeMembers: 28 }, status: "success" },
            { id: "danca", name: "Grupo de Dança", category: "Reabilitação", metrics: { attendance: "89%", engagement: "High", improvement: "+20%", activeMembers: 25 }, status: "success" },
            { id: "arte-terapia", name: "Arte Terapia", category: "Psicossocial", metrics: { attendance: "75%", engagement: "High", improvement: "+25%", activeMembers: 15 }, status: "warning" },
            { id: "caurn-personal-digital", name: "Caurn Personal Digital", category: "Digital", metrics: { attendance: "98%", engagement: "Elite", improvement: "+40%", activeMembers: 145 }, status: "success" },
            { id: "caurn-ativa-presencial", name: "Treino Funcional e Yoga", category: "Reabilitação", metrics: { attendance: "84%", engagement: "Strong", improvement: "+18%", activeMembers: 32 }, status: "success" },
            { id: "recomecar-aconselhamento", name: "Recomeçar - Aconselhamento", category: "Suporte", metrics: { attendance: "90%", engagement: "Strong", improvement: "+28%", activeMembers: 20 }, status: "success" },
        ];
    } catch (error) {
        console.error("Error fetching program metrics:", error);
        return [];
    }
}
