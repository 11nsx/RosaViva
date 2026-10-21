import React from 'react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';

interface RastreamentoPageProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const RastreamentoPage: React.FC<RastreamentoPageProps> = ({ onNavigateTab }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          Rastreamento e acesso ao cuidado
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Dois caminhos diferentes: rastrear e investigar sintomas
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          Rastreamento e investigação de sintomas não são a mesma coisa. Entender essa diferença
          ajuda a buscar o atendimento adequado no momento certo.
        </p>
      </header>

      {/* Compare: Rastreamento vs Sintomas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Sem sintomas
          </span>
          <h2 className="text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
            Rastreamento Mamográfico
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            É a realização de mamografia em pessoas que não apresentam sinais ou sintomas, com o objetivo
            de identificar alterações antes de serem palpáveis.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            O rastreamento não previne que o câncer surja, mas permite encontrá-lo em fases iniciais,
            quando as chances de cura podem chegar a até 95%.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Com sinal ou queixa
          </span>
          <h2 className="text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
            Investigação Diagnóstica
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Quando se percebe um nódulo, saída espontânea de líquido ou alteração na pele, a avaliação
            é realizada a partir da queixa, em qualquer idade.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            A investigação pode incluir consulta, exame clínico, mamografia diagnóstica e ultrassonografia,
            sem precisar esperar a idade padrão de rastreamento.
          </p>
        </div>
      </section>

      {/* Recomendação Nacional SUS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-pink-50/60 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Recomendação nacional no SUS · 2025
          </p>
          <h2 className="text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
            O que o Ministério da Saúde prioriza hoje
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700">
            <div className="font-heading font-extrabold text-2xl text-pink-900 dark:text-pink-200">
              50 a 74 anos
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              faixa etária priorizada para o rastreamento mamográfico em assintomáticas
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700">
            <div className="font-heading font-extrabold text-2xl text-pink-900 dark:text-pink-200">
              A cada 2 anos
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              intervalo regular recomendado para essa faixa no SUS
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700">
            <div className="font-heading font-extrabold text-2xl text-pink-900 dark:text-pink-200">
              Sem sintomas
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              destinado a pessoas sem sinais clínicos aparentes
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          <h3 className="font-bold text-pink-950 dark:text-pink-100 text-base">
            Fora da faixa de 50 a 74 anos
          </h3>
          <p>
            A recomendação nacional prioriza essa faixa, mas isso <strong>não significa que o acesso
            seja proibido</strong> para outras idades. Pessoas fora dessa faixa podem conversar com o
            médico sobre riscos e benefícios para o seu caso individual.
          </p>
        </div>
      </section>

      {/* Acesso pelo SUS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
          Como procurar atendimento pelo SUS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-1">
            <div className="text-xs font-bold text-pink-600 dark:text-pink-400">PASSO 1</div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Procure a UBS</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Vá à Unidade Básica de Saúde mais próxima com documento e cartão do SUS.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-1">
            <div className="text-xs font-bold text-pink-600 dark:text-pink-400">PASSO 2</div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Explique o motivo</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Diga se é exame de rotina ou se percebeu alguma alteração recente na mama.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-1">
            <div className="text-xs font-bold text-pink-600 dark:text-pink-400">PASSO 3</div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Siga a orientação</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O encaminhamento para a mamografia é agendado de acordo com a rede do município.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-1">
            <div className="text-xs font-bold text-pink-600 dark:text-pink-400">PASSO 4</div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Acompanhe o laudo</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Retorne à UBS para mostrar o resultado e seguir os próximos passos de cuidado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
