"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import {
    Activity,
    Brain,
    Heart,
    Stethoscope,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    CheckCircle2,
    Lock,
    AlertCircle,
    Info,
    ClipboardList,
    TrendingUp,
    ShieldCheck,
    Scale,
    HeartPulse,
    Droplet,
    Zap,
    Users,
    ArrowRight,
    MonitorPlay,
    Calendar as CalendarIcon,
    Clock,
    UserCircle2
} from "lucide-react";
import Link from "next/link";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Dot
} from "recharts";

interface ResultCardProps {
    title: string;
    score: string | number;
    maxLabel?: string;
    category: string;
    reference: string;
    feedback: string;
    icon: any;
    color: string;
}

const ResultCard = ({ title, score, maxLabel, category, reference, feedback, icon: Icon, color }: ResultCardProps) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Resultado</span>
                    <span className="text-xl font-black text-slate-800">{score}{maxLabel}</span>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-black text-slate-800">{title}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase mt-1 ${color} bg-opacity-20 ${color.replace('bg-', 'text-')}`}>
                    {category}
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Referência: {reference}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-2">
                    <div className="w-1.5 h-auto bg-blue-500 rounded-full shrink-0" />
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{feedback}"</p>
                </div>
            </div>
        </div>
    );
};

export default function AvaliacaoResumoPage() {
    const [userData, setUserData] = useState({
        hasCompletedTriage: true,
        hasCompletedEvaluation: false // Toggle for simulation
    });
    const [interestStep, setInterestStep] = useState<'IDLE' | 'FORM' | 'SUCCESS'>('IDLE');
    const [whatsapp, setWhatsapp] = useState("");

    // Mock Historical Data for the Chart
    const evolutionData = [
        { period: '2023.1', forca: 15, vitalidade: 62, stamina: 40 },
        { period: '2023.2', forca: 18, vitalidade: 68, stamina: 55 },
        { period: '2024.1', forca: 21, vitalidade: 75, stamina: 70 },
        { period: '2024.2', forca: 24, vitalidade: 82, stamina: 85 },
    ];

    // 1. Digital Triage Results (Self-reported)
    const triageResults = [
        {
            title: "Atividade Física (IPAQ)",
            score: "Ativo",
            category: "Ótimo",
            reference: "150+ min/semana",
            feedback: "Você escolheu priorizar seu movimento, e isso reflete sua autonomia em cuidar da sua longevidade. Continue sendo o protagonista da sua rotina!",
            icon: Activity,
            color: "bg-emerald-500"
        },
        {
            title: "Qualidade de Vida (SF-12)",
            score: 72,
            maxLabel: "/100",
            category: "Moderada+",
            reference: "> 50 pontos",
            feedback: "Sua percepção de bem-estar mostra que você está encontrando equilíbrio. Que tal explorarmos novas atividades para aumentar ainda mais sua vitalidade?",
            icon: Brain,
            color: "bg-blue-500"
        }
    ];

    // 2. Physical Evaluation Results (Professional Data)
    const physicalResults = [
        {
            title: "Composição Corporal (IMC)",
            score: "24.2",
            maxLabel: " kg/m²",
            category: "Eutrófico (Adequado)",
            reference: "18.5 a 24.9",
            feedback: "Seu peso está em harmonia com sua altura. Isso demonstra sua competência em manter hábitos alimentares que apoiam seu corpo de forma eficaz.",
            icon: Scale,
            color: "bg-emerald-500"
        },
        {
            title: "Relação Cintura-Quadril",
            score: "0.82",
            category: "Baixo Risco",
            reference: "< 0.85 (F) / < 0.90 (M)",
            feedback: "Sua distribuição de gordura corporal indica proteção cardiovascular. Você está no comando da sua saúde metabólica!",
            icon: Zap,
            color: "bg-indigo-500"
        },
        {
            title: "Pressão Arterial Média",
            score: "118/72",
            maxLabel: " mmHg",
            category: "Normal",
            reference: "< 120/80 mmHg",
            feedback: "Seu coração está batendo em um ritmo saudável. Manter-se ativo é a melhor forma de honrar a força que existe em você.",
            icon: HeartPulse,
            color: "bg-rose-500"
        },
        {
            title: "Força Muscular (TSLC)",
            score: "24",
            maxLabel: " rep/min",
            category: "Acima da Média",
            reference: "> 18 repetições",
            feedback: "Sua força demonstra que você é capaz de realizar suas atividades diárias com maestria. Sentir-se forte é um passo fundamental para sua autonomia.",
            icon: Activity,
            color: "bg-orange-500"
        },
        {
            title: "Capacidade Funcional (AMI)",
            score: "Independente",
            category: "Ótima",
            reference: "Protocolo Katz/Lawton",
            feedback: "Sua capacidade de realizar atividades do dia a dia com autonomia é o reflexo da sua dedicação em manter sua liberdade. Você é o mestre do seu caminho!",
            icon: Users,
            color: "bg-purple-500"
        },
        {
            title: "Gordura Corporal",
            score: "22",
            maxLabel: " %",
            category: "Saudável",
            reference: "18% a 28% (M) / 10% a 20% (H)",
            feedback: "Sua composição corporal está em um nível que protege seus órgãos e garante energia. Parabéns por cultivar um corpo que te serve tão bem.",
            icon: Droplet,
            color: "bg-sky-500"
        },
        {
            title: "Hemoglobina Glicada",
            score: "5.4",
            maxLabel: " %",
            category: "Normal",
            reference: "< 5.7%",
            feedback: "Seu metabolismo do açúcar está excelente. Suas escolhas diárias estão protegendo seu futuro.",
            icon: Droplet,
            color: "bg-teal-500"
        }
    ];

    return (
        <AppShell title="Saúde 360">
            <div className="max-w-md mx-auto pt-6 px-4 space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header Information */}
                <div>
                    <h2 className="text-3xl font-black text-slate-800 leading-tight">Sua Saúde 360</h2>
                    <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-tight">Estratificação e Resultados</p>
                </div>

                {/* Progress Indicators */}
                {!userData.hasCompletedEvaluation ? (
                    <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[32px] flex items-start gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-caurn-red text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-black text-caurn-dark text-sm uppercase">Jornada de Cuidado</h3>
                            <p className="text-xs text-slate-600 mt-1">Você concluiu a etapa digital. Melhore seu autoconhecimento e saiba como melhorar a sua saúde. <b>Agende a sua avaliação.</b></p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                        <ShieldCheck className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-black mb-2 leading-tight">Etapa de autoconhecimento completa.</h3>
                        <p className="text-emerald-100 text-sm leading-relaxed mb-6">Você agora tem clareza sobre seu estado de saúde. Escolha um dos nossos programas para continuar evoluindo.</p>
                        <Link href="/programas" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-tight hover:scale-105 transition-transform shadow-md">
                            Explorar Programas
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Section: Historical Evolution Chart (New) */}
                <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                                <TrendingUp className="w-5 h-5 text-caurn-red" />
                                Evolução da Vitalidade
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Comparativo Semestral 2023-2024</p>
                        </div>
                    </div>

                    <div className="h-[220px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={evolutionData}>
                                <defs>
                                    <linearGradient id="colorVit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E30613" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="period"
                                    fontSize={10}
                                    fontWeight="black"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8' }}
                                />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                    labelStyle={{ fontWeight: 'black', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px', color: '#1e293b' }}
                                    itemStyle={{ fontWeight: 'bold', fontSize: '12px', padding: '0' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="vitalidade"
                                    stroke="#E30613"
                                    name="Score Vitalidade"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVit)"
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="stamina"
                                    stroke="#005691"
                                    name="Estamina"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fill="transparent"
                                    animationDuration={2500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Melhora em Força</p>
                            <p className="text-lg font-black text-slate-800">+60%</p>
                            <div className="w-full bg-slate-200 h-1 rounded-full mt-2">
                                <div className="bg-emerald-500 h-full w-[60%] rounded-full" />
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score Atual</p>
                            <p className="text-lg font-black text-caurn-red">82/100</p>
                            <p className="text-[8px] text-emerald-600 font-bold uppercase mt-1">Nível Excelente</p>
                        </div>
                    </div>
                </div>

                {/* Section: My Programs (New) */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-caurn-dark">
                            <MonitorPlay className="w-6 h-6 text-caurn-red" />
                            <h3 className="font-black uppercase text-xs tracking-widest">Meus Programas & Atividades</h3>
                        </div>
                        <Link href="/programas" className="text-[10px] font-black text-caurn-red uppercase hover:underline">Ver Todos</Link>
                    </div>

                    <div className="grid gap-4">
                        {/* Program: Enrolled */}
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Inscrito • Fase Ativa</span>
                                    <h4 className="text-lg font-black text-slate-800 mt-1">Pilates Clínico</h4>
                                </div>
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <MonitorPlay className="w-5 h-5" />
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 font-medium mb-6">Foco em reabilitação postural e fortalecimento de core.</p>

                            <div className="flex gap-2">
                                <Link href="/programas/pilates?status=enrolled" className="flex-1 bg-slate-900 text-white text-center py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                                    Acessar Mural
                                </Link>
                                <Link href="/programas/pilates?status=enrolled" className="flex-1 bg-white border border-slate-200 text-slate-600 text-center py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                    Calendário
                                </Link>
                            </div>
                        </div>

                        {/* Program: Awaiting Approval */}
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-orange-200 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-orange-100 text-orange-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Interesse Enviado</span>
                                    <h4 className="text-lg font-black text-slate-800 mt-1">Programa de Cuidadores</h4>
                                </div>
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                    <Clock className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex items-center gap-3">
                                <UserCircle2 className="w-5 h-5 text-orange-400" />
                                <p className="text-[10px] text-orange-800 font-bold leading-tight">
                                    Sua solicitação está sendo analisada pelo mestre da APS especializado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Physical Results (Only show if completed) */}
                {userData.hasCompletedEvaluation && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-2 text-caurn-dark">
                            <Stethoscope className="w-6 h-6 text-caurn-red" />
                            <h3 className="font-black uppercase text-xs tracking-widest">Avaliação Física e Bioquímica</h3>
                        </div>
                        <div className="grid gap-6">
                            {physicalResults.map((res, i) => (
                                <ResultCard key={i} {...res} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Section: Triage Results (Always show if completed) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2 text-caurn-dark">
                        <ClipboardList className="w-6 h-6 text-caurn-red" />
                        <h3 className="font-black uppercase text-xs tracking-widest">Triagem Digital</h3>
                    </div>
                    <div className="grid gap-6">
                        {triageResults.map((res, i) => (
                            <ResultCard key={i} {...res} />
                        ))}
                    </div>
                </div>

                {/* Physical Evaluation Scheduling Logic (If not completed) */}
                {!userData.hasCompletedEvaluation && (
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-3xl -mr-16 -mt-16 rounded-full" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg">Desbloqueie seu Score</h3>
                                <p className="text-xs text-blue-300">Avaliação Presencial Necessária</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed mb-8">
                            Seus dados digitais estão prontos! Agora, agende sua visita à clínica para completar os testes físicos e descobrir sua <b>Idade Biológica</b>.
                        </p>

                        {interestStep === 'SUCCESS' ? (
                            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center space-y-3">
                                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                                <p className="text-xs font-bold leading-relaxed">Interesse registrado! Nossa equipe entrará em contato em breve.</p>
                            </div>
                        ) : interestStep === 'FORM' ? (
                            <div className="space-y-4">
                                <input
                                    type="tel"
                                    placeholder="(99) 99999-9999"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    className="w-full bg-white/10 p-4 rounded-xl outline-none text-white font-bold text-sm border border-white/20 focus:border-caurn-red transition-colors"
                                />
                                <button
                                    onClick={() => setInterestStep('SUCCESS')}
                                    className="w-full bg-caurn-red p-4 rounded-2xl font-black text-sm shadow-lg shadow-red-900/30 hover:bg-red-500 active:scale-95 transition-all"
                                >
                                    Confirmar Interesse
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setInterestStep('FORM')}
                                className="w-full bg-caurn-red p-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-500 transition-all shadow-lg active:scale-95"
                            >
                                Agendar Minha Visita
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                {/* Simulation Toggle */}
                <div className="pt-4">
                    <button
                        onClick={() => setUserData(prev => ({ ...prev, hasCompletedEvaluation: !prev.hasCompletedEvaluation }))}
                        className="w-full border-2 border-slate-100 text-slate-300 p-4 rounded-3xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-400 transition-all"
                    >
                        Simular: {userData.hasCompletedEvaluation ? "Remover" : "Ver"} Resultados da Avaliação Física
                    </button>
                </div>
            </div>
        </AppShell >
    );
}
