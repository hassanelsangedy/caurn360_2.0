/**
 * Score de Vitalidade (Integrado)
 * Processa dados físicos e psicológicos para suporte à decisão profissional.
 */

export function vitalidadeEngine(dadosDia0: any, dadosDia1: any) {
    // Cálculo de Força (Dinamometria) e Flexibilidade
    // Fallback para 0 se não houver dados
    const forcaDir = dadosDia1?.dinamometria_dir || 0;
    const forcaEsq = dadosDia1?.dinamometria_esq || 0;
    const forca = Math.max(forcaDir, forcaEsq);

    // ALERTA DE SEGURANÇA (Pág. 27/73)
    const paSistolicaPos = dadosDia1?.pa_sistolica_pos_exercicio || 0;
    const alertaPressao = paSistolicaPos > 160;

    // Mock de cálculo DASS-21 (Soma simples de respostas de saúde mental)
    const calcularDass21 = (d0: any) => {
        if (!d0) return 0;
        // Soma de q53 até q73 se disponíveis
        let total = 0;
        for (let i = 53; i <= 73; i++) {
            const val = d0[`q${i}`];
            if (typeof val === 'number') total += val;
            else if (val === "Não se aplicou de maneira alguma") total += 0;
            else if (val === "Aplicou-se em algum grau") total += 1;
            else if (val === "Aplicou-se consideravelmente") total += 2;
            else if (val === "Aplicou-se muito / maioria do tempo") total += 3;
        }
        return total;
    };

    const stamina = calcularDass21(dadosDia0);

    return {
        stats: {
            forca: forca,
            stamina: stamina,
        },
        status_clinico: alertaPressao ? "Requer Avaliação Médica" : "Apto ao Exercício",
        portais_sugeridos: alertaPressao ? ["Acolhimento APS"] : ["Pilates", "Funcional"],
        alerta_critico: alertaPressao
    };
}
