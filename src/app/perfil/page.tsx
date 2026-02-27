"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    User,
    Settings,
    LogOut,
    Shield,
    Users,
    ChevronRight,
    Bell,
    CreditCard,
    ChevronLeft,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PerfilPage() {
    const router = useRouter();

    const menuItems = [
        {
            title: "Dados Pessoais",
            icon: User,
            href: "#",
            color: "text-blue-600 bg-blue-50"
        },
        {
            title: "Carteira Digital",
            icon: CreditCard,
            href: "#",
            color: "text-emerald-600 bg-emerald-50"
        },
        {
            title: "Notificações",
            icon: Bell,
            href: "#",
            color: "text-orange-600 bg-orange-50"
        },
        {
            title: "Privacidade e Segurança",
            icon: Shield,
            href: "#",
            color: "text-purple-600 bg-purple-50"
        }
    ];

    const profileActions = [
        {
            title: "Alterar Perfil (Switch Role)",
            description: "Mudar entre Associado, Profissional ou Gestor",
            icon: RefreshCw,
            href: "/login",
            color: "text-caurn-red bg-red-50"
        },
        {
            title: "Configurações do App",
            description: "Preferências e ajustes gerais",
            icon: Settings,
            href: "#",
            color: "text-slate-600 bg-slate-50"
        }
    ];

    return (
        <AppShell title="Meu Perfil" showBottomNav={true}>
            <div className="max-w-md mx-auto pt-4 px-4 space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-caurn-dark active:scale-90 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-black text-caurn-dark">Meu Perfil</h2>
                </div>

                {/* User Card */}
                <div className="bg-caurn-dark rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-caurn-red/10 blur-3xl rounded-full -mr-20 -mt-20" />

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-4 border border-white/20 p-1">
                            <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                                <User className="w-12 h-12 text-slate-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black">João da Silva</h3>
                        <p className="text-caurn-red text-xs font-bold uppercase tracking-widest mt-1">Associado Titular</p>
                        <div className="mt-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-tight text-slate-300">
                            ID: 000.360.2024
                        </div>
                    </div>
                </div>

                {/* Account Menu */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Conta</h4>
                    <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={`flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-slate-50' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">{item.title}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Actions Menu */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Ações</h4>
                    <div className="grid gap-4">
                        {profileActions.map((action, i) => (
                            <Link
                                key={i}
                                href={action.href}
                                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-caurn-red/30 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${action.color}`}>
                                        <action.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-slate-800 text-sm">{action.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{action.description}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-caurn-red group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => router.push('/login')}
                    className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-caurn-red rounded-[32px] font-black text-sm hover:bg-red-100 transition-all active:scale-95 group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Sair da Conta
                </button>

                <div className="text-center">
                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">Caurn 360 • v2.0.4</p>
                </div>

            </div>
        </AppShell>
    );
}
