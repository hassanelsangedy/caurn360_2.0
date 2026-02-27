"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Lock, Unlock, ArrowRight, HeartPulse, Brain, Zap, Utensils, Activity, Users, Music, Waves, Palette, Dumbbell, Heart, Info, MonitorPlay, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Program {
    id: string;
    name: string;
    proposal: string;
    project: "CaurnAtiva" | "DBCV";
    icon: any;
    color: string;
    target: string;
    isAvailable: boolean;
}

export default function ProgramasPage() {
    // Evaluation is no longer mandatory for seeing/participating in the demo flow
    const [hasCompletedEvaluation] = useState(false);

    const programs: Program[] = [
        {
            id: "nutricao-ativa",
            name: "Nutrição Ativa",
            proposal: "Promover alimentação equilibrada, saudável e saborosa.",
            project: "DBCV",
            icon: Utensils,
            color: "orange",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "bem-viver",
            name: "Grupo Bem Viver",
            proposal: "Autoestima, autonomia e interação social para idosos.",
            project: "DBCV",
            icon: Users,
            color: "blue",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "memoria",
            name: "Grupo da Memória",
            proposal: "Preservar e melhorar funções cognitivas.",
            project: "DBCV",
            icon: Brain,
            color: "purple",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "pilates",
            name: "Grupo de Pilates",
            proposal: "Fortalecimento, flexibilidade e mobilidade articular.",
            project: "DBCV",
            icon: Dumbbell,
            color: "emerald",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "cuidadores",
            name: "Grupo de Cuidadores",
            proposal: "Acolher, orientar e realizar trocas de experiências.",
            project: "DBCV",
            icon: Heart,
            color: "red",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "meta",
            name: "Grupo Meta",
            proposal: "Apoio ao emagrecimento com estratégias saudáveis.",
            project: "DBCV",
            icon: Zap,
            color: "yellow",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "hidrotreinamento",
            name: "Grupo de Hidrotreinamento",
            proposal: "Exercícios aquáticos para diminuir potencial de quedas.",
            project: "DBCV",
            icon: Waves,
            color: "blue",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "danca",
            name: "Grupo da Dança",
            proposal: "Hábitos saudáveis e vínculos sociais através da dança.",
            project: "DBCV",
            icon: Music,
            color: "purple",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "arte-terapia",
            name: "Arte Terapia",
            proposal: "Recursos artísticos para aprimorar percepção e memória.",
            project: "DBCV",
            icon: Palette,
            color: "pink",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "caurn-personal-digital",
            name: "Caurn Personal Digital",
            proposal: "Treino em casa para iniciantes com envio via Whatsapp.",
            project: "CaurnAtiva",
            icon: MonitorPlay,
            color: "emerald",
            target: "Adultos e Idosos",
            isAvailable: true
        },
        {
            id: "caurn-ativa-presencial",
            name: "Treino Funcional e Yoga",
            proposal: "Atividade presencial que alterna funcional e yoga.",
            project: "CaurnAtiva",
            icon: Activity,
            color: "blue",
            target: "Exclusivo para Idosos 60+",
            isAvailable: true
        },
        {
            id: "recomecar-aconselhamento",
            name: "Recomeçar - Aconselhamento",
            proposal: "Aumentar nível de atividade física e reduzir sedentarismo.",
            project: "CaurnAtiva",
            icon: MessageSquare,
            color: "blue",
            target: "Adultos e Idosos",
            isAvailable: true
        }
    ];

    return (
        <AppShell title="Programas" showBottomNav={true}>
            <div className="max-w-md mx-auto space-y-6 pb-24 pt-4 px-2 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="bg-caurn-dark rounded-[32px] p-6 text-white relative overflow-hidden mb-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-caurn-red opacity-30 blur-3xl -mr-16 -mt-16 rounded-full" />
                    <h2 className="text-xl font-black mb-2 relative z-10">Explorar Programas</h2>
                    <p className="text-xs text-slate-400 font-medium relative z-10 leading-relaxed">
                        Escolha a atividade que mais combina com você. Inscrições abertas para todos os perfis indicados.
                    </p>
                </div>

                <div className="grid gap-4">
                    {programs.map((prog) => {
                        const Icon = prog.icon;
                        const colorClass = prog.color === "emerald" ? "emerald" : "blue";

                        return (
                            <div key={prog.id} className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={colorClass === "emerald"
                                        ? "p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform"
                                        : "p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform"
                                    }>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-1 ${prog.project === 'CaurnAtiva' ? 'bg-slate-900 text-white border-slate-800' : 'bg-red-50 text-caurn-red border-red-100'}`}>
                                            {prog.project}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-800">{prog.name}</h3>
                                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed line-clamp-2">{prog.proposal}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{prog.target}</span>
                                    </div>

                                    <Link
                                        href={`/programas/${prog.id}`}
                                        className={colorClass === "emerald"
                                            ? "bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                            : "bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                        }
                                    >
                                        Saber Mais
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppShell>
    );
}
