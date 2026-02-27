// We need to write the onboarding steps.
"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, UserCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            router.push("/dashboard/associado"); // Navigate to the patient dashboard upon completion
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-slate-200">
                <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            {/* Header */}
            <div className="p-6 flex items-center pt-8">
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}
                <div className="flex-1" />
                <span className="text-sm font-bold text-slate-400">PASSO {step} DE 3</span>
            </div>

            {/* Content Area */}
            <div className="flex-1 px-8 pb-32">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 mt-4">
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8">
                            <UserCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">Bem-vindo(a) ao<br />CAURN 360</h2>
                        <p className="text-slate-500 text-lg">Um novo conceito em gestão de saúde, totalmente focado na sua vitalidade.</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 mt-4">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">Mapeie seu risco.</h2>
                        <p className="text-slate-500 text-lg">Responda a avaliações digitais e entenda como pequenas mudanças de hábitos trazem grandes resultados.</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 mt-4">
                        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 pr-1 pt-1">
                            <span className="text-3xl">🎮</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">Saúde Gamificada</h2>
                        <p className="text-slate-500 text-lg">Acompanhe sua evolução pelo *Mapa da Vitalidade*, ganhe XP e desbloqueie acessos a programas exclusivos da CAURN.</p>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
                <button
                    onClick={handleNext}
                    className="w-full h-14 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30"
                >
                    {step === 3 ? "Acessar Meu Painel" : "Continuar"}
                    {step < 3 && <ArrowRight className="w-5 h-5" />}
                </button>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-sm text-slate-400 font-medium hover:text-slate-600">
                        Voltar para Início
                    </Link>
                </div>
            </div>
        </div>
    );
}
