import React from 'react';

export const MitosVerdadesPage: React.FC = () => {
  const lista = [
    {
      tipo: 'Mito',
      afirmacao: '“Todo nódulo na mama é câncer.”',
      resposta: 'Mito. A maioria dos nódulos mamários é benigna.',
      explicacao:
        'Isso não significa que um nódulo possa ser ignorado. Qualquer caroço endurecido, fixo ou em crescimento deve ser avaliado por um profissional.',
      fonte: 'INCA — Sinais e sintomas',
    },
    {
      tipo: 'Mito',
      afirmacao: '“Só quem tem histórico familiar precisa se preocupar.”',
      resposta: 'Mito. Muitas pessoas com câncer de mama não têm casos na família.',
      explicacao:
        'O histórico familiar é relevante, mas não é o único fator. A idade também aumenta o risco, e a ausência de casos familiares não elimina a necessidade de cuidado.',
      fonte: 'INCA — Fatores de risco',
    },
    {
      tipo: 'Mito',
      afirmacao: '“A mamografia previne o câncer de mama.”',
      resposta: 'Mito. A mamografia é um exame de imagem, não uma vacina ou proteção.',
      explicacao:
        'O rastreamento procura alterações antes do aparecimento de sintomas, possibilitando detecção precoce, mas não impede que o câncer se desenvolva.',
      fonte: 'INCA — Detecção precoce',
    },
    {
      tipo: 'Mito',
      afirmacao: '“Quem não tem sintomas não precisa fazer rastreamento.”',
      resposta: 'Mito. O rastreamento é justamente para pessoas sem sintomas.',
      explicacao:
        'A recomendação do Ministério da Saúde prioriza a mamografia bienal para pessoas assintomáticas de 50 a 74 anos no SUS.',
      fonte: 'Ministério da Saúde — Nota Técnica nº 626/2025',
    },
    {
      tipo: 'Mito',
      afirmacao: '“O autoexame substitui a mamografia e a consulta.”',
      resposta: 'Mito. Conhecer o corpo ajuda, mas não substitui a avaliação profissional.',
      explicacao:
        'O autoconhecimento ajuda a perceber mudanças, mas lesões microscópicas em fases iniciais só são vistas na mamografia de rastreamento.',
      fonte: 'INCA — Detecção precoce',
    },
    {
      tipo: 'Mito',
      afirmacao: '“Hábitos saudáveis garantem que a pessoa nunca terá câncer.”',
      resposta: 'Mito. Eles podem reduzir o risco em até 30%, mas não eliminam a possibilidade.',
      explicacao:
        'Exercícios, alimentação saudável e evitar álcool ajudam muito, mas fatores genéticos e biológicos também influenciam o risco.',
      fonte: 'INCA — Como prevenir o câncer',
    },
    {
      tipo: 'Mito',
      afirmacao: '“Uma alteração na mama em pessoa jovem pode esperar.”',
      resposta: 'Mito. Qualquer alteração suspeita deve ser avaliada em qualquer idade.',
      explicacao:
        'A idade de rastreamento de rotina é para pessoas assintomáticas. Se há um sintoma ou nódulo, a avaliação médica deve ser imediata.',
      fonte: 'INCA — Sinais e sintomas',
    },
    {
      tipo: 'Mito',
      afirmacao: '“Câncer de mama é contagioso.”',
      resposta: 'Mito. A doença não passa de uma pessoa para outra.',
      explicacao:
        'O câncer não é transmitido por contato físico, convívio ou compartilhamento de objetos. Pessoas em tratamento precisam de carinho e apoio.',
      fonte: 'Informação geral de saúde pública',
    },
    {
      tipo: 'Verdade',
      afirmacao: '“Amamentar pode contribuir para reduzir o risco.”',
      resposta: 'Verdade, com um cuidado importante: não é uma garantia individual absoluta.',
      explicacao:
        'A amamentação faz parte das orientações de redução de risco do INCA. No entanto, não amamentar não é motivo de culpa.',
      fonte: 'INCA — Como prevenir o câncer',
    },
    {
      tipo: 'Verdade',
      afirmacao: '“Um sinal suspeito não confirma câncer, mas precisa ser avaliado.”',
      resposta: 'Verdade. Sinal é motivo de avaliação, não de autodiagnóstico.',
      explicacao:
        'Nódulos e alterações de pele podem ter outras causas clínicas benignas. Procure uma Unidade Básica de Saúde para esclarecimento tranquilo.',
      fonte: 'INCA — Sinais e sintomas',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          Mitos e verdades
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Informação confiável no lugar da desinformação
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          Algumas frases repetidas por aí podem atrasar a busca por atendimento ou gerar culpa
          desnecessária. Veja o que é mito, o que é verdade e por quê.
        </p>
      </header>

      {/* Lista de 10 Afirmações */}
      <div className="space-y-4">
        {lista.map((item, idx) => {
          const isMito = item.tipo === 'Mito';
          return (
            <article
              key={idx}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2 shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    isMito
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  }`}
                >
                  {item.tipo}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                  #{idx + 1}
                </span>
              </div>

              <h2 className="font-heading font-bold text-base sm:text-lg text-pink-950 dark:text-pink-100">
                {item.afirmacao}
              </h2>

              <p className="font-semibold text-xs sm:text-sm text-pink-800 dark:text-pink-300">
                {item.resposta}
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.explicacao}
              </p>

              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-1">
                Fonte: {item.fonte}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};
