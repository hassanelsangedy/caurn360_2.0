import { Bell, ChevronLeft, Menu, User } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
    title?: string;
    showBackButton?: boolean;
    onBack?: () => void;
}

export function TopBar({ title = "Saúde 360", showBackButton, onBack }: TopBarProps) {
    return (
        <header className="fixed top-0 inset-x-0 h-24 bg-white border-b border-slate-100 z-50 flex items-center justify-between px-4 lg:px-8 shadow-sm">
            <div className="flex-1 flex items-center">
                {showBackButton && (
                    <button onClick={onBack} className="p-2 -ml-2 text-caurn-dark hover:bg-slate-50 rounded-full transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-6 justify-center">
                <Link href="/dashboard/associado">
                    <img src="/images/caurn-logo.png" alt="CAURN Logo" className="h-20 w-auto object-contain" />
                </Link>
                <div className="w-px h-12 bg-slate-200" />
                <img src="/images/psicofisio-logo.png" alt="PsicoFisio Logo" className="h-20 w-auto object-contain" />
            </div>

            <div className="flex-1 flex items-center justify-end gap-3">
                <button className="p-2 text-slate-400 hover:text-caurn-red hover:bg-red-50 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-caurn-red rounded-full border-2 border-white"></span>
                </button>
                <Link href="/perfil" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-caurn-dark border border-slate-200 hover:border-caurn-red hover:text-caurn-red transition-all overflow-hidden">
                    <User className="w-6 h-6" />
                </Link>
            </div>
        </header>
    );
}
