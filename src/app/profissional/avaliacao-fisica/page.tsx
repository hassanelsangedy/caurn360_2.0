"use client";

import React, { useState } from "react";
import { ChevronLeft, Save, ClipboardList, Activity, ActivityIcon, Droplet, User, Scale, HeartPulse, BrainCircuit, Users } from "lucide-react";
import Link from "next/link";

export default function AvaliacaoFisicaProfissional() {
    // --- MOCK STATE ---
    const [step, setStep] = useState(0);
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [cintura, setCintura] = useState("");
    const [quadril, setQuadril] = useState("");
    const [idade, setIdade] = useState(30); // Default to Adult for conditional rendering mock
    const [alertaHemodinamico, setAlertaHemodinamico] = useState(false);

    // --- MOCK AUTO-CALCULATIONS ---
    const calculateIMC = () => {
        if (!peso || !altura) return { value: 0, text: "Aguardando", color: "text-slate-400" };
        const p = parseFloat(peso);
        const a = parseFloat(altura);
        if (a === 0) return { value: 0, text: "Altura inválida", color: "text-rose-500" };
        const imc = p / (a * a);

        if (imc < 18.5) return { value: imc.toFixed(1), text: "Abaixo do peso", color: "text-amber-500" };
        if (imc < 25) return { value: imc.toFixed(1), text: "Adequado", color: "text-emerald-500" };
        if (imc < 30) return { value: imc.toFixed(1), text: "Sobrepeso", color: "text-orange-500" };
        if (imc < 35) return { value: imc.toFixed(1), text: "Obesidade I", color: "text-rose-500" };
        if (imc < 40) return { value: imc.toFixed(1), text: "Obesidade II", color: "text-rose-600" };
        return { value: imc.toFixed(1), text: "Obesidade III", color: "text-rose-700" };
    };

    const calculateRCQ = () => {
        if (!cintura || !quadril) return { value: 0, text: "Aguardando", color: "text-slate-400" };
        const c = parseFloat(cintura);
        const q = parseFloat(quadril);
        if (q === 0) return { value: 0, text: "Inválido", color: "text-rose-500" };
        const rcq = c / q;
        return { value: rcq.toFixed(2), text: "Calculado", color: "text-indigo-600" }; // Simplified mock logic
    };

    const imcData = calculateIMC();
    const rcqData = calculateRCQ();


    const steps = [
        { title: "Identificação", icon: <User className="w-5 h-5" /> },
        { title: "Antropometria", icon: <Scale className="w-5 h-5" /> },
        { title: "Hemodinâmica", icon: <HeartPulse className="w-5 h-5" /> },
        { title: "Dobras Cutâneas", icon: <Droplet className="w-5 h-5" /> },
        { title: "Histórico e Exames", icon: <ClipboardList className="w-5 h-5" /> },
        { title: "Testes Funcionais", icon: <ActivityIcon className="w-5 h-5" /> },
        { title: "AMI (Idoso)", icon: <BrainCircuit className="w-5 h-5" /> },
        { title: "Finalização", icon: <Activity className="w-5 h-5" /> },
    ];


    // --- UI HELPERS ---
    interface InputFieldProps {
        label: string;
        type?: string;
        placeholder?: string;
        value?: string | number;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        className?: string;
    }

    const InputField = ({ label, type = "text", placeholder, value, onChange, className = "" }: InputFieldProps) => (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors w-full"
            />
        </div>
    );

    interface SelectFieldProps {
        label: string;
        options: string[];
        className?: string;
    }

    const SelectField = ({ label, options, className = "" }: SelectFieldProps) => (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors w-full">
                <option value="">Selecione...</option>
                {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-32">

            {/* CABEÇALHO */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 pt-4 pb-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard/gestor" className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <span className="font-extrabold text-slate-800 text-lg block leading-tight">Avaliação Física</span>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Área do Profissional</span>
                        </div>
                    </div>
                    {/* Mock Identity Toggle for demonstration */}
                    <div className="hidden md:flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-500 px-2">Simular Idade do Paciente:</span>
                        <button onClick={() => setIdade(30)} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${idade < 60 ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-200'}`}>Adulto (30)</button>
                        <button onClick={() => setIdade(65)} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${idade >= 60 ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-200'}`}>Idoso (65)</button>
                    </div>
                </div>
            </div>

            <div className="pt-24 px-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">

                {/* SIDEBAR NAVIGATION (Desktop) / TOP SCROLL (Mobile) */}
                <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                    {steps.map((s, i) => {
                        // Hide AMI block if adult
                        if (i === 6 && idade < 60) return null;

                        return (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal shrink-0 border ${step === i
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                                    }`}
                            >
                                <div className={`${step === i ? "text-indigo-200" : "text-slate-400"}`}>{s.icon}</div>
                                <div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${step === i ? 'text-indigo-200' : 'text-slate-400'}`}>Bloco {i + 1}</div>
                                    <div className="font-bold text-sm">{s.title}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* MAIN FORM AREA */}
                <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[60vh] relative">

                    {/* === BLOCO 1: IDENTIFICAÇÃO === */}
                    {step === 0 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <User className="text-indigo-500" /> 1. Identificação e Consentimento
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Avaliador (Profissional)" placeholder="Nome completo" />
                                <InputField label="Paciente (Associado)" placeholder="Buscar pelo nome ou CPF..." />
                            </div>

                            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Horário Início" type="time" />
                                <SelectField label="Sexo Biológico" options={["Masculino", "Feminino"]} />
                                <InputField label="Nascimento" type="date" />
                                <SelectField label="Raça/Cor" options={["Preta", "Branca", "Parda", "Amarela", "Indígena"]} />
                            </div>

                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col gap-3">
                                <h3 className="text-sm font-bold text-amber-800 uppercase tracking-widest">Controles do Protocolo</h3>
                                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-amber-100">
                                    <span className="text-sm font-semibold text-slate-700">Autoriza o uso dos dados para pesquisa?</span>
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="pesq" className="w-4 h-4 accent-indigo-600" /> <span className="text-sm font-bold">Sim</span></label>
                                        <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="pesq" className="w-4 h-4 accent-indigo-600" /> <span className="text-sm font-bold">Não</span></label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-amber-100">
                                    <span className="text-sm font-semibold text-slate-700">Questionário digital respondido (Fase 1.1)?</span>
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="quest" className="w-4 h-4 accent-indigo-600" /> <span className="text-sm font-bold">Sim</span></label>
                                        <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="quest" className="w-4 h-4 accent-indigo-600" /> <span className="text-sm font-bold">Não</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === BLOCO 2: ANTROPOMETRIA === */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <Scale className="text-emerald-500" /> 2. Avaliação Antropométrica
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Massa e Estatura */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 text-sm">Medidas Básicas</h3>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                                        <InputField label="Massa Corporal (kg)" type="number" placeholder="Ex: 75.5" value={peso} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeso(e.target.value)} />
                                        <InputField label="Estatura (m)" type="number" placeholder="Ex: 1.75" value={altura} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAltura(e.target.value)} />
                                    </div>
                                </div>

                                {/* Mock Auto-calc IMC */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 text-sm opacity-0 hidden md:block">Resultado</h3>
                                    <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 h-[calc(100%-28px)] flex flex-col items-center justify-center text-center">
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">Índice de Massa Corporal (IMC)</span>
                                        <div className={`text-4xl font-black ${imcData.color}`}>
                                            {imcData.value || "--"}
                                        </div>
                                        <div className={`mt-2 font-bold px-3 py-1 rounded-full text-xs border ${imcData.color} border-current bg-white/50`}>
                                            {imcData.text}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                {/* Circunferências */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 text-sm">Circunferências (cm)</h3>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                                        <InputField label="Cintura (Menor perímetro)" type="number" placeholder="cm" value={cintura} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCintura(e.target.value)} />
                                        <InputField label="Quadril (Maior extensão)" type="number" placeholder="cm" value={quadril} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuadril(e.target.value)} />
                                        <InputField label="Abdômen (Cicatriz umbilical)" type="number" placeholder="cm" />
                                    </div>
                                </div>

                                {/* Mock Auto-calc RCQ */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 text-sm opacity-0 hidden md:block">Resultado</h3>
                                    <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200 h-[calc(100%-28px)] flex flex-col items-center justify-center text-center">
                                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Relação Cintura-Quadril (RCQ)</span>
                                        <div className={`text-3xl font-black ${rcqData.color}`}>
                                            {rcqData.value || "--"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === BLOCO 3: HEMODINÂMICA === */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <HeartPulse className="text-rose-500" /> 3. Triagem Hemodinâmica
                            </h2>

                            <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl mb-6 flex gap-3 items-start">
                                <Activity className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                                <p className="text-sm font-semibold text-sky-800 leading-relaxed">
                                    Realize 3 medidas iniciais com intervalo de 1 minuto. Se a PAS ou PAD diferirem em ≥ 10 mmHg, realize a 4ª medida. O sistema considerará a média válida.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((medida) => (
                                    <div key={medida} className={`p-4 rounded-2xl border ${medida === 4 ? 'border-dashed border-slate-300 bg-slate-50 opacity-80' : 'border-slate-200 bg-white'}`}>
                                        <h4 className="font-bold text-slate-700 text-sm mb-3 text-center border-b border-slate-100 pb-2">
                                            {medida}ª Medição {medida === 4 && <span className="text-[10px] text-slate-400 font-normal block">(Se necessária)</span>}
                                        </h4>
                                        <div className="space-y-3">
                                            <InputField label="PAS (mmHg)" type="number" placeholder="Ex: 120" />
                                            <InputField label="PAD (mmHg)" type="number" placeholder="Ex: 80" />
                                            <InputField label="FC (bpm)" type="number" placeholder="Ex: 72" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl mt-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-rose-800 font-black flex items-center gap-2">
                                            <ActivityIcon className="w-5 h-5" /> Critério de Segurança
                                        </h3>
                                        <p className="text-sm text-rose-700 font-medium mt-1">A PAS foi ≥ 180 mmHg ou a PAD ≥ 110 mmHg em repouso?</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors">
                                            <input type="radio" name="crit_seguranca" value="sim" onChange={() => setAlertaHemodinamico(true)} className="w-5 h-5 accent-rose-600" />
                                            <span className="font-bold text-rose-700">Sim (Risco)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors">
                                            <input type="radio" name="crit_seguranca" value="nao" onChange={() => setAlertaHemodinamico(false)} className="w-5 h-5 accent-emerald-600" />
                                            <span className="font-bold text-emerald-700">Não (OK)</span>
                                        </label>
                                    </div>
                                </div>

                                {alertaHemodinamico && (
                                    <div className="mt-4 bg-rose-600 text-white p-4 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
                                        🚨 ALERTA: Risco Crítico Imediato. Testes físicos bloqueados. Recomendado encaminhamento clínico urgente.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* === BLOCO 4: DOBRAS CUTÂNEAS === */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <Droplet className="text-sky-500" /> 4. Composição Corporal (Dobras)
                            </h2>

                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6">
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    Realize 2 medidas para cada dobra. Se a diferença for ≥ 5%, realize a 3ª medida.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Using generic folds to represent masculine/feminine variation in mock */}
                                {["Tricipital (mm)", "Subescapular / Suprailíaca (mm)", "Peitoral / Abdominal (mm)"].map((dobra, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                        <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-sm">{dobra}</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-slate-400 w-4">1ª</span>
                                                <input type="number" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-slate-400 w-4">2ª</span>
                                                <input type="number" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-slate-400 w-4">3ª</span>
                                                <input type="number" placeholder="Se necessário" className="flex-1 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-2 outline-none focus:border-indigo-500 bg-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl flex items-center justify-between mt-6">
                                <div>
                                    <h3 className="text-indigo-800 font-bold text-sm">Cálculo de Densidade Corporal</h3>
                                    <p className="text-xs text-indigo-600 mt-1">Protocolo de Jackson & Pollock (7/3 dobras).</p>
                                </div>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm">
                                    Calcular % Gordura
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === BLOCO 5: HISTÓRICO DE SAÚDE E EXAMES === */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <ClipboardList className="text-purple-500" /> 5. Histórico e Exames
                            </h2>

                            {/* Sinais e Sintomas */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-700">Sinais e Sintomas Atuais</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {["Dor no peito", "Falta de ar incomum", "Tontura ou desmaio", "Palpitações", "Dor articular intensa", "Cansaço extremo"].map(sintoma => (
                                        <label key={sintoma} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                                            <input type="checkbox" className="mt-1 w-4 h-4 accent-purple-600 rounded" />
                                            <span className="text-sm font-medium text-slate-700 leading-tight">{sintoma}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Exames Laboratoriais */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="font-bold text-slate-700">Exames Laboratoriais (mg/dL)</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InputField label="LDL" type="number" />
                                    <InputField label="HDL" type="number" />
                                    <InputField label="Triglicerídeos" type="number" />
                                    <InputField label="Colesterol Total" type="number" />
                                    <InputField label="Glicose Jejum" type="number" />
                                    <InputField label="Insulina" type="number" />
                                    <InputField label="HbA1C (%)" type="number" />
                                    <InputField label="Data do Exame" type="date" />
                                </div>
                            </div>

                            {/* Hábitos */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="font-bold text-slate-700">Hábitos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectField label="Fumo (Tabagismo)" options={["Nunca fumou", "Ex-fumante", "Fumante atual"]} />
                                    <SelectField label="Consumo Frequente de Álcool" options={["Não", "Ocasional", "Frequente"]} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === BLOCO 6: TESTES FUNCIONAIS === */}
                    {step === 5 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <ActivityIcon className="text-orange-500" /> 6. Testes Funcionais
                            </h2>

                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3 mb-6">
                                <ActivityIcon className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-orange-800">Protocolo Adaptado: {idade >= 60 ? 'Idoso (≥ 60 anos)' : 'Adulto (< 60 anos)'}</p>
                                    <p className="text-xs text-orange-700 mt-1">Os testes visuais abaixo são adaptados com base na idade selecionada no cabeçalho.</p>
                                </div>
                            </div>

                            {idade < 60 ? (
                                // --- TESTES ADULTO ---
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 mb-2">Flexibilidade Anterior do Tronco</h4>
                                            <p className="text-xs text-slate-500 mb-4">Banco de Wells</p>
                                            <InputField label="Distância alcançada (cm)" type="number" />
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 mb-2">Força de Membro Inferior</h4>
                                            <p className="text-xs text-slate-500 mb-4">TSLC 60 segundos</p>
                                            <InputField label="Número de repetições" type="number" />
                                        </div>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                                        <h4 className="font-bold text-slate-800 mb-2">Teste do Degrau (Variável FC)</h4>
                                        <p className="text-xs text-slate-500 mb-4">Mede a recuperação da frequência cardíaca.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <InputField label="FC Repouso (bpm)" type="number" />
                                            <InputField label="FC Final (imediatamente após)" type="number" />
                                            <InputField label="FC Recuperação (1 min após)" type="number" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // --- TESTES IDOSO (RIKLI & JONES) ---
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" className="mt-1 w-5 h-5 accent-rose-600 rounded" />
                                            <div>
                                                <span className="font-bold text-rose-700 block">Histórico de Quedas Recentes?</span>
                                                <span className="text-xs text-slate-600 font-medium leading-tight block">Marque se o paciente relatou quedas nos últimos 12 meses. Aumenta peso de risco no Score.</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">Sentar e Levantar (30s)</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Força de Membro Inferior</p>
                                            <InputField label="Repetições" type="number" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">Flexão de Cotovelo</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Força de Membro Superior</p>
                                            <InputField label="Repetições Lado Dominante" type="number" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">Sentar e Alcançar (Banco)</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Flexibilidade MMII</p>
                                            <InputField label="Distância (cm)" type="number" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">Alcançar Atrás das Costas</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Flexibilidade MMSS</p>
                                            <InputField label="Distância (cm, ou negativo se não tocar)" type="number" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">TUG (Timed Up and Go)</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Agilidade e Equilíbrio Dinâmico</p>
                                            <InputField label="Tempo (segundos)" type="number" />
                                            <div className="mt-2 text-xs font-bold text-rose-500 bg-rose-50 p-1.5 rounded border border-rose-100 inline-block">Alerta: {'> 15s = Risco Alto'}</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">Marcha Estacionária 2 Min</h4>
                                            <p className="text-[10px] text-slate-500 mb-3">Resistência Aeróbia</p>
                                            <InputField label="Passos Completos" type="number" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* === BLOCO 7: AMI (Idoso) === */}
                    {step === 6 && idade >= 60 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <BrainCircuit className="text-indigo-500" /> 7. Avaliação Multidimensional (AMI)
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">Ferramentas de rastreio cognitivo, humor e funcionalidade específica para idosos.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">1. Dependência Funcional</h3>
                                    <SelectField label="Atividades Instrumentais (AIVD)" options={["Independente", "Dependência Parcial", "Dependência Total"]} />
                                    <SelectField label="Atividades Básicas (AVD)" options={["Independente", "Dependência Parcial", "Dependência Total"]} />
                                    <p className="text-[10px] text-slate-400">Pfeffer / Lawton / Katz (Rastreio visual abreviado)</p>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">2. Cognição (Mini-Mental abreviado)</h3>
                                    <SelectField label="Orientação Temporal/Espacial" options={["Preservada", "Alteração Leve", "Desorientado"]} />
                                    <SelectField label="Memória de Evocação" options={["Recorda 3/3", "Recorda 1-2/3", "Não recorda (0/3)"]} />
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">3. Humor (GDS-15)</h3>
                                    <SelectField label="Rastreio de Depressão" options={["Normal (0-5 pontos)", "Depressão Leve (6-10 pontos)", "Depressão Grave (>10 pontos)"]} />
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">4. Sono</h3>
                                    <SelectField label="Qualidade do Sono" options={["Boa", "Limítrofe", "Ruim (Iniciação/Manutenção)"]} />
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 6 && idade < 60 && (
                        <div className="flex flex-col items-center justify-center p-12 text-slate-500 text-center">
                            <BrainCircuit className="w-12 h-12 mb-3 text-slate-300" />
                            <h3 className="font-bold text-lg text-slate-700">Bloco não aplicável</h3>
                            <p className="text-sm mt-1">A Avaliação Multidimensional do Idoso (AMI) se aplica apenas a pacientes com idade ≥ 60 anos.</p>
                        </div>
                    )}


                    {/* === BLOCO 8: FINALIZAÇÃO E ATIVIDADES === */}
                    {step === 7 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                                <Activity className="text-teal-500" /> 8. Atividades CAURN e Finalização
                            </h2>

                            <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl mb-6">
                                <h3 className="font-bold text-teal-800 flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5" /> Engajamento Atual
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-teal-100">
                                        <span className="text-sm text-slate-700 font-medium">Participa de algum programa de saúde CAURN?</span>
                                        <div className="flex gap-2">
                                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="prog_caurn" className="w-4 h-4 accent-teal-600" /> <span className="text-sm font-bold">Sim</span></label>
                                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="prog_caurn" className="w-4 h-4 accent-teal-600" /> <span className="text-sm font-bold">Não</span></label>
                                        </div>
                                    </div>
                                    <InputField label="Programas Atuais" placeholder="Se sim, quais? (Ex: CaurnAtiva, Terapia De Bem)" className="w-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Observações Adicionais do Avaliador</h3>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-indigo-500 focus:bg-white text-slate-700 min-h-[120px] resize-y"
                                    placeholder="Anotações relevantes, restrições específicas identificadas durante os testes, motivação do paciente..."
                                />
                            </div>

                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                                <div>
                                    <h3 className="font-black text-slate-800">Concluir Avaliação</h3>
                                    <p className="text-sm text-slate-500 mt-1">Ao finalizar, os dados serão enviados para o motor de estratificação para calcular a Idade Biológica e a pontuação de risco.</p>
                                </div>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 w-full md:w-auto justify-center">
                                    <Save className="w-5 h-5" /> Finalizar e Salvar
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* FLOATING ACTION BAR FOR SAVING PROGRESS */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 transform translate-y-0 transition-transform">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 hidden md:inline-block">Progresso salvo localmente.</span>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            disabled={step === 0}
                            onClick={() => setStep(s => Math.max(0, s - 1))}
                            className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                            disabled={step === 7}
                            onClick={() => setStep(s => Math.min(7, s + 1))}
                            className="flex-1 md:flex-none px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Próximo Bloco
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
