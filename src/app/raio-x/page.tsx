"use client";

import { AppShell } from "@/components/layout/AppShell";
import { FileText, Download, UploadCloud, CalendarClock } from "lucide-react";

export default function RaioXPage() {
    return (
        <AppShell title="Raio-X (Prontuário)" showBottomNav={true}>
            <div className="space-y-6 pb-20 pt-4 animate-in fade-in slide-in-from-left-4 duration-500">
                {/* Upload Action */}
                <button className="w-full border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-blue-100 hover:border-blue-400 transition-all">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                        <span className="font-bold block">Adicionar Novo Exame</span>
                        <span className="text-xs text-blue-500">Faça o upload de PDFs do seu laboratório</span>
                    </div>
                </button>

                {/* History Section */}
                <h3 className="font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                    <CalendarClock className="w-5 h-5 text-slate-400" />
                    Histórico Clínico
                </h3>

                <div className="space-y-4">
                    {/* Mock Item 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm truncate">Exame de Sangue Completo</h4>
                            <p className="text-xs text-slate-500">Laboratório DNA Center • 12 Out 2025</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mock Item 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm truncate">Relatório da Triagem Avaliação CAURN</h4>
                            <p className="text-xs text-slate-500">Sistema Automático • 01 Set 2025</p>
                            <div className="mt-1 flex gap-2">
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">Fase 1.1</span>
                            </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                </div>

            </div>
        </AppShell>
    );
}
