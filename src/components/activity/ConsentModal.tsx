"use client";

import { useState } from "react";
import { ShieldCheck, Camera, Headphones, X, ChevronRight, Check } from "lucide-react";

interface ConsentModalProps {
    onAccept: (consent: { usoImagem: boolean; usoVoz: boolean }) => void;
    onClose: () => void;
}

export function ConsentModal({ onAccept, onClose }: ConsentModalProps) {
    const [consent, setConsent] = useState({
        usoImagem: false,
        usoVoz: false
    });

    const isAccepted = consent.usoImagem && consent.usoVoz;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-caurn-red opacity-20 blur-3xl -mr-8 -mt-8" />
                    <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                        <ShieldCheck className="w-8 h-8 text-caurn-red" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight leading-none mb-2">Termo de Consentimento</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest border-l-2 border-caurn-red pl-4">Conformidade LGPD</p>
                </div>

                <div className="p-8 space-y-8">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Para participar de nossas atividades e compartilhar seu progresso com a comunidade e profissionais, solicitamos sua autorização para o uso de mídia.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => setConsent({ ...consent, usoImagem: !consent.usoImagem })}
                            className={`w-full flex items-start gap-4 p-5 rounded-3xl border-2 transition-all text-left ${consent.usoImagem ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 ${consent.usoImagem ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                                {consent.usoImagem && <Check className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-black uppercase ${consent.usoImagem ? 'text-emerald-900' : 'text-slate-800'}`}>Uso de Imagem</h4>
                                <p className="text-[11px] text-slate-500 font-medium mt-1">Autorizo o registro fotográfico de treinos e atividades para uso exclusivo no mural do programa.</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setConsent({ ...consent, usoVoz: !consent.usoVoz })}
                            className={`w-full flex items-start gap-4 p-5 rounded-3xl border-2 transition-all text-left ${consent.usoVoz ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 ${consent.usoVoz ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                                {consent.usoVoz && <Check className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-black uppercase ${consent.usoVoz ? 'text-emerald-900' : 'text-slate-800'}`}>Uso de Voz / Depoimentos</h4>
                                <p className="text-[11px] text-slate-500 font-medium mt-1">Autorizo a gravação de áudio e transcrição de depoimentos sobre minha evolução clínica.</p>
                            </div>
                        </button>
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                        <button
                            onClick={() => onAccept(consent)}
                            disabled={!isAccepted}
                            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 ${isAccepted ? 'bg-caurn-red text-white shadow-red-500/20 active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                        >
                            Confirmar Inscrição
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <p className="text-[9px] text-center text-slate-400 font-bold uppercase">
                            Você pode revogar este consentimento a qualquer momento no perfil.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
