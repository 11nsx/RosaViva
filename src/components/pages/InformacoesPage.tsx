import React from 'react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';

interface InformacoesPageProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const InformacoesPage: React.FC<InformacoesPageProps> = ({ onNavigateTab }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          Informações gerais
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Entender o câncer de mama, sem alarmismo
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          O câncer de mama é uma doença cercada de dúvidas. Conhecer o básico ajuda a reconhecer sinais,
          entender os fatores de risco e buscar o cuidado certo — sem culpa e sem autodiagnóstico.
        </p>
      </header>

      {/* Grid: O que é & Resumo */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
            O que é o câncer de mama?
          </h2>
          <p>
            O câncer de mama é uma doença em que células da mama passam a se multiplicar de forma
            desordenada. A mama é formada por glândulas (lóbulos), canais (ductos), tecido adiposo e
            tecido conjuntivo. A doença pode começar em diferentes regiões da mama e se desenvolver de
            maneiras distintas.
          </p>
          <p>
            O câncer de mama <strong className="text-pink-950 dark:text-pink-100">não é contagioso</strong>.
            Também não é resultado de uma escolha ou de falta de cuidado. Embora seja mais comum em mulheres,
            pessoas do sexo masculino também podem desenvolver a doença, ainda que de forma menos frequente.
          </p>
          <p>
            O câncer de mama não tem uma causa única. Por isso, observar mudanças no próprio corpo e
            seguir a recomendação de rastreamento quando ela se aplica são atitudes importantes.
          </p>

          <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-200/70 dark:border-zinc-700 space-y-1">
            <strong className="text-pink-950 dark:text-pink-100 block">Sintoma não é diagnóstico</strong>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              A maior parte dos nódulos mamários é benigna. Ainda assim, qualquer alteração suspeita
              precisa ser avaliada por um profissional de saúde para investigação.
            </p>
          </div>

          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-1">
            Fonte: <a href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/sinais-e-sintomas" target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400 hover:underline">INCA — Sinais e sintomas</a>.
          </p>
        </div>

        <aside className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
              Em uma frase
            </p>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
              "Câncer de mama não é uma sentença, nem uma culpa. É uma condição de saúde que exige
              informação, avaliação profissional e acesso ao cuidado."
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2 shadow-xs">
            <h3 className="font-heading font-bold text-base text-pink-950 dark:text-pink-100">
              Continue por aqui
            </h3>
            <ul className="space-y-1.5 text-xs text-pink-700 dark:text-pink-400 font-semibold">
              <li>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigateTab('sinais');
                  }}
                  className="hover:underline text-left cursor-pointer"
                >
                  · Sinais de alerta e redução de risco
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigateTab('rastreamento');
                  }}
                  className="hover:underline text-left cursor-pointer"
                >
                  · Rastreamento e acesso pelo SUS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigateTab('mitos');
                  }}
                  className="hover:underline text-left cursor-pointer"
                >
                  · Mitos e verdades
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigateTab('quiz');
                  }}
                  className="hover:underline text-left cursor-pointer font-bold text-pink-800 dark:text-pink-300"
                >
                  · Fazer o quiz de 10 perguntas
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Fatores de Risco */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Fatores de risco
          </p>
          <h2 className="text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
            O que pode aumentar o risco?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Fatores de risco não são causas certas nem sentenças. Eles indicam maior probabilidade
            estatística e ajudam a orientar conversas sobre prevenção e rastreamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-4">
            <span className="text-xs font-bold uppercase text-pink-600 dark:text-pink-400">
              Não dependem apenas de escolhas
            </span>

            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Idade e envelhecimento</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                O risco de câncer de mama aumenta com a idade. Por isso, a recomendação de rastreamento é
                direcionada a faixas etárias específicas.
              </p>
            </div>
            <hr className="border-pink-100 dark:border-zinc-800" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Histórico familiar e genética</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ter casos na família, em especial em parentes de primeiro grau, pode aumentar o risco. A
                ausência de histórico familiar, porém, não significa risco zero.
              </p>
            </div>
            <hr className="border-pink-100 dark:border-zinc-800" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Fatores hormonais e reprodutivos</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Menarca precoce, menopausa tardia, primeira gestação após os 30 anos e uso prolongado de
                determinadas terapias hormonais podem influenciar o risco.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-4">
            <span className="text-xs font-bold uppercase text-pink-600 dark:text-pink-400">
              Relacionados a hábitos
            </span>

            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Consumo de bebida alcoólica</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Reduzir ou evitar o consumo de álcool é uma das orientações de prevenção primária. Quanto
                menor o consumo, menor a exposição a esse fator de risco.
              </p>
            </div>
            <hr className="border-pink-100 dark:border-zinc-800" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Excesso de peso corporal</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Manter um peso saudável, com acompanhamento quando necessário, contribui para a saúde geral
                e para a redução de riscos de câncer de mama na pós-menopausa.
              </p>
            </div>
            <hr className="border-pink-100 dark:border-zinc-800" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Sedentarismo e Tabagismo</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A atividade física regular faz parte das recomendações fundamentais de prevenção. Não fumar
                traz benefícios globais para a saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Risco Não é Culpa */}
      <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
        <strong className="text-emerald-950 dark:text-emerald-200 font-bold block text-sm sm:text-base">
          ✓ Risco não é culpa
        </strong>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Nenhuma pessoa causa câncer por ter ou não ter um hábito. Fatores de risco são probabilidades,
          não sentenças. Não ter um fator de risco conhecido também não significa risco zero. O foco deve ser
          informação, cuidado e acesso regular a serviços de saúde.
        </p>
      </div>
    </div>
  );
};
