"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
    MapPin,
    User as UserIcon,
    Clock,
    MessageCircle,
    Send,
    ChevronLeft,
    Camera,
    Plus,
    Info,
    Calendar,
    ArrowRight,
    Headphones,
    CheckCircle2,
    MonitorPlay
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

interface ProgramData {
    id: string;
    name: string;
    proposal: string;
    description: string;
    location: string;
    professional: string;
    schedule: string;
    enrolledCount: number;
    extraLink?: { label: string; url: string };
}

const PROGRAMS_DATA: Record<string, ProgramData> = {
    "nutricao-ativa": {
        id: "nutricao-ativa",
        name: "Nutrição Ativa",
        proposal: "Alimentação equilibrada, saudável e saborosa.",
        description: "Visa promover uma alimentação equilibrada, saudável e saborosa aos participantes, quebrando mitos e tabus que não os permitem viver em harmonia com os alimentos. Ensina que é possível comer bem de forma prazerosa através de atividades de educação nutricional e desenvolvimento de receitas.",
        location: "Casa CAURN",
        professional: "Nutricionista Cassiana Araújo",
        schedule: "Quarta-feira às 10:30hs ou Quinta-feira às 14:00hs",
        enrolledCount: 32
    },
    "bem-viver": {
        id: "bem-viver",
        name: "Grupo Bem Viver",
        proposal: "Autoestima, autonomia e interação social para idosos.",
        description: "Visa proporcionar a oportunidade aos idosos de aumentarem a autoestima e autonomia, favorecer a interação social e estimular as emoções e cognição através de atividades dinâmicas e interativas em grupo, como a escuta terapêutica e reflexões diversas.",
        location: "Encontros virtuais e presenciais na Casa CAURN",
        professional: "Psicólogas Andiara Cachina e Renata Dantas",
        schedule: "Segunda-feira às 15:00hs",
        enrolledCount: 28
    },
    "memoria": {
        id: "memoria",
        name: "Grupo da Memória",
        proposal: "Preservação e melhora das funções cognitivas.",
        description: "Busca preservar e/ou melhorar o desempenho das funções cognitivas como memória, atenção e raciocínio. Previne o declínio cognitivo e promove hábitos de vida saudáveis, como leitura e escrita, além de promover o desenvolvimento da autoconfiança.",
        location: "Casa CAURN",
        professional: "Terapeuta Ocupacional Fernanda Melo e Psicóloga Renata Dantas",
        schedule: "Quarta-feira às 14:00hs ou Quinta-feira às 09:00hs",
        enrolledCount: 15
    },
    "pilates": {
        id: "pilates",
        name: "Grupo de Pilates",
        proposal: "Fortalecimento, flexibilidade e mobilidade articular.",
        description: "Tem como objetivo proporcionar fortalecimento e flexibilidade muscular e aumento da mobilidade das articulações, gerando melhora no padrão respiratório e equilíbrio. Os exercícios contam com aparelhos e acessórios para garantir a sustentação corporal e menor risco de lesões.",
        location: "Clínica de Fisioterapia - Sede",
        professional: "Fisioterapeuta Heloísa Britto",
        schedule: "Seg/Qua (14h até 16h em 4 turmas) ou Ter/Qui (08h até 10h em 4 turmas)",
        enrolledCount: 45
    },
    "cuidadores": {
        id: "cuidadores",
        name: "Grupo de Cuidadores",
        proposal: "Acolher e orientar cuidadores formais e informais.",
        description: "Surgiu da necessidade de acolher, orientar e realizar trocas de experiências entre os cuidadores formais e informais da CAURN. Cuidar de quem cuida favorece o compartilhar de vivências e fomenta soluções positivas no lidar diário.",
        location: "Casa CAURN",
        professional: "Enfermeira Vanessa Nogueira",
        schedule: "Segunda-feira às 16:00hs",
        enrolledCount: 12
    },
    "meta": {
        id: "meta",
        name: "Grupo Meta",
        proposal: "Apoio ao emagrecimento com saúde.",
        description: "Grupo voltado para o apoio ao emagrecimento, onde são ensinadas estratégias que podem auxiliar os associados no processo de emagrecer com saúde através de reeducação comportamental.",
        location: "Casa CAURN",
        professional: "Nutricionista Cassiana Araújo",
        schedule: "Terça-feira às 10:30hs",
        enrolledCount: 22
    },
    "hidrotreinamento": {
        id: "hidrotreinamento",
        name: "Grupo de Hidrotreinamento",
        proposal: "Melhorar qualidade de vida através de exercícios aquáticos.",
        description: "Visa melhorar a qualidade de vida e saúde através de exercícios aquáticos de força e potência. O principal objetivo é diminuir o potencial de quedas da população idosa utilizando a resistência da água.",
        location: "Espaço de Hidroterapia (Informações na Casa CAURN)",
        professional: "Equipe de Fisioterapia",
        schedule: "Terça-feira e Quinta-feira às 08:00hs",
        enrolledCount: 18
    },
    "danca": {
        id: "danca",
        name: "Grupo da Dança",
        proposal: "Hábitos saudáveis e vínculos sociais através da dança.",
        description: "Busca incentivar hábitos saudáveis através de diferentes estilos de dança e ritmos musicais (forró, samba, axé, etc). Contribui para o resgate de memórias afetivas e proporciona bem-estar físico e psicológico.",
        location: "Casa CAURN",
        professional: "Professora Rosa Mendonça",
        schedule: "Segunda-feira e Quarta-feira às 9:30hs",
        enrolledCount: 35
    },
    "arte-terapia": {
        id: "arte-terapia",
        name: "Arte Terapia",
        proposal: "Atividades criativas com fins terapêuticos.",
        description: "Utiliza recursos artísticos, promove atividades criativas e explora os sentidos com fins terapêuticos, aprimorando o aprendizado, a percepção, a memória e a criatividade.",
        location: "Casa CAURN",
        professional: "Arte terapeuta Manuella Sousa",
        schedule: "Quarta-feira às 15:00hs",
        enrolledCount: 10
    },
    "caurn-personal-digital": {
        id: "caurn-personal-digital",
        name: "Caurn Personal Digital",
        proposal: "Treino online realizado em casa via WhatsApp.",
        description: "Descubra o Caurn Personal Digital: O seu treino, no seu tempo.\n\nSabemos que encontrar tempo e motivação para se exercitar pode ser um grande desafio na correria do dia a dia. É por isso que criamos o Caurn Personal Digital, um programa de acompanhamento físico inovador, totalmente online e pensado exclusivamente para você, associado CAURN.\n\nEsqueça as planilhas genéricas que não se encaixam na sua vida. O nosso diferencial é o cuidado individualizado: seu programa de exercícios é prescrito pela nossa equipe de especialistas da UFRN, com base direta nos resultados da sua Avaliação de Saúde. Nós transformamos os seus dados em um plano de ação prático.\n\nPor que aderir ao programa?\n\n- Flexibilidade Total: O exercício deve se adaptar à sua rotina, e não o contrário. Treine no conforto da sua casa, no prédio, na academia ou ao ar livre, no horário que for melhor para você.\n\n- Segurança e Precisão: Receba treinos sob medida para os seus objetivos, elaborados para respeitar os seus limites, prevenir dores e melhorar a sua aptidão física com segurança.\n\n- Acompanhamento Contínuo: Você tem a conveniência do digital, mas nunca estará sozinho. Nossa equipe monitora sua evolução e ajusta as rotas para garantir que você se mantenha motivado e alcance uma verdadeira mudança de hábitos.\n\nO primeiro passo para uma vida com mais energia, saúde e bem-estar está, literalmente, na palma da sua mão.",
        location: "Residencial (On-line)",
        professional: "Professor Hassan Mohamed",
        schedule: "Envio de treinos 2x ou 3x por semana via WhatsApp",
        enrolledCount: 125,
        extraLink: { label: "Acessar Formulário de Inscrição", url: "https://docs.google.com/forms/..." }
    },
    "caurn-ativa-presencial": {
        id: "caurn-ativa-presencial",
        name: "Treino Funcional e Yoga",
        proposal: "Treino presencial na academia BurnFit.",
        description: "Treinamento físico presencial para idosos que alterna entre práticas de treino funcional e yoga na academia BurnFit. Acompanhado por professores especialistas em cada modalidade.",
        location: "Academia BurnFit - Cidade Jardim",
        professional: "Equipe BurnFit & Prof. Hassan Mohamed",
        schedule: "Manhã: Qua/Sex (08h-09h) | Tarde: Ter/Sex (14:30h-15:30h)",
        enrolledCount: 40
    },
    "recomecar-aconselhamento": {
        id: "recomecar-aconselhamento",
        name: "Recomeçar - Aconselhamento",
        proposal: "Aumentar nível de atividade física e reduzir sedentarismo.",
        description: "Atendimento realizado por profissionais de Educação Física para esclarecer dúvidas sobre saúde e comportamento. Aplica estratégias de mudança de comportamento para estabelecer objetivos e metas personalizadas.",
        location: "Casa CAURN / On-line",
        professional: "Profissionais de Educação Física CAURN",
        schedule: "Agendamento Individual via WhatsApp",
        enrolledCount: 15
    }
};

import { ConsentModal } from "@/components/activity/ConsentModal";
import { ActivityInteraction } from "@/components/activity/ActivityInteraction";

import { registrarInteressePrograma } from "@/app/actions/programas";
const toast = {
    success: (msg: string) => alert(`Sucesso: ${msg}`),
    error: (msg: string) => alert(`Erro: ${msg}`)
};

export default function ProgramaDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const programData = PROGRAMS_DATA[id] || {
        id: "unknown",
        name: "Atividade",
        proposal: "",
        description: "Informações em atualização.",
        location: "Casa CAURN",
        professional: "Equipe Técnica",
        schedule: "Sob Agendamento",
        enrolledCount: 0
    };

    // States: 'info' -> 'details' -> 'consent' -> 'confirmation' -> 'enrolled'
    const [step, setStep] = useState<'info' | 'details' | 'consent' | 'confirmation' | 'enrolled'>('info');
    const [showConsent, setShowConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMuralDemo, setShowMuralDemo] = useState(false);

    const router = useRouter();

    // Mock for demo purposes: if program is pilates, show special flow
    const isPilates = id === 'pilates';

    // Mock enrollment state - in a real app this would come from the database
    // For the demo, we'll allow the user to go through the flow
    const handleConfirmInterest = async () => {
        setIsSubmitting(true);
        // Simulating the action call
        setTimeout(() => {
            setIsSubmitting(false);
            setStep('enrolled');
            toast.success("Interesse enviado com sucesso!");
        }, 1500);
    };

    const handleAcceptConsent = (consent: any) => {
        setStep('confirmation');
    };

    return (
        <AppShell title={programData.name}>
            <div className="max-w-md mx-auto space-y-6 pb-24 px-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <Link href="/programas" className="flex items-center gap-1 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Voltar para Programas
                </Link>

                {step !== 'enrolled' && (
                    <>
                        {/* Hero Card */}
                        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 opacity-5 blur-[100px] -mr-24 -mt-24 rounded-full" />
                            <h1 className="text-2xl font-black text-slate-800 leading-tight mb-4">{programData.name}</h1>

                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Jornada do Autocuidado</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Onde acontece</p>
                                        <p className="text-sm font-bold text-slate-700">{programData.location}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Responsável</p>
                                        <p className="text-sm font-bold text-slate-700">{programData.professional}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Agenda</p>
                                        <p className="text-sm font-bold text-slate-700">{programData.schedule}</p>
                                    </div>
                                </div>
                            </div>

                            {step === 'info' && (
                                <button
                                    onClick={() => setStep('details')}
                                    className="w-full mt-10 bg-blue-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Saber Mais
                                    <Info className="w-5 h-5" />
                                </button>
                            )}

                            {step === 'details' && (
                                <button
                                    onClick={() => setStep('consent')}
                                    className="w-full mt-10 bg-emerald-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Quero Participar
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            )}

                            {step === 'confirmation' && (
                                <button
                                    disabled={isSubmitting}
                                    onClick={handleConfirmInterest}
                                    className="w-full mt-10 bg-caurn-red text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Enviando..." : "Confirmar interesse em participar"}
                                    <Send className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Description Section (Visible during 'details' step or after) */}
                        {step !== 'info' && (
                            <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-200 animate-in fade-in slide-in-from-top-4">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-blue-600" />
                                    Benefícios para sua Saúde
                                </h3>
                                <div className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                                    {programData.description.split('\n').map((line, i) => (
                                        <p key={i} className={line.startsWith('-') || line.startsWith('*') ? 'ml-4' : 'mb-2'}>
                                            {line}
                                        </p>
                                    ))}
                                    <div className="mt-4 p-4 bg-blue-100/50 rounded-2xl border border-blue-200/50">
                                        <p className="text-xs font-bold text-blue-800 flex items-center gap-2">
                                            <Activity className="w-4 h-4" /> Evolução Monitorada
                                        </p>
                                        <p className="text-[10px] text-blue-700 mt-1">
                                            {id === 'pilates'
                                                ? "A prática contínua de Pilates ajuda a melhorar significativamente a flexibilidade medida no seu Raio-X original."
                                                : "Este programa foca na melhora dos indicadores identificados na sua avaliação inicial."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {step === 'enrolled' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        {/* Status Header: Interest Sent */}
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 opacity-20 blur-3xl -mr-8 -mt-8" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Clock className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black">{programData.name}</h2>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Estado da Solicitação</p>
                                </div>
                            </div>

                            <button className="w-full bg-orange-500/20 text-orange-400 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-orange-500/30 flex items-center justify-center gap-2">
                                Interesse Enviado ⏳
                            </button>

                            <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-xs text-slate-300 font-bold leading-relaxed">
                                    O responsável técnico analisará seu <span className="text-caurn-red font-black">Raio-X de Vitalidade</span> e em breve entrará em contato para confirmar sua participação.
                                </p>
                            </div>
                        </div>

                        {/* MOCK: "Mestre da APS Aprovou" - Toggle button to show Mural/Calendar for demo */}
                        <div className="p-1 bg-slate-100 rounded-2xl border border-slate-200">
                            <button
                                onClick={() => setShowMuralDemo(true)}
                                className="w-full py-2 text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-caurn-red transition-all"
                            >
                                Simular Aprovação do Profissional (Demo)
                            </button>
                        </div>

                        {showMuralDemo && (
                            <div className="space-y-6 animate-in zoom-in-95 duration-500">
                                {/* Mural Do Professor */}
                                <div className="bg-white rounded-[32px] p-6 shadow-xl border border-blue-100">
                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <MonitorPlay className="w-4 h-4 text-blue-600" />
                                        Mural do Professor
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                            <p className="text-xs font-bold text-slate-700">Bem-vindo ao Pilates!</p>
                                            <p className="text-[10px] text-slate-500 mt-1">Nossa primeira aula focará em mobilidade pélvica. Traga sua garrafa de água.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Calendário e Presença */}
                                <div className="bg-white rounded-[32px] p-6 shadow-xl border border-emerald-100">
                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        Cronograma e Presença
                                    </h3>
                                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                                        <div>
                                            <p className="text-xs font-black text-slate-800">Aula de Amanhã (08:00h)</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Sede - Sala de Pilates</p>
                                        </div>
                                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                                            Indicar Presença
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => router.push('/dashboard/associado')}
                            className="w-full border-2 border-slate-200 text-slate-400 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:border-slate-300 hover:text-slate-600 transition-all flex items-center justify-center gap-2"
                        >
                            Voltar para o Saúde 360
                        </button>
                    </div>
                )}

                {step === 'consent' && (
                    <ConsentModal
                        onAccept={handleAcceptConsent}
                        onClose={() => setStep('details')}
                    />
                )}
            </div>
        </AppShell>
    );
}

// Ensure Activity is imported if used
import { Activity } from "lucide-react";
import { useRouter } from "next/navigation";
