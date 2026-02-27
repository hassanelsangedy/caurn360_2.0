"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    LayoutDashboard,
    Activity,
    Settings,
    ShieldCheck,
    ArrowRight,
    Users,
    TrendingUp,
    BarChart3
} from "lucide-react";
import Link from "next/link";

export default function ProfessionalHubPage() {
    return (
        <AppShell title="Hub Profissional" fullWidth>
            <div className="max-w-5xl mx-auto space-y-12 py-10 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header Welcome */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Acesso Nível Executivo
                    </div>
                    <h1 className="text-5xl font-black text-caurn-dark tracking-tighter">Painel de Controle</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Bem-vindo ao centro de comando da CAURN 360. Selecione a área de atuação para monitoramento e gestão populacional.
                    </p>
                </div>

                {/* Main Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Access to DASHBOARD/MAP (Gestão 360) */}
                    <Link
                        href="/profissional/dashboard"
                        className="group relative bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-caurn-red/10 transition-all flex flex-col h-[400px] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-caurn-red/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-caurn-red/10 transition-colors" />

                        <div className="w-20 h-20 bg-red-50 text-caurn-red rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm">
                            <LayoutDashboard className="w-10 h-10" />
                        </div>

                        <div className="space-y-4 flex-1">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Gestão 360 (BI)</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Visualize indicadores globais, ROI, sinistralidade e métricas de saúde populacional em tempo real.
                            </p>
                            <ul className="space-y-2 pt-4">
                                <li className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <TrendingUp className="w-4 h-4 text-caurn-red" />
                                    Métricas de Sustentabilidade
                                </li>
                                <li className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <Users className="w-4 h-4 text-caurn-red" />
                                    Alertas de Busca Ativa
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 flex items-center gap-2 text-caurn-red font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                            Acessar Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>

                    {/* Access to PROGRAMAS */}
                    <Link
                        href="/profissional/programas"
                        className="group relative bg-caurn-dark rounded-[48px] p-10 shadow-2xl shadow-slate-900/40 hover:shadow-caurn-red/20 transition-all flex flex-col h-[400px] overflow-hidden text-white"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20" />

                        <div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg border border-white/10">
                            <Activity className="w-10 h-10 text-caurn-red" />
                        </div>

                        <div className="space-y-4 flex-1">
                            <h2 className="text-3xl font-black tracking-tight">Monitoramento</h2>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Acompanhe o desempenho técnico de cada atividade, frequência dos participantes e evolução clínica.
                            </p>
                            <ul className="space-y-2 pt-4">
                                <li className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <BarChart3 className="w-4 h-4 text-white" />
                                    Adesão e Engajamento
                                </li>
                                <li className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    Eficiência por Atividade
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                            Gerenciar Programas
                            <ArrowRight className="w-5 h-5 text-caurn-red" />
                        </div>
                    </Link>

                </div>

                {/* Secondary Access (Gestor Area) */}
                <div className="pt-4">
                    <Link
                        href="/dashboard/gestor"
                        className="w-full flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-white hover:border-caurn-red/20 transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <Settings className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">Acesso à Área do Gestor</h3>
                                <p className="text-xs text-slate-400 font-medium font-bold">Relatórios administrativos e performance técnica avançada</p>
                            </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-caurn-red transition-colors" />
                    </Link>
                </div>

            </div>
        </AppShell>
    );
}
