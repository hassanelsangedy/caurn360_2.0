"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useState, useEffect } from "react";
import {
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Clock,
    User,
    ClipboardList,
    Activity,
    Target,
    Brain,
    HeartPulse,
    AlertTriangle,
    Check,
    Calendar,
    Phone,
    Mail,
    Stethoscope
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types ---
type Section = 'IDENTIFICACAO' | 'SAUDE' | 'DORES' | 'OBJETIVOS' | 'IPAQ' | 'SF12' | 'DASS21' | 'CONCLUIDO';

export default function AvaliacaoDigitalPage() {
    const router = useRouter();
    const [section, setSection] = useState<Section>('IDENTIFICACAO');
    const [subStep, setSubStep] = useState(1);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [progress, setProgress] = useState(0);

    // Update progress based on section
    useEffect(() => {
        const sections: Section[] = ['IDENTIFICACAO', 'SAUDE', 'DORES', 'OBJETIVOS', 'IPAQ', 'SF12', 'DASS21', 'CONCLUIDO'];
        const index = sections.indexOf(section);
        setProgress(((index) / (sections.length - 1)) * 100);
    }, [section]);

    const handleAnswer = (key: string, value: any) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const next = () => {
        // Logic for skipping pain mapping if Q14 is No
        if (section === 'DORES' && subStep === 1 && answers['q14'] === 'Não') {
            setSection('OBJETIVOS');
            setSubStep(1);
            return;
        }

        // Section sequence logic
        if (section === 'IDENTIFICACAO') {
            if (subStep < 2) setSubStep(subStep + 1);
            else { setSection('SAUDE'); setSubStep(1); }
        } else if (section === 'SAUDE') {
            setSection('DORES'); setSubStep(1);
        } else if (section === 'DORES') {
            if (subStep < 2) setSubStep(subStep + 1);
            else { setSection('OBJETIVOS'); setSubStep(1); }
        } else if (section === 'OBJETIVOS') {
            setSection('IPAQ'); setSubStep(1);
        } else if (section === 'IPAQ') {
            if (subStep < 4) setSubStep(subStep + 1);
            else { setSection('SF12'); setSubStep(1); }
        } else if (section === 'SF12') {
            if (subStep < 4) setSubStep(subStep + 1);
            else { setSection('DASS21'); setSubStep(1); }
        } else if (section === 'DASS21') {
            if (subStep < 4) setSubStep(subStep + 1);
            else { setSection('CONCLUIDO'); setSubStep(1); }
        }
    };

    const back = () => {
        if (subStep > 1) {
            setSubStep(subStep - 1);
        } else {
            const sections: Section[] = ['IDENTIFICACAO', 'SAUDE', 'DORES', 'OBJETIVOS', 'IPAQ', 'SF12', 'DASS21', 'CONCLUIDO'];
            const currentIndex = sections.indexOf(section);
            if (currentIndex > 0) {
                const prevSection = sections[currentIndex - 1];
                setSection(prevSection);
                // Set substep to last based on section
                if (prevSection === 'IDENTIFICACAO') setSubStep(2);
                else if (prevSection === 'IPAQ') setSubStep(4);
                else if (prevSection === 'SF12') setSubStep(4);
                else if (prevSection === 'DASS21') setSubStep(4);
                else setSubStep(1);
            }
        }
    };

    // --- Components for Sections ---

    const RadioGroup = ({ options, value, onChange, grid = false }: any) => (
        <div className={`grid gap-3 ${grid ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {options.map((opt: string) => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${value === opt
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                >
                    <span className="font-semibold text-sm">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${value === opt ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {value === opt && <Check className="w-3 h-3 text-white" />}
                    </div>
                </button>
            ))}
        </div>
    );

    const TextInput = ({ label, value, onChange, placeholder, type = "text", note }: any) => (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-colors"
            />
            {note && <p className="text-[10px] text-slate-400 italic px-2">{note}</p>}
        </div>
    );

    return (
        <AppShell title="Triagem Digital" showBottomNav={true}>
            <div className="max-w-2xl mx-auto pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6 px-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            {section === 'IDENTIFICACAO' && <User className="w-5 h-5" />}
                            {section === 'SAUDE' && <HeartPulse className="w-5 h-5" />}
                            {section === 'DORES' && <Activity className="w-5 h-5" />}
                            {section === 'OBJETIVOS' && <Target className="w-5 h-5" />}
                            {section === 'IPAQ' && <Clock className="w-5 h-5" />}
                            {section === 'SF12' && <ClipboardList className="w-5 h-5" />}
                            {section === 'DASS21' && <Brain className="w-5 h-5" />}
                            {section === 'CONCLUIDO' && <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                                {section === 'IDENTIFICACAO' && "Identificação"}
                                {section === 'SAUDE' && "Saúde Geral"}
                                {section === 'DORES' && "Dores Articulares"}
                                {section === 'OBJETIVOS' && "Objetivos"}
                                {section === 'IPAQ' && "Atividade Física"}
                                {section === 'SF12' && "Qualidade de Vida"}
                                {section === 'DASS21' && "Saúde Mental"}
                                {section === 'CONCLUIDO' && "Concluído!"}
                            </h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aventura pela Vitalidade</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-black text-blue-600">{Math.round(progress)}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 min-h-[400px]">

                    {/* --- CONTENT BY SECTION --- */}

                    {section === 'IDENTIFICACAO' && (
                        <div className="space-y-6">
                            {subStep === 1 ? (
                                <>
                                    <TextInput
                                        label="1. Horário de início"
                                        type="time"
                                        value={answers['q1']}
                                        onChange={(v: string) => handleAnswer('q1', v)}
                                    />
                                    <TextInput
                                        label="2. Nome Completo"
                                        placeholder="Seu nome sem abreviações"
                                        note="Conforme consta no documento de identificação"
                                        value={answers['q2']}
                                        onChange={(v: string) => handleAnswer('q2', v)}
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">3. Sexo</label>
                                        <RadioGroup
                                            options={["Masculino", "Feminino"]}
                                            value={answers['q3']}
                                            onChange={(v: string) => handleAnswer('q3', v)}
                                            grid
                                        />
                                    </div>
                                    <TextInput
                                        label="4. Data de Nascimento"
                                        type="date"
                                        value={answers['q4']}
                                        onChange={(v: string) => handleAnswer('q4', v)}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">5. Estado Civil</label>
                                        <RadioGroup
                                            options={["Solteiro (a)", "Casado (a)", "Viúvo (a)", "Divorciado (a)"]}
                                            value={answers['q5']}
                                            onChange={(v: string) => handleAnswer('q5', v)}
                                            grid
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">6. Escolaridade</label>
                                        <select
                                            className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-white outline-none focus:border-blue-500 font-semibold text-sm"
                                            value={answers['q6'] || ""}
                                            onChange={(e) => handleAnswer('q6', e.target.value)}
                                        >
                                            <option value="">Selecione uma opção</option>
                                            {["Não frequentei a escola", "Fundamental incompleto", "Fundamental completo", "Ensino médio incompleto", "Ensino médio completo", "Superior incompleto", "Superior completo", "Especialização", "Mestrado", "Doutorado", "Pós-doutorado", "Não quero informar"].map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">7. Renda mensal domiciliar</label>
                                        <select
                                            className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-white outline-none focus:border-blue-500 font-semibold text-sm"
                                            value={answers['q7'] || ""}
                                            onChange={(e) => handleAnswer('q7', e.target.value)}
                                        >
                                            <option value="">Selecione uma opção</option>
                                            {["Sem renda", "Até 1/2 salário mínimo", "Mais de 1/2 a 1 salário mínimo", "Mais de 1 a 2 salários mínimos", "Mais de 2 a 5 salários mínimos", "Mais de 5 a 10 salários mínimos", "Mais de 10 a 20 salários mínimos", "Mais de 20 salários mínimos", "Não quero informar"].map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">8. Quantas pessoas vivem desta renda?</label>
                                        <RadioGroup
                                            options={["1", "2", "3", "4", "5", "6 ou mais", "Não quero informar"]}
                                            value={answers['q8']}
                                            onChange={(v: string) => handleAnswer('q8', v)}
                                            grid
                                        />
                                    </div>
                                    <TextInput
                                        label="9. Telefone (WhatsApp)"
                                        placeholder="(99) 99999-9999"
                                        value={answers['q9']}
                                        onChange={(v: string) => handleAnswer('q9', v)}
                                    />
                                    <TextInput
                                        label="10. E-mail"
                                        placeholder="exemplo@gmail.com"
                                        value={answers['q10']}
                                        onChange={(v: string) => handleAnswer('q10', v)}
                                    />
                                </>
                            )}
                        </div>
                    )}

                    {section === 'SAUDE' && (
                        <div className="space-y-6">
                            <TextInput
                                label="11. Possui alguma doença diagnosticada?"
                                placeholder="Especifique qual(is) ou responda 'Não'"
                                value={answers['q11']}
                                onChange={(v: string) => handleAnswer('q11', v)}
                            />
                            <TextInput
                                label="12. Faz uso contínuo de medicamento?"
                                placeholder="Nome e dose (ex: Losartana 50mg) ou responda 'Não'"
                                value={answers['q12']}
                                onChange={(v: string) => handleAnswer('q12', v)}
                            />
                            <TextInput
                                label="13. Já realizou alguma cirurgia?"
                                placeholder="Tipo e data ou responda 'Não'"
                                value={answers['q13']}
                                onChange={(v: string) => handleAnswer('q13', v)}
                            />
                        </div>
                    )}

                    {section === 'DORES' && (
                        <div className="space-y-6">
                            {subStep === 1 ? (
                                <div className="space-y-4 text-center">
                                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
                                        <AlertTriangle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800">14. Você apresenta dor nestas articulações?</h3>
                                    <p className="text-slate-400 text-sm">Ombros, cotovelos, punhos, quadris, joelhos, tornozelos ou coluna.</p>
                                    <RadioGroup
                                        options={["Sim", "Não"]}
                                        value={answers['q14']}
                                        onChange={(v: string) => handleAnswer('q14', v)}
                                        grid
                                    />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider bg-slate-50 p-3 rounded-xl border border-slate-100">Mapeamento de Intensidade</h3>
                                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6">
                                        {["Ombros", "Cotovelos", "Punhos", "Quadris", "Púbis", "Joelhos", "Tornozelos", "Cervical", "Torácica", "Lombar"].map((loc) => (
                                            <div key={loc} className="space-y-2">
                                                <label className="text-xs font-black text-slate-500 uppercase">{loc}</label>
                                                <RadioGroup
                                                    options={["Sem dor", "Aguda (movimento)", "Intermitente", "Crônica"]}
                                                    value={answers[`q_dor_${loc}`]}
                                                    onChange={(v: string) => handleAnswer(`q_dor_${loc}`, v)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {section === 'OBJETIVOS' && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">31. Qual seu PRINCIPAL OBJETIVO?</label>
                                <select
                                    className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-white outline-none focus:border-blue-500 font-semibold text-sm"
                                    value={answers['q31'] || ""}
                                    onChange={(e) => handleAnswer('q31', e.target.value)}
                                >
                                    <option value="">Selecione o objetivo</option>
                                    {["Redução de estresse", "Manutenção de peso", "Ter mais disposição", "Flexibilidade", "Prescrição médica", "Viver melhor", "Força", "Resistência física", "Condicionamento cardiovascular", "Perda de peso", "Sensação de bem-estar"].map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">32. O quanto capaz você se sente em alcançar este objetivo? (1 a 10)</label>
                                <div className="flex justify-between gap-1 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <button
                                            key={n}
                                            onClick={() => handleAnswer('q32', n)}
                                            className={`min-w-[40px] h-10 rounded-lg font-black text-sm transition-all border-2 ${answers['q32'] === n ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-100 bg-white text-slate-400'}`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                    <span>Não capaz</span>
                                    <span>Muito capaz</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">33. Prática atual de atividade física:</label>
                                <RadioGroup
                                    options={["Não pratico e não pretendo", "Não pratico, mas pretendo", "Pratico ocasionalmente", "Pratico regularmente", "Pratico há mais de 6 meses"]}
                                    value={answers['q33']}
                                    onChange={(v: string) => handleAnswer('q33', v)}
                                />
                            </div>
                        </div>
                    )}

                    {section === 'IPAQ' && (
                        <div className="space-y-6">
                            {subStep === 1 && (
                                <>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">34-35. Atividades VIGOROSAS <span className="text-blue-600 text-sm">(Esforço físico intenso)</span></h3>
                                    <TextInput label="Dias por semana (0 a 7)" type="number" value={answers['q34']} onChange={(v: any) => handleAnswer('q34', v)} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextInput label="Horas por dia" type="number" value={answers['q35h']} onChange={(v: any) => handleAnswer('q35h', v)} />
                                        <TextInput label="Minutos por dia" type="number" value={answers['q35m']} onChange={(v: any) => handleAnswer('q35m', v)} />
                                    </div>
                                </>
                            )}
                            {subStep === 2 && (
                                <>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">36-37. Atividades MODERADAS <span className="text-orange-600 text-sm">(Não inclua caminhada)</span></h3>
                                    <TextInput label="Dias por semana (0 a 7)" type="number" value={answers['q36']} onChange={(v: any) => handleAnswer('q36', v)} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextInput label="Horas por dia" type="number" value={answers['q37h']} onChange={(v: any) => handleAnswer('q37h', v)} />
                                        <TextInput label="Minutos por dia" type="number" value={answers['q37m']} onChange={(v: any) => handleAnswer('q37m', v)} />
                                    </div>
                                </>
                            )}
                            {subStep === 3 && (
                                <>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">38-39. CAMINHADA <span className="text-emerald-600 text-sm">(Mínimo 10 min contínuos)</span></h3>
                                    <TextInput label="Dias por semana (0 a 7)" type="number" value={answers['q38']} onChange={(v: any) => handleAnswer('q38', v)} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextInput label="Horas por dia" type="number" value={answers['q39h']} onChange={(v: any) => handleAnswer('q39h', v)} />
                                        <TextInput label="Minutos por dia" type="number" value={answers['q39m']} onChange={(v: any) => handleAnswer('q39m', v)} />
                                    </div>
                                </>
                            )}
                            {subStep === 4 && (
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800">40. Quais esportes/exercícios você realiza?</h3>
                                    <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto p-1">
                                        {["Caminhada", "Corrida", "Musculação", "Hidroginástica", "Natação", "Artes marciais", "Bicicleta", "Futebol", "Tênis", "Dança", "Não pratico"].map(sport => {
                                            const active = answers['q40']?.includes(sport);
                                            return (
                                                <button
                                                    key={sport}
                                                    onClick={() => {
                                                        const current = answers['q40'] || [];
                                                        if (active) handleAnswer('q40', current.filter((s: string) => s !== sport));
                                                        else handleAnswer('q40', [...current, sport]);
                                                    }}
                                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${active ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-100 text-slate-500'}`}
                                                >
                                                    {sport}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {section === 'SF12' && (
                        <div className="space-y-6">
                            {subStep === 1 && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">41. Em geral, você diria que sua saúde é:</label>
                                        <RadioGroup
                                            options={["Excelente", "Muito boa", "Boa", "Regular", "Ruim"]}
                                            value={answers['q41']}
                                            onChange={(v: string) => handleAnswer('q41', v)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">42. Atividades médias (compras, mover cadeira...)</label>
                                        <RadioGroup
                                            options={["Dificulta muito", "Dificulta um pouco", "Não dificulta"]}
                                            value={answers['q42']}
                                            onChange={(v: string) => handleAnswer('q42', v)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">43. Subir três ou mais degraus de escada?</label>
                                        <RadioGroup
                                            options={["Dificulta muito", "Dificulta um pouco", "Não dificulta"]}
                                            value={answers['q43']}
                                            onChange={(v: string) => handleAnswer('q43', v)}
                                        />
                                    </div>
                                </>
                            )}
                            {subStep === 2 && (
                                <div className="space-y-6">
                                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Últimas 4 semanas (Saúde Física)</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                                            <span className="text-xs font-bold text-slate-700">44. Fez menos do que gostaria?</span>
                                            <button onClick={() => handleAnswer('q44', !answers['q44'])} className={`px-4 py-2 rounded-lg font-black text-xs ${answers['q44'] ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{answers['q44'] ? "Sim" : "Não"}</button>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                                            <span className="text-xs font-bold text-slate-700">45. Dificulade no trabalho/atividades?</span>
                                            <button onClick={() => handleAnswer('q45', !answers['q45'])} className={`px-4 py-2 rounded-lg font-black text-xs ${answers['q45'] ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{answers['q45'] ? "Sim" : "Não"}</button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Últimas 4 semanas (Problemas Emocionais)</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                                            <span className="text-xs font-bold text-slate-700">46. Fez menos do que gostaria?</span>
                                            <button onClick={() => handleAnswer('q46', !answers['q46'])} className={`px-4 py-2 rounded-lg font-black text-xs ${answers['q46'] ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{answers['q46'] ? "Sim" : "Não"}</button>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                                            <span className="text-xs font-bold text-slate-700">47. Deixou de fazer trabalho cuidadosamente?</span>
                                            <button onClick={() => handleAnswer('q47', !answers['q47'])} className={`px-4 py-2 rounded-lg font-black text-xs ${answers['q47'] ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{answers['q47'] ? "Sim" : "Não"}</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {subStep === 3 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">48. Alguma dor atrapalhou seu trabalho?</label>
                                        <RadioGroup
                                            options={["Não", "Um pouco", "Moderadamente", "Bastante", "Extremamente"]}
                                            value={answers['q48']}
                                            onChange={(v: string) => handleAnswer('q48', v)}
                                        />
                                    </div>
                                </div>
                            )}
                            {subStep === 4 && (
                                <div className="space-y-6">
                                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Últimas 4 semanas (Seu Estado)</h3>
                                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6">
                                        {[
                                            { id: 'q49', text: '49. Tem se sentido calmo e tranquilo?' },
                                            { id: 'q50', text: '50. Teve bastante energia?' },
                                            { id: 'q51', text: '51. Sentiu-se desanimado e deprimido?' },
                                            { id: 'q52', text: '52. Saúde ou emoções atrapalharam atividades sociais?' },
                                        ].map(item => (
                                            <div key={item.id} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-800">{item.text}</label>
                                                <RadioGroup
                                                    options={["Todo o tempo", "Quase todo o tempo", "Parte do tempo", "Pouco tempo", "Nem um pouco"]}
                                                    value={answers[item.id]}
                                                    onChange={(v: string) => handleAnswer(item.id, v)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {section === 'DASS21' && (
                        <div className="space-y-6">
                            <p className="text-[10px] bg-purple-50 text-purple-600 p-3 rounded-xl border border-purple-100 font-bold uppercase text-center mb-4">Indique o quanto se aplicou na ÚLTIMA SEMANA</p>
                            <div className="max-h-[350px] overflow-y-auto pr-2 space-y-8">
                                {[
                                    { q: 53, text: "1. Tive dificuldade em acalmar-me" },
                                    { q: 54, text: "2. Senti minha boca seca" },
                                    { q: 55, text: "3. Parecia que eu não tinha nenhum sentimento positivo" },
                                    { q: 56, text: "4. Tive dificuldade em respirar" },
                                    { q: 57, text: "5. Senti dificuldade em ter iniciativa" },
                                    { q: 58, text: "6. Reagi exageradamente às situações" },
                                    { q: 59, text: "7. Senti tremores (ex: nas mãos)" },
                                    { q: 60, text: "8. Senti que estava sempre nervoso" },
                                    { q: 61, text: "9. Preocupado em entrar em pânico/ficar ridículo" },
                                    { q: 62, text: "10. Senti que não tinha nada a desejar para o futuro" },
                                    { q: 63, text: "11. Senti-me agitado" },
                                    { q: 64, text: "12. Tive dificuldade em relaxar" },
                                    { q: 65, text: "13. Senti-me depressivo e sem ânimo" },
                                    { q: 66, text: "14. Fui intolerante com qualquer interrupção" },
                                    { q: 67, text: "15. Senti que ia entrar em pânico" },
                                    { q: 68, text: "16. Fui incapaz de me entusiasmar" },
                                    { q: 69, text: "17. Senti que não tinha valor como pessoa" },
                                    { q: 70, text: "18. Senti-me emotivo e sensível demais" },
                                    { q: 71, text: "19. Senti o coração alterado s/ esforço físico" },
                                    { q: 72, text: "20. Senti medo sem motivo" },
                                    { q: 73, text: "21. Senti que a vida não fazia sentido" },
                                ].slice((subStep - 1) * 6, subStep * 6).map((item) => (
                                    <div key={item.q} className="space-y-3">
                                        <p className="text-sm font-bold text-slate-800 leading-tight">{item.text}</p>
                                        <RadioGroup
                                            options={[
                                                "Não se aplicou de maneira alguma",
                                                "Aplicou-se em algum grau",
                                                "Aplicou-se consideravelmente",
                                                "Aplicou-se muito / maioria do tempo"
                                            ]}
                                            value={answers[`q${item.q}`]}
                                            onChange={(v: string) => handleAnswer(`q${item.q}`, v)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {section === 'CONCLUIDO' && (
                        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-10">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 leading-tight">Parabéns!</h3>
                                <p className="text-slate-500 mt-2">Você completou um passo importante para aumentar seu autoconhecimento.</p>
                                <div className="mt-8 bg-blue-50 p-6 rounded-3xl border border-blue-100 text-blue-900 border-dashed">
                                    <p className="text-xs font-bold uppercase tracking-widest mb-2">Próximo Passo</p>
                                    <p className="font-bold text-sm">Sua pontuação de vitalidade está sendo processada.</p>
                                    <p className="text-xs text-blue-700/70 mt-1">Nossa equipe entrará em contato via WhatsApp para agendar sua avaliação física presencial.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/dashboard/associado')}
                                className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-sm shadow-xl hover:bg-black transition-all active:scale-95"
                            >
                                Voltar para o Mapa
                            </button>
                        </div>
                    )}

                </div>

                {/* --- NAVIGATION FOOTER --- */}
                {section !== 'CONCLUIDO' && (
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={back}
                            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Anterior
                        </button>

                        <button
                            onClick={next}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white p-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all"
                        >
                            Continuar
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}

