"use client";

import { useState } from "react";
import {
    Calendar as CalendarIcon,
    Camera,
    MessageSquare,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Heart,
    Send,
    ShieldAlert,
    X
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isToday, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { submitCheckIn, createPost, createComment } from "@/app/actions/activity";

interface ActivityInteractionProps {
    programId: string;
    programName: string;
    participacaoId: string;
    isPrivate?: boolean;
    initialFeed?: any[];
}

export function ActivityInteraction({ programId, programName, participacaoId, isPrivate, initialFeed = [] }: ActivityInteractionProps) {
    const [view, setView] = useState<"calendar" | "feed">("calendar");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    // Modal State
    const [checkInData, setCheckInData] = useState({
        presente: true,
        diario: "",
        sentimento: "",
        foto: ""
    });

    const [feed, setFeed] = useState(initialFeed);
    const [newPost, setNewPost] = useState("");

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="flex items-center justify-between px-4 mb-4">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-slate-100 rounded-full">
                    <ChevronLeft className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                    {format(currentMonth, dateFormat, { locale: ptBR })}
                </h2>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-slate-100 rounded-full">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day, i) => (
                    <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const cloneDay = day;

                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isPast = isBefore(day, new Date()) || isToday(day);

                days.push(
                    <div
                        key={day.toString()}
                        className={`relative h-14 flex flex-col items-center justify-center border-t border-slate-50 cursor-pointer transition-all
                            ${!isCurrentMonth ? "text-slate-200" : "text-slate-700"}
                            ${isSelected ? "bg-red-50" : "hover:bg-slate-50"}
                        `}
                        onClick={() => {
                            setSelectedDate(cloneDay);
                            if (isCurrentMonth && isPast) setShowModal(true);
                        }}
                    >
                        <span className={`text-xs font-bold ${isSelected ? "text-caurn-red" : ""}`}>{formattedDate}</span>
                        {isToday(day) && <div className="absolute bottom-2 w-1 h-1 bg-caurn-red rounded-full" />}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">{rows}</div>;
    };

    const handleCheckInSubmit = async () => {
        const result = await submitCheckIn({
            participacaoId,
            presente: checkInData.presente,
            diario: checkInData.diario,
            sentimento: checkInData.sentimento,
            fotoEvidencia: checkInData.foto
        });
        if (result.success) {
            setShowModal(false);
            // Reset state
            setCheckInData({ presente: true, diario: "", sentimento: "", foto: "" });
        }
    };

    return (
        <div className="space-y-6">
            {/* View Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mx-2">
                <button
                    onClick={() => setView("calendar")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${view === 'calendar' ? 'bg-white text-caurn-red shadow-sm' : 'text-slate-500'}`}
                >
                    <CalendarIcon className="w-4 h-4" />
                    Calendário
                </button>
                <button
                    onClick={() => setView("feed")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${view === 'feed' ? 'bg-white text-caurn-red shadow-sm' : 'text-slate-500'}`}
                >
                    <MessageSquare className="w-4 h-4" />
                    Mural
                </button>
            </div>

            {view === "calendar" ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}

                    <div className="mt-8 bg-caurn-red/5 p-6 rounded-[32px] border border-caurn-red/10 text-center">
                        <Heart className="w-8 h-8 text-caurn-red mx-auto mb-2 animate-pulse" />
                        <h4 className="text-sm font-black text-caurn-dark uppercase leading-tight">Diário da Vitalidade</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Marque suas presenças e acompanhe sua evolução para se tornar um Associado Estrela!</p>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 px-2">
                    {/* New Post Input */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Como foi seu treino hoje?"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 ring-caurn-red/10 resize-none min-h-[100px]"
                        />
                        <div className="flex items-center justify-between">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-caurn-red transition-colors">
                                <Camera className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Adicionar Foto</span>
                            </button>
                            <button
                                onClick={async () => {
                                    if (!newPost.trim()) return;
                                    await createPost({
                                        participacaoId,
                                        programaId: programId,
                                        conteudo: newPost,
                                        tipo: "Social"
                                    });
                                    setNewPost("");
                                }}
                                className="bg-caurn-red text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-2 shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all"
                            >
                                <Send className="w-4 h-4" />
                                Postar
                            </button>
                        </div>
                    </div>

                    {/* Feed Content */}
                    <div className="space-y-6">
                        {feed.map((post: any) => (
                            <div key={post.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                                <div className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 text-xs">
                                        {post.participacao.associado.nome.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{post.participacao.associado.nome}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">{format(new Date(post.createdAt), "Pp", { locale: ptBR })}</p>
                                    </div>
                                </div>

                                {post.imagemUrl && (
                                    <div className="aspect-square bg-slate-100 relative">
                                        <img src={post.imagemUrl} alt="Post" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="p-4 space-y-4">
                                    <p className="text-sm font-medium text-slate-700 leading-relaxed">{post.conteudo}</p>

                                    <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-caurn-red transition-colors">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase">{post.reacoes?.length || 0} Curtir</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-caurn-red transition-colors">
                                            <MessageSquare className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase">{post.comentarios?.length || 0} Comentar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Check-in Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-caurn-dark">Check-in</h3>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setCheckInData({ ...checkInData, presente: !checkInData.presente })}
                                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${checkInData.presente ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                >
                                    <span className="font-bold">Confirmar Presença</span>
                                    <CheckCircle2 className={`w-6 h-6 ${checkInData.presente ? 'text-emerald-500' : 'text-slate-200'}`} />
                                </button>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Como você se sentiu?</label>
                                    <textarea
                                        value={checkInData.diario}
                                        onChange={(e) => setCheckInData({ ...checkInData, diario: e.target.value })}
                                        placeholder="Descreva brevemente sua experiência..."
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 ring-caurn-red/10 resize-none min-h-[100px]"
                                    />
                                    {checkInData.diario.toLowerCase().includes("dor") && (
                                        <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-3 rounded-xl border border-amber-200 animate-pulse">
                                            <ShieldAlert className="w-4 h-4 shrink-0" />
                                            <p className="text-[10px] font-bold uppercase tracking-tight">O sistema identificou um alerta. A APS será notificada.</p>
                                        </div>
                                    )}
                                </div>

                                <button className="w-full flex items-center justify-center gap-3 py-5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-caurn-red hover:text-caurn-red hover:bg-red-50 transition-all">
                                    <Camera className="w-6 h-6" />
                                    <div className="text-left">
                                        <p className="text-xs font-black uppercase">Subir Evidência (Opcional)</p>
                                        <p className="text-[9px] font-bold opacity-60">Foto do prato ou treino</p>
                                    </div>
                                </button>
                                <p className="text-[8px] text-slate-400 text-center uppercase font-black px-4">
                                    Certifique-se de que todos os presentes na foto autorizaram a postagem.
                                </p>
                            </div>

                            <button
                                onClick={handleCheckInSubmit}
                                className="w-full bg-caurn-red text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Salvar Atividade
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
