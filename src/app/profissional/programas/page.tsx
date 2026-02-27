"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    Activity,
    Users,
    Calendar,
    Filter,
    Search,
    TrendingUp,
    ArrowUpRight,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getProgramActivityMetrics } from "@/app/actions/dashboard";

export default function ProfessionalProgramsPage() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getProgramActivityMetrics();
                setActivities(data);
            } catch (error) {
                console.error("Failed to load activities:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredActivities = selectedCategory === "all"
        ? activities
        : activities.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-caurn-red border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Acessando Monitoramento...</p>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="Monitoramento por Atividade" fullWidth>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-caurn-dark tracking-tighter leading-none">Gestão de Programas</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-3">Métricas de Monitoramento por Atividade</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="text-xs font-black bg-transparent outline-none uppercase text-slate-700 cursor-pointer"
                            >
                                <option value="all">Todas as Categorias</option>
                                <option value="reabilitação">Reabilitação</option>
                                <option value="nutricional">Nutricional</option>
                                <option value="cognitivo">Cognitivo</option>
                                <option value="psicossocial">Psicossocial</option>
                                <option value="suporte">Suporte</option>
                                <option value="digital">Digital</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredActivities.map((activity) => (
                        <div key={activity.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-3xl ${activity.status === 'success' ? 'bg-emerald-50 text-health-green' : 'bg-amber-50 text-amber-600'}`}>
                                    <Activity className="w-6 h-6" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${activity.status === 'success' ? 'bg-emerald-100/50 text-health-green' : 'bg-amber-100/50 text-amber-600'}`}>
                                    {activity.status === 'success' ? 'Performance Estável' : 'Atenção Necessária'}
                                </span>
                            </div>

                            <div className="mb-8">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{activity.category}</p>
                                <h3 className="text-2xl font-black text-caurn-dark mt-2 tracking-tight">{activity.name}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-slate-50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Presença</p>
                                    <p className="text-lg font-black text-slate-800">{activity.metrics.attendance}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Melhora</p>
                                    <p className={`text-lg font-black ${activity.metrics.improvement.includes('-') && activity.category === 'Nutricional' ? 'text-health-green' : 'text-health-green'}`}>
                                        {activity.metrics.improvement}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Participantes</p>
                                    <p className="text-lg font-black text-slate-800">{activity.metrics.activeMembers}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Engajamento</p>
                                    <p className="text-lg font-black text-slate-800">{activity.metrics.engagement}</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link
                                    href={`/profissional/programas/${activity.id}`}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-2xl text-xs font-black text-slate-600 hover:bg-caurn-red hover:text-white transition-all shadow-sm group-hover:bg-slate-100"
                                >
                                    Gerenciar Atividade
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Global Benchmark Section */}
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-caurn-red/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="space-y-4 max-w-xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Performance Global APS</span>
                            </div>
                            <h2 className="text-4xl font-black tracking-tight">Adesão Média aos Programas: <span className="text-emerald-400">89.4%</span></h2>
                            <p className="text-slate-400 font-medium">Os indicadores mostram um aumento de 12% no engajamento digital comparado ao último trimestre, reduzindo o custo assistencial por paciente.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 text-center min-w-[160px]">
                                <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Total de Grupos</p>
                                <p className="text-4xl font-black">12</p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 text-center min-w-[160px]">
                                <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Participantes</p>
                                <p className="text-4xl font-black">342</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
