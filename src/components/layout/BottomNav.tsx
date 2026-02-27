"use client";

import { Home, ClipboardList, Activity, Map, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();
    const isProfessional = pathname?.startsWith('/profissional') || pathname?.startsWith('/dashboard/gestor');

    const navItems = isProfessional ? [
        { href: "/profissional/hub", icon: ShieldCheck, label: "Hub" },
        { href: "/profissional/dashboard", icon: Map, label: "Gestão 360" },
        { href: "/profissional/programas", icon: Activity, label: "Programas" },
        { href: "/dashboard/gestor", icon: Home, label: "Área Gestor" },
    ] : [
        { href: "/dashboard/associado", icon: Map, label: "Mapa" },
        { href: "/avaliacao-digital", icon: ClipboardList, label: "Triagem" },
        { href: "/programas", icon: Activity, label: "Programas" },
        { href: "/avaliacao", icon: Home, label: "Saúde 360" },
    ];

    return (
        <div className="fixed bottom-6 inset-x-4 z-50 flex justify-center">
            <nav className="h-16 bg-white/80 backdrop-blur-md border border-slate-200 shadow-2xl shadow-blue-900/10 rounded-3xl px-6 w-full max-w-md">
                <ul className="flex items-center justify-between h-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all ${isActive ? 'text-caurn-red scale-105' : 'text-slate-400 hover:text-slate-600 hover:scale-105'}`}
                                >
                                    <Icon className={`w-5 h-5 transition-transform`} />
                                    <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
