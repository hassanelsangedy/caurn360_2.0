"use client";

import { Building2, UserCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[grid-slate-200/[0.05]] bg-[size:40px_40px]">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden p-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 border border-slate-100">

                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-4">
                        <img src="/images/caurn-logo.png" alt="CAURN Logo" className="h-20 w-auto object-contain" />
                        <div className="w-px h-12 bg-slate-200" />
                        <img src="/images/psicofisio-logo.png" alt="PsicoFisio Logo" className="h-20 w-auto object-contain" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-caurn-dark tracking-tight">CAURN 360</h1>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Vitalidade e Saúde Preventiva</p>
                </div>

                <div className="space-y-4 pt-4">
                    <Link
                        href="/onboarding"
                        className="group flex items-center p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-caurn-red hover:shadow-xl hover:shadow-red-500/5 transition-all"
                    >
                        <div className="w-14 h-14 bg-red-50 text-caurn-red rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                            <UserCircle2 className="w-7 h-7" />
                        </div>
                        <div className="ml-5 flex-1 text-left">
                            <h3 className="font-black text-slate-800 text-lg">Sou Associado</h3>
                            <p className="text-xs text-slate-500 font-medium">Paciente titular ou dependente</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-caurn-red group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                        href="/profissional/login"
                        className="group flex items-center p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-caurn-dark hover:shadow-xl hover:shadow-slate-900/5 transition-all"
                    >
                        <div className="w-14 h-14 bg-slate-50 text-caurn-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                            <Building2 className="w-7 h-7" />
                        </div>
                        <div className="ml-5 flex-1 text-left">
                            <h3 className="font-black text-slate-800 text-lg">Sou Profissional</h3>
                            <p className="text-xs text-slate-500 font-medium">Médico, Especialista ou Avaliador</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-caurn-dark group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="w-12 h-1 bg-slate-100 rounded-full" />
                    <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        Demo Mode • Phase 2 MVP
                    </p>
                </div>
            </div>
        </div>
    );
}
