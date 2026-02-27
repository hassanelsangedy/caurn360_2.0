"use client";

import { Building2, ArrowRight, Lock, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfessionalLoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ user: "", pass: "" });
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating auth for demo
        setTimeout(() => {
            router.push("/profissional/hub");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-caurn-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements for professional feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-caurn-red/10 blur-[120px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full -ml-16 -mb-16" />

            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-lg">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Profissional</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">Acesso Restrito • CAURN 360</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Usuário / Registro</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-caurn-dark transition-colors" />
                            <input
                                type="text"
                                placeholder="E-mail ou CRM/Registro"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-800 focus:border-caurn-dark focus:bg-white outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-caurn-dark transition-colors" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-800 focus:border-caurn-dark focus:bg-white outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-caurn-dark text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Autenticar
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-4 border-t border-slate-50 flex flex-col items-center gap-4 text-center">
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                        Este portal é de uso exclusivo de profissionais autorizados.<br />
                        Acesso monitorado e regido pela LGPD.
                    </p>
                </div>
            </div>

            <button
                onClick={() => router.push("/login")}
                className="mt-8 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors"
            >
                Voltar para Seleção de Perfil
            </button>
        </div>
    );
}
