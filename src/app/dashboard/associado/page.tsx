"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Flag, Star, Zap, CheckCircle2, ChevronRight, Share2, Map as MapIcon, Calendar, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PatientDashboard() {
    // Component to simulate gamified map phases
    // Component to simulate gamified map phases
    const PhaseNode = ({ phase, status, label, active, locked, href }: any) => {
        let bgColor = "bg-slate-200 text-slate-400";
        if (active) bgColor = "bg-caurn-red text-white shadow-lg shadow-red-500/40 ring-4 ring-red-100";
        else if (status === "done") bgColor = "bg-red-200 text-caurn-red";

        const content = (
            <div className={`relative flex flex-col items-center ${locked ? 'opacity-50' : 'cursor-pointer hover:scale-105 transition-transform'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg z-10 ${bgColor} transition-all`}>
                    {status === "done" ? <CheckCircle2 className="w-8 h-8" /> : phase}
                </div>
                <span className={`mt-2 text-xs font-semibold ${active ? 'text-caurn-red' : 'text-slate-500'}`}>{label}</span>
            </div>
        );

        if (locked || !href) return content;
        return <Link href={href}>{content}</Link>;
    };

    const userData = {
        name: "João",
        hasCompletedTriage: true,
        hasCompletedEvaluation: false
    };

    return (
        <AppShell title="Mapa da Vitalidade" showBottomNav={true}>
            <div className="space-y-6 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* User Stats Card */}
                <div className="bg-gradient-to-br from-caurn-dark to-slate-800 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8" />

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-sm">
                            <span className="text-2xl">👤</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Olá, {userData.name}!</h2>
                            <p className="text-red-400 text-sm">Nível 2 • Aventureiro da Saúde</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                            <div className="flex items-center gap-2 text-blue-100 text-xs font-medium mb-1">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                PONTOS XP
                            </div>
                            <span className="text-2xl font-black">1.450</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                            <div className="flex items-center gap-2 text-blue-100 text-xs font-medium mb-1">
                                <Star className="w-3 h-3 text-orange-400" />
                                RANKING
                            </div>
                            <span className="text-2xl font-black">Top 15%</span>
                        </div>
                    </div>
                </div>

                {/* Gamified Map Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                <MapIcon className="w-5 h-5 text-caurn-red" />
                                Sua Jornada
                            </h3>
                            <Link href="/gamificacao" className="text-xs text-caurn-red font-black uppercase tracking-tighter hover:underline">Como Funciona?</Link>
                        </div>
                        <div className="bg-red-50 text-caurn-red px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                            Fase Atual: {userData.hasCompletedEvaluation ? "3" : (userData.hasCompletedTriage ? "2" : "1")}
                        </div>
                    </div>

                    {/* The Path (Visual Representation) */}
                    <div className="relative py-4 flex justify-between items-center px-2">
                        {/* Connecting Line */}
                        <div className="absolute top-11 inset-x-8 h-2 bg-slate-100 rounded-full" />
                        <div className="absolute top-11 left-8 h-2 bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: userData.hasCompletedTriage ? (userData.hasCompletedEvaluation ? '100%' : '50%') : '0%' }} />

                        <PhaseNode
                            phase="1"
                            status={userData.hasCompletedTriage ? "done" : "active"}
                            label="Triagem"
                            active={!userData.hasCompletedTriage}
                            href={userData.hasCompletedTriage ? "/avaliacao" : "/avaliacao-digital"}
                        />
                        <PhaseNode
                            phase="2"
                            status={userData.hasCompletedEvaluation ? "done" : (userData.hasCompletedTriage ? "active" : "pending")}
                            label="Avaliação"
                            active={userData.hasCompletedTriage && !userData.hasCompletedEvaluation}
                            locked={!userData.hasCompletedTriage}
                            href="/avaliacao"
                        />
                        <PhaseNode
                            phase="3"
                            status="pending"
                            locked={!userData.hasCompletedEvaluation}
                            label="Programa"
                            href={userData.hasCompletedEvaluation ? "/programas" : null}
                        />
                    </div>

                    {/* Action Cards based on Phase */}
                    <div className="mt-8 space-y-3">
                        {userData.hasCompletedTriage && (
                            <Link href="/avaliacao" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-400 group transition-all opacity-70">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="font-bold text-slate-700 text-sm">Fase 1.1 Concluída</h4>
                                    <p className="text-xs text-slate-500">Triagem digital finalizada (ver resumo)</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </Link>
                        )}

                        {!userData.hasCompletedEvaluation && (
                            <div className="flex items-center p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl relative overflow-hidden shadow-sm">
                                <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-100 rounded-full blur-xl" />
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md relative z-10">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div className="ml-4 flex-1 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-caurn-dark text-sm">Agende sua Avaliação</h4>
                                        <span className="bg-red-100 text-caurn-red text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">Pendente</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-0.5">Visite a clínica para finalizar a Fase 1.2 e descobrir o seu escore biológico.</p>
                                </div>
                                <button className="ml-2 bg-caurn-red text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-red-600 active:scale-95 transition-all">
                                    Agendar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions (Hub) */}
                <h3 className="font-bold text-slate-800 px-2 text-sm uppercase tracking-wider">Acesso Rápido</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/avaliacao" className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                            <ClipboardList className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">Saúde 360</span>
                    </Link>
                    <Link href="/programas" className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                            <Flag className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">Programas</span>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}
