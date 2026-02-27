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
    CheckCircle2
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

    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showConsent, setShowConsent] = useState(false);

    const handleAcceptConsent = (consent: any) => {
        setIsEnrolled(true);
        setShowConsent(false);
    };

    return (
        <AppShell title={programData.name}>
            <div className="max-w-md mx-auto space-y-6 pb-24 px-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <Link href="/programas" className="flex items-center gap-1 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Voltar para Programas
                </Link>

                {!isEnrolled ? (
                    <>
                        {/* Hero Card */}
                        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 opacity-5 blur-[100px] -mr-24 -mt-24 rounded-full" />
                            <h1 className="text-2xl font-black text-slate-800 leading-tight mb-4">{programData.name}</h1>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="flex -space-x-2 mr-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">👤</div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atividade em grupo</span>
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

                            <button
                                onClick={() => setShowConsent(true)}
                                className="w-full mt-10 bg-caurn-red text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                Quero Participar
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* About Section */}
                        <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-200">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-600" />
                                O que é a atividade?
                            </h3>
                            <div className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                                {programData.description.split('\n').map((line, i) => (
                                    <p key={i} className={line.startsWith('-') || line.startsWith('*') ? 'ml-4' : 'mb-2'}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        {/* Enrolled Status Header */}
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 opacity-20 blur-3xl -mr-8 -mt-8" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black">{programData.name}</h2>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Inscrição Ativa • LGPD Ok</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                Use o calendário abaixo para marcar sua presença e o mural para interagir com o grupo e a equipe da <strong>{programData.professional}</strong>.
                            </p>
                        </div>

                        {/* Interactive Area */}
                        <ActivityInteraction
                            programId={id}
                            programName={programData.name}
                            participacaoId="demo-part-1"
                            isPrivate={id === "bem-viver"}
                            initialFeed={[
                                {
                                    id: "1",
                                    createdAt: new Date().toISOString(),
                                    conteudo: "Hoje a aula de dança me deixou muito animado!",
                                    participacao: { associado: { nome: "Maria Silva" } },
                                    reacoes: [],
                                    comentarios: []
                                }
                            ]}
                        />
                    </div>
                )}

                {showConsent && (
                    <ConsentModal
                        onAccept={handleAcceptConsent}
                        onClose={() => setShowConsent(false)}
                    />
                )}
            </div>
        </AppShell>
    );
}
