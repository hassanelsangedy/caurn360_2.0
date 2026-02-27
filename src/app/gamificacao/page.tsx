"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    Zap,
    Target,
    Trophy,
    Star,
    ArrowRight,
    Gamepad2,
    CheckCircle2,
    TrendingUp,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GamificacaoExplainerPage() {
    const router = useRouter();

    const rules = [
        {
            title: "1. Triagem Digital",
            description: "Responda o questionário inicial e ganhe seus primeiros XP.",
            points: "+200 XP",
            icon: Target,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "2. Avaliação Clínica",
            description: "Receba dados reais e desbloqueie sua Idade Biológica.",
            points: "+500 XP",
            icon: Star,
            color: "bg-red-50 text-caurn-red"
        },
        {
            title: "3. Inscrição em Programas",
            description: "Escolha um acompanhamento e inicie sua trilha de saúde.",
            points: "+300 XP",
            icon: Zap,
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "4. Consistência Mensal",
            description: "Mantenha-se ativo e suba no ranking da CAURN.",
            points: "+1000 XP",
            icon: Trophy,
            color: "bg-caurn-dark text-white"
        }
    ];

    return (
        <AppShell title="Como Funciona" showBottomNav={true}>
            <div className="max-w-md mx-auto pt-4 px-4 space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header with Back Button Override */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-caurn-dark active:scale-90 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-caurn-dark">Gamificação</h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Entenda sua Jornada</p>
                    </div>
                </div>

                {/* Hero Graphic Section */}
                <div className="bg-white rounded-[40px] p-2 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden group">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 rounded-t-[38px] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Gamepad2 className="w-5 h-5 text-caurn-red" />
                            <span className="text-xs font-black text-caurn-dark uppercase tracking-tighter">Mapa da Saúde 360</span>
                        </div>
                        <span className="text-[10px] font-black bg-red-100 text-caurn-red px-3 py-1 rounded-full uppercase">Novo</span>
                    </div>

                    <div className="relative aspect-square">
                        <img
                            src="/images/gamificacao-info.png"
                            alt="Mapa Didático da Gamificação"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-caurn-dark/20 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Rules & Points Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-black text-caurn-dark flex items-center gap-2 uppercase text-sm tracking-widest">
                            <TrendingUp className="w-5 h-5 text-caurn-red" />
                            Regras e Pontuação
                        </h3>
                    </div>

                    <div className="grid gap-4">
                        {rules.map((rule, i) => (
                            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-red-100 transition-colors">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${rule.color}`}>
                                    <rule.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-800 text-sm">{rule.title}</h4>
                                        <span className="text-[10px] font-black text-caurn-red bg-red-50 px-2 py-0.5 rounded-md">{rule.points}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                                        {rule.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-caurn-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-caurn-dark/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-caurn-red/20 blur-3xl rounded-full" />
                    <CheckCircle2 className="w-10 h-10 mb-4 text-caurn-red" />
                    <h3 className="text-xl font-black mb-2">Pronto para começar?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">Suas conquistas desbloqueiam benefícios reais no plano de saúde.</p>

                    <Link href="/dashboard/associado" className="flex items-center justify-center gap-2 w-full bg-white text-caurn-dark py-4 rounded-2xl font-black text-xs uppercase tracking-tight hover:scale-105 transition-transform shadow-lg group">
                        Voltar ao Mapa
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </AppShell>
    );
}
