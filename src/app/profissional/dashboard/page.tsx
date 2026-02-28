"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    Users,
    TrendingUp,
    DollarSign,
    Activity,
    AlertTriangle,
    CheckCircle2,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    ChevronDown,
    HeartPulse,
    Brain,
    Shield,
    ClipboardList
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDashboardStats, getInactivityAlerts } from "@/app/actions/dashboard";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from "recharts";

export default function ProfissionalDashboardPage() {
    const [selectedProgram, setSelectedProgram] = useState("all");
    const [selectedRisk, setSelectedRisk] = useState("all");
    const [stats, setStats] = useState<any>(null);
    const [inactivityAlerts, setInactivityAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [statsData, alertsData] = await Promise.all([
                    getDashboardStats(),
                    getInactivityAlerts()
                ]);
                setStats(statsData);
                setInactivityAlerts(alertsData);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-caurn-red border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Carregando Dados do BI...</p>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <AppShell title="Dashboard Executivo" fullWidth>
            {/* Special Priority Alert Banner - Now inside AppShell but still prominent */}
            <div className="bg-caurn-red text-white p-3 rounded-2xl mb-8 flex items-center justify-center gap-4 animate-pulse shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-bold uppercase tracking-tight">
                    Atenção: <b>{stats.priorityAlerts} pacientes</b> de Prioridade 1 sem contato há mais de 30 dias. <Link href="#" className="underline ml-2">Realizar busca ativa APS</Link>
                </p>
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Dashboard Title & Quick Actions */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-caurn-dark tracking-tighter leading-none">Gestão de Saúde 360</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-3">Dashboard Executivo APS • CAURN</p>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <select
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="text-xs font-black bg-transparent outline-none uppercase text-slate-700 cursor-pointer"
                            >
                                <option value="all">Todos os Programas</option>
                                <option value="caurnativa">CaurnAtiva</option>
                                <option value="pdbc">PDBCV</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <Activity className="w-4 h-4 text-slate-400" />
                            <select
                                value={selectedRisk}
                                onChange={(e) => setSelectedRisk(e.target.value)}
                                className="text-xs font-black bg-transparent outline-none uppercase text-slate-700 cursor-pointer"
                            >
                                <option value="all">Todos os Riscos</option>
                                <option value="p1">Prioridade 1</option>
                                <option value="p2">Prioridade 2</option>
                            </select>
                        </div>

                        <button className="bg-caurn-dark text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-all">
                            <Calendar className="w-4 h-4" />
                            Últimos 30 dias
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Dimension 1: APS Compliance (KPIs) */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <Shield className="w-5 h-5 text-health-blue" />
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">APS & Compliance (Regulatório)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard
                            title="Estratificação de Risco"
                            value="84.2%"
                            trend="+4.1%"
                            isPositive={true}
                            description="Meta APS: 85%"
                            icon={Activity}
                        />
                        <KPICard
                            title="Médico de Referência"
                            value="156"
                            trend="+12"
                            isPositive={true}
                            description="Encaminhamentos Diretos"
                            icon={Users}
                        />
                        <KPICard
                            title="Cobertura de Rastreio"
                            value="92%"
                            trend="+2.5%"
                            isPositive={true}
                            description="Vacinas e Exames em Dia"
                            icon={CheckCircle2}
                        />
                        <div className="bg-health-green/10 border-2 border-health-green/20 p-5 rounded-3xl flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-health-green uppercase tracking-widest">Tags MK Data</span>
                                <CheckCircle2 className="w-5 h-5 text-health-green" />
                            </div>
                            <p className="text-2xl font-black text-health-green mt-2">Sincronizado</p>
                            <p className="text-[10px] text-health-green/70 font-bold uppercase mt-1">Garantia de Rastreabilidade APS</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Dimension 2: Clinical & Mental Health */}
                    <section className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
                        {/* ... (Existing Mental Health chart omitted for brevity but preserved in real file) ... */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                                    <Brain className="w-5 h-5 text-health-blue" />
                                    Desempenho Clínico e Mental
                                </h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Cruzamento Score Humor vs Ansiedade</p>
                            </div>
                        </div>

                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.mentalHealthData}>
                                    <defs>
                                        <linearGradient id="colorHumor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#005691" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#005691" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'black', fontSize: '10px', textTransform: 'uppercase' }}
                                    />
                                    <Area type="monotone" dataKey="humor" stroke="#005691" strokeWidth={3} fillOpacity={1} fill="url(#colorHumor)" />
                                    <Line type="monotone" dataKey="ansiedade" stroke="#E30613" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Aptidão Física</p>
                                    <p className="text-lg font-black text-slate-800">IPA: Ativo</p>
                                </div>
                                <Activity className="w-6 h-6 text-health-green" />
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Humor (Média GDS)</p>
                                    <p className="text-lg font-black text-slate-800">+28% Melhora</p>
                                </div>
                                <TrendingUp className="w-6 h-6 text-health-blue" />
                            </div>
                        </div>
                    </section>

                    {/* New: Enrollment Requests & Professional Review */}
                    <section className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 space-y-6 flex flex-col">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                                    <ClipboardList className="w-5 h-5 text-caurn-red" />
                                    Solicitações de Ingresso
                                </h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Análise de Raio-X e Feedback Curatorial</p>
                            </div>
                            <span className="bg-red-50 text-caurn-red text-[10px] font-black px-3 py-1 rounded-full border border-red-100">3 Pendentes</span>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                            {[
                                { id: 'r1', name: 'João da Silva', programa: 'Pilates Clínico', forca: 'Alto', stamina: 'Médio', pa: 145, status: 'Pendente' },
                                { id: 'r2', name: 'Maria Santos', programa: 'Cuidadores', forca: 'Baixo', stamina: 'Alto', pa: 170, status: 'Alerta' },
                            ].map((req) => (
                                <RequestCard key={req.id} req={req} />
                            ))}
                        </div>

                        <button className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                            Ver Todas as Requisições
                        </button>
                    </section>
                </div>

                {/* Feedback Modal / Overlay would go here in a full app, but we'll use inline state in RequestCard */}

                {/* Dimension 3: Sustainability & ROI */}
                <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between mt-8">
                    {/* ... (Existing ROI section content) ... */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                    <div className="relative z-10">
                        <h3 className="font-black flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
                            <DollarSign className="w-5 h-5 text-health-green" />
                            Sustentabilidade Financeira (ROI)
                        </h3>
                        <div className="mt-8 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-slate-800">-{stats.sinistralidadeReducao}</span>
                            <span className="text-health-green font-bold text-sm tracking-tighter uppercase">Redução Sinistralidade</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2 font-medium">Comparativo Participantes vs Não Participantes (Base 2024)</p>
                    </div>

                    <div className="relative z-10 mt-10 space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Impacto por Atendimento Digital</span>
                            <span className="text-slate-800">{stats.atendimentosDigitais} evitados</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-health-green h-full w-[82%]" />
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
                            "82% dos atendimentos de enfermagem via WhatsApp evitaram idas desnecessárias ao Pronto Socorro."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
                        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Custo Médio Vida</p>
                            <p className="text-xl font-black text-slate-800">R$ 425,00</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Poupança Estimada</p>
                            <p className="text-xl font-black text-health-green">R$ 142k</p>
                        </div>
                    </div>
                </section>

                {/* Dimension 4: Operational & Satisfaction */}
                <section className="space-y-4 mt-8">
                    <div className="flex items-center gap-2 px-2">
                        <Users className="w-5 h-5 text-caurn-red" />
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Escopo Operacional e Engajamento</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* NPS Gauge Card */}
                        <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta NPS (Encantamento)</h4>
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                                    <circle cx="80" cy="80" r="70" stroke="#00A650" strokeWidth="12" fill="none"
                                        strokeDasharray="440" strokeDashoffset={440 - (440 * 0.97)} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-caurn-dark">{stats.nps}</span>
                                    <span className="text-[10px] font-black text-health-green uppercase">Excelente</span>
                                </div>
                            </div>
                        </div>

                        {/* Program Stats Table */}
                        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                            {/* ... (Existing program occupancy table) ... */}
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Ocupação das Atividades</h4>
                                <span className="text-[10px] font-bold text-slate-400">Total: 1.250 atendimentos/mês</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                {stats.occupancy.map((item: any, i: number) => (
                                    <OccupancyItem key={i} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-8 mb-12">
                    <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-white hover:border-caurn-red/30 hover:text-caurn-red transition-all">
                        Personalizar Visualização do Dashboard
                    </button>
                </div>
            </div>
        </AppShell>
    );
}

const RequestCard = ({ req }: any) => {
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

    const handleApprove = () => {
        setStatus("approved");
        alert(`Ingresso de ${req.name} aprovado!`);
    };

    const handleReject = () => {
        if (!showFeedback) {
            setShowFeedback(true);
            return;
        }
        setStatus("rejected");
        alert(`Ingresso de ${req.name} recusado com feedback.`);
    };

    if (status !== "pending") {
        return (
            <div className={`p-4 rounded-[24px] border ${status === 'approved' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'} animate-in fade-in`}>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${status === 'approved' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <p className="text-sm font-bold text-slate-700">
                        {req.name} - {status === 'approved' ? 'Inscrito com Sucesso' : 'Feedback Enviado'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-slate-50 rounded-[24px] border border-slate-100 hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="text-sm font-black text-slate-800">{req.name}</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Interesse em: <span className="text-caurn-red font-black">{req.programa}</span></p>
                </div>
                <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${req.pa > 160 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {req.pa > 160 ? 'Alerta Clínico' : 'Análise Pendente'}
                </div>
            </div>

            {/* Raio-X Indicators Mini View */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white p-2 rounded-xl text-center border border-slate-100 shadow-sm">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Força</p>
                    <p className="text-[10px] font-black text-emerald-600">{req.forca}</p>
                </div>
                <div className="bg-white p-2 rounded-xl text-center border border-slate-100 shadow-sm">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Stamina</p>
                    <p className="text-[10px] font-black text-blue-600">{req.stamina}</p>
                </div>
                <div className="bg-white p-2 rounded-xl text-center border border-slate-100 shadow-sm">
                    <p className="text-[8px] font-black text-slate-400 uppercase">PA Sist.</p>
                    <p className={`text-[10px] font-black ${req.pa > 160 ? 'text-caurn-red' : 'text-slate-600'}`}>{req.pa}</p>
                </div>
            </div>

            {showFeedback && (
                <div className="mb-4 animate-in slide-in-from-top-2">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Escreva o feedback clínico..."
                        className="w-full p-3 rounded-xl border border-orange-200 text-xs font-medium focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none min-h-[80px]"
                    />
                    <p className="text-[9px] text-slate-400 mt-1 italic">Ex: Sugira ajuste de medicação antes do exercício.</p>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={handleReject}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 py-2 rounded-lg text-xs font-black uppercase tracking-tight hover:bg-slate-50 transition-all"
                >
                    {showFeedback ? "Confirmar Recusa" : "Recusar/Oriente"}
                </button>
                <button
                    onClick={handleApprove}
                    className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-xs font-black uppercase tracking-tight hover:bg-black transition-all"
                >
                    Aprovar Ingresso
                </button>
            </div>

            {req.pa > 160 && !showFeedback && (
                <p className="mt-3 text-[9px] text-orange-600 font-bold bg-orange-50 p-2 rounded-lg border border-orange-100 leading-tight">
                    Alerta Biológico: Pressão Sistólica indicou um pico no Raio-X. Recomenda-se orientação de feedback.
                </p>
            )}
        </div>
    );
};

// Sub-components
const KPICard = ({ title, value, trend, isPositive, description, icon: Icon }: any) => (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between gap-4 group hover:border-health-blue/20 transition-all">
        <div className="flex items-start justify-between">
            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-health-blue/10 group-hover:text-health-blue transition-colors">
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-health-blue" />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${isPositive ? 'text-health-green' : 'text-caurn-red'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trend}
            </div>
        </div>
        <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title}</h4>
            <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 opacity-70">{description}</p>
        </div>
    </div>
);

const OccupancyItem = ({ label, value, color, attendance, engagement }: any) => (
    <div className="space-y-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
        <div className="flex justify-between items-end">
            <span className="font-black text-slate-800 text-sm uppercase tracking-tighter">{label}</span>
            <span className="text-xs font-black text-caurn-red">{value}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${value}%` }} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Presença</span>
                <span className="text-xs font-black text-slate-700">{attendance}</span>
            </div>
            <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Engajamento</span>
                <span className="text-xs font-black text-slate-700">{engagement}</span>
            </div>
        </div>
    </div>
);
