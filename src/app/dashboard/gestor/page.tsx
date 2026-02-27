"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    Users,
    TrendingUp,
    Utensils,
    Brain,
    Dumbbell,
    Shield,
    ChevronRight,
    AlertCircle,
    Search,
    Filter,
    ArrowRight,
    Target,
    Activity,
    Clock,
    UserCheck,
    ChevronDown,
    HeartPulse
} from "lucide-react";
import { useState, useEffect } from "react";
import { getInactivityAlerts } from "@/app/actions/dashboard";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Bar,
    Legend,
    Cell
} from "recharts";

// Mock Data for the 4 Axes

const NUTRICIONAL_DATA = [
    { time: 1, weight: 110, imc: 35 },
    { time: 3, weight: 105, imc: 33 },
    { time: 6, weight: 98, imc: 31 },
    { time: 9, weight: 92, imc: 29 },
    { time: 12, weight: 88, imc: 27 },
];

const COGNITIVE_DATA = [
    { subject: 'Memória', A: 120, B: 110, fullMark: 150 },
    { subject: 'Atenção', A: 98, B: 130, fullMark: 150 },
    { subject: 'Raciocínio', A: 86, B: 130, fullMark: 150 },
    { subject: 'Interação Social', A: 99, B: 100, fullMark: 150 },
    { subject: 'Autoestima', A: 85, B: 90, fullMark: 150 },
];

const REHAB_DATA = [
    { name: 'Eva (Dor)', antes: 8, depois: 3 },
    { name: 'Equilíbrio', antes: 4, depois: 9 },
    { name: 'Flexibilidade', antes: 5, depois: 8 },
];

const FUNNEL_DATA = [
    { name: 'Sedentário', value: 400, fill: '#64748b' },
    { name: 'Contemplação', value: 300, fill: '#005691' },
    { name: 'Ativo', value: 200, fill: '#00A650' },
];

const ATTENDANCE_ALERTS = [
    { id: "001", name: "Ricardo Santos", group: "Grupo Meta", missed: 4, lastContact: "22/01", status: "Crítico", color: "text-red-600 bg-red-50" },
    { id: "002", name: "Ana Maria", group: "Pilates", missed: 3, lastContact: "05/02", status: "Alerta", color: "text-orange-600 bg-orange-50" },
    { id: "003", name: "Carlos Edu", group: "Memória", missed: 5, lastContact: "10/01", status: "Crítico", color: "text-red-600 bg-red-50" },
];

export default function GestorDashboardPage() {
    const [activeAxis, setActiveAxis] = useState("nutricional");
    const [selectedProfessional, setSelectedProfessional] = useState("Hassan Mohamed");
    const [inactivityAlerts, setInactivityAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const alerts = await getInactivityAlerts();
                setInactivityAlerts(alerts);
            } catch (error) {
                console.error("Failed to load gestor data:", error);
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
                    <div className="w-12 h-12 border-4 border-caurn-dark border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Acessando Central do Gestor...</p>
                </div>
            </div>
        );
    }

    const axes = [
        { id: "nutricional", name: "Eixo Nutricional", icon: Utensils, groups: "Nutrição Ativa, Meta" },
        { id: "psicossocial", name: "Psicossocial & Cognitivo", icon: Brain, groups: "Bem Viver, Memória, Arte Terapia" },
        { id: "reabilitacao", name: "Reabilitação & Funcional", icon: Dumbbell, groups: "Pilates, Hidro, Dança" },
        { id: "suporte", name: "Suporte & Estratégia", icon: Shield, groups: "Cuidadores, CaurnAtiva" },
    ];

    return (
        <AppShell title="Área do Gestor" showBottomNav={true} fullWidth>
            <div className="flex flex-col lg:flex-row gap-8 pt-4">

                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 space-y-2">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Linhas de Cuidado</h3>
                        <nav className="space-y-1">
                            {axes.map((axis) => (
                                <button
                                    key={axis.id}
                                    onClick={() => setActiveAxis(axis.id)}
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${activeAxis === axis.id ? 'bg-caurn-dark text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
                                >
                                    <axis.icon className={`w-5 h-5 ${activeAxis === axis.id ? 'text-caurn-red' : 'text-slate-400'}`} />
                                    <div className="text-left">
                                        <p className="text-xs font-black uppercase tracking-tight leading-none">{axis.name}</p>
                                        <p className={`text-[9px] mt-1 font-bold ${activeAxis === axis.id ? 'text-slate-400' : 'text-slate-300'}`}>{axis.groups}</p>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Professional Filter */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Filtro Profissional</h3>
                        <div className="relative">
                            <select
                                className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold text-slate-800 outline-none appearance-none cursor-pointer"
                                value={selectedProfessional}
                                onChange={(e) => setSelectedProfessional(e.target.value)}
                            >
                                <option>Hassan Mohamed</option>
                                <option>Cassiana Araújo</option>
                                <option>Heloísa Britto</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 space-y-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                        <div>
                            <h1 className="text-3xl font-black text-caurn-dark tracking-tight">Monitoramento de Performance</h1>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Gestão Populacional • {activeAxis === 'nutricional' ? 'Eixo Nutricional' : activeAxis === 'psicossocial' ? 'Eixo Psicossocial' : activeAxis === 'reabilitacao' ? 'Eixo Reabilitação' : 'Eixo Suporte'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-50 text-health-green px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-2 border border-emerald-100">
                                <TrendingUp className="w-4 h-4" />
                                Meta 2026: +15%
                            </div>
                        </div>
                    </div>

                    {/* Axis Content Rendering */}
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {activeAxis === "nutricional" && (
                            <AxisContent
                                title="Eixo Nutricional"
                                kpis={[
                                    { label: "Redução IMC", value: "-12%", desc: "Média Grupo Meta", icon: Target },
                                    { label: "Diversidade Alimentar", value: "8.4", desc: "Escala 1 a 10", icon: Utensils },
                                ]}
                                chart={
                                    <div className="h-[300px] w-full">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Evolução Peso (kg) vs Tempo (Meses)</p>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis type="number" dataKey="time" name="tempo" unit="m" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                                <YAxis type="number" dataKey="weight" name="peso" unit="kg" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                                <Scatter name="Associados" data={NUTRICIONAL_DATA} fill="#E30613" />
                                            </ScatterChart>
                                        </ResponsiveContainer>
                                    </div>
                                }
                            />
                        )}

                        {activeAxis === "psicossocial" && (
                            <AxisContent
                                title="Psicossocial & Cognitivo"
                                kpis={[
                                    { label: "Autoestima", value: "9.2", desc: "Média Bem Viver", icon: Brain },
                                    { label: "Engajamento Criativo", value: "85%", desc: "Arte Terapia", icon: Activity },
                                ]}
                                chart={
                                    <div className="h-[300px] w-full flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={COGNITIVE_DATA}>
                                                <PolarGrid stroke="#f1f5f9" />
                                                <PolarAngleAxis dataKey="subject" fontSize={10} fontWeight="bold" />
                                                <PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={8} />
                                                <Radar name="Performance" dataKey="A" stroke="#005691" fill="#005691" fillOpacity={0.6} />
                                                <Legend fontSize={10} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                }
                            />
                        )}

                        {activeAxis === "reabilitacao" && (
                            <AxisContent
                                title="Reabilitação & Funcionalidade"
                                kpis={[
                                    { label: "Alívio de Dor (EVA)", value: "-65%", desc: "Média Pós-Treino", icon: Dumbbell },
                                    { label: "Índice de Quedas", value: "-40%", desc: "Redução em 6 meses", icon: HeartPulse },
                                ]}
                                chart={
                                    <div className="h-[300px] w-full">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Aptidão Física: Antes vs Depois</p>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={REHAB_DATA} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" fontSize={10} fontWeight="black" axisLine={false} tickLine={false} />
                                                <Tooltip />
                                                <Bar dataKey="antes" fill="#64748b" radius={[0, 4, 4, 0]} />
                                                <Bar dataKey="depois" fill="#00A650" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                }
                            />
                        )}

                        {activeAxis === "suporte" && (
                            <AxisContent
                                title="Suporte & Estratégia"
                                kpis={[
                                    { label: "Sobrecarga Zarit", value: "-22%", desc: "Grupo Cuidadores", icon: Shield },
                                    { label: "Aconselhamento", value: "72%", desc: "Adesão Mudança", icon: UserCheck },
                                ]}
                                chart={
                                    <div className="h-[300px] w-full space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Funil de Comportamento (Estágios)</p>
                                        <div className="space-y-4 pt-4">
                                            {FUNNEL_DATA.map((step, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-32 text-right">
                                                        <span className="text-[10px] font-black text-slate-500 uppercase">{step.name}</span>
                                                    </div>
                                                    <div className="flex-1 h-12 relative flex items-center">
                                                        <div
                                                            className="h-full rounded-r-2xl transition-all duration-1000"
                                                            style={{ width: `${(step.value / 400) * 100}%`, backgroundColor: step.fill }}
                                                        />
                                                        <span className="ml-4 text-xs font-black text-slate-700">{step.value} pág.</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            />
                        )}
                    </div>

                    {/* Digital Integration Card (Special Rule) */}
                    <div className="bg-caurn-dark rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-caurn-red/10 blur-3xl rounded-full" />
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                                    <Activity className="w-8 h-8 text-caurn-red animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Caurn Personal Digital</h3>
                                    <p className="text-slate-400 text-xs font-medium mt-1">Monitoramento de Atividade Real-time</p>
                                </div>
                            </div>
                            <div className="bg-white/10 px-8 py-4 rounded-3xl border border-white/20 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Média de Atividade</p>
                                <p className="text-3xl font-black text-white">42m <span className="text-sm">/dia</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Alerts Table (Special Rule) */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white text-caurn-dark">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-caurn-red" />
                                <h4 className="text-xs font-black uppercase tracking-widest">Alertas de Inatividade (&gt;3 Faltas)</h4>
                            </div>
                            <span className="text-[10px] font-black bg-red-50 text-caurn-red px-3 py-1 rounded-full uppercase">Crítico</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Associado</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Grupo / Serviço</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Faltas Consec.</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Último Contato</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {inactivityAlerts.map((alert, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-black text-slate-800">{alert.name}</p>
                                                <p className="text-[10px] text-slate-400">ID: {alert.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-slate-600">{alert.group}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-caurn-red">{alert.missed}</span>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4].map(b => (
                                                            <div key={b} className={`w-1.5 h-1.5 rounded-full ${b <= alert.missed ? 'bg-caurn-red' : 'bg-slate-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium text-slate-500">{alert.lastContact}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-red-600">
                                                <button className="p-2 border border-caurn-red/20 rounded-xl hover:bg-caurn-red hover:text-white transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AppShell>
    );
}

// Axis Page Layout Template
const AxisContent = ({ title, kpis, chart }: any) => (
    <div className="space-y-6">
        {/* Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kpis.map((kpi: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-health-blue/20 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-health-blue/10 transition-colors">
                            <kpi.icon className="w-6 h-6 text-caurn-red" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{kpi.label}</p>
                            <p className="text-2xl font-black text-slate-800 mt-1">{kpi.value}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 opacity-70">{kpi.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Chart Card */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-lg shadow-slate-100">
            {chart}
        </div>
    </div>
);
