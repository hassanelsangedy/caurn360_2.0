"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    Activity,
    Users,
    Calendar,
    BarChart3,
    MessageSquare,
    MoreVertical,
    Trash2,
    FileDown,
    ShieldAlert,
    TrendingUp,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getActivityFeed } from "@/app/actions/activity";

export default function ProfessionalActivityManagementPage() {
    const params = useParams();
    const id = params.id as string;
    const [feed, setFeed] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFeed() {
            const data = await getActivityFeed(id);
            setFeed(data);
            setLoading(false);
        }
        loadFeed();
    }, [id]);

    const stats = {
        name: id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        activeMembers: 42,
        avgEngagement: "89%",
        attendanceRate: "94%",
        clinicalEvolution: "+18%"
    };

    return (
        <AppShell title="Gestão de Atividade" fullWidth>
            <div className="max-w-6xl mx-auto space-y-8 py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

                <Link href="/profissional/programas" className="flex items-center gap-1 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Voltar para Programas
                </Link>

                {/* Header with quick stats */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-health-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-100">
                            <Activity className="w-3.5 h-3.5" />
                            Operação Ativa
                        </div>
                        <h1 className="text-4xl font-black text-caurn-dark tracking-tight leading-none group">
                            Monitoramento: {stats.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <FileDown className="w-4 h-4" />
                            Exportar Relatório Mensal
                        </button>
                    </div>
                </div>

                {/* BI Dashboard Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Participantes", value: stats.activeMembers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Taxa de Presença", value: stats.attendanceRate, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Engajamento", value: stats.avgEngagement, icon: TrendingUp, color: "text-caurn-red", bg: "bg-red-50" },
                        { label: "Evolução Clin.", value: stats.clinicalEvolution, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-800 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Moderation Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-black text-caurn-dark uppercase tracking-widest flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Moderação do Mural
                        </h3>

                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-3xl" />)}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {feed.length === 0 ? (
                                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
                                        <p className="text-xs font-black text-slate-400 uppercase">Nenhuma interação recente no mural</p>
                                    </div>
                                ) : (
                                    feed.map((post: any) => (
                                        <div key={post.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group">
                                            <div className="p-6 flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">
                                                        {post.participacao.associado.nome.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800">{post.participacao.associado.nome}</h4>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Postado em {new Date(post.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-caurn-red transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="px-6 pb-6 space-y-4">
                                                <p className="text-sm font-medium text-slate-600 leading-relaxed">{post.conteudo}</p>
                                                {post.imagemUrl && (
                                                    <div className="rounded-2xl overflow-hidden border border-slate-100 h-64">
                                                        <img src={post.imagemUrl} alt="Post" className="w-full h-full object-cover" />
                                                    </div>
                                                )}

                                                {/* Comments */}
                                                <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                                                    {post.comentarios.map((c: any) => (
                                                        <div key={c.id} className="flex justify-between items-start">
                                                            <p className="text-xs text-slate-600">
                                                                <strong className="text-slate-800 font-black uppercase text-[9px] mr-2">{c.autorNome}:</strong>
                                                                {c.texto}
                                                            </p>
                                                            <button className="text-slate-300 hover:text-caurn-red transition-colors">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div className="pt-2 flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Responder como profissional..."
                                                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-[11px] font-medium outline-none focus:border-caurn-red"
                                                        />
                                                        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Responder</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Active Warnings & Alerts */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-caurn-dark uppercase tracking-widest flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-caurn-red" />
                            Alertas de Saúde (IA)
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-100 rounded-[32px] p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-caurn-red rounded-full animate-ping" />
                                    <span className="text-[10px] font-black text-caurn-red uppercase tracking-widest">Feedback Crítico</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-sm">João Oliveira (Risco 1)</h4>
                                    <p className="text-xs text-slate-600 mt-1">Relatou: <em>"Hoje a aula de pilates me deu uma dor de cabeça muito forte..."</em></p>
                                </div>
                                <button className="w-full bg-caurn-red text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/10 hover:shadow-red-500/20 active:scale-95 transition-all">
                                    Acionar APS Imediatamente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
