import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';

interface SinaisPrevencaoPageProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const SinaisPrevencaoPage: React.FC<SinaisPrevencaoPageProps> = ({ onNavigateTab }) => {
  const sinais = [
    {
      titulo: 'Nódulo na mama',
      desc: 'Especialmente se for endurecido, fixo ou estiver em crescimento. Um nódulo pode ser benigno, mas é preciso investigar.',
    },
    {
      titulo: 'Saída de líquido pelo mamilo',
      desc: 'Principalmente quando é espontânea, sanguinolenta e ocorre em apenas uma mama. Também merece avaliação quando persiste.',
    },
    {
      titulo: 'Mudança no mamilo',
      desc: 'Retração, inversão recente ou outras mudanças persistentes do bico do peito devem ser prontamente examinadas.',
    },
    {
      titulo: 'Alteração persistente da pele',
      desc: 'Inclui aspecto semelhante à casca de laranja, retração, vermelhidão ou endurecimento cutâneo que não melhora.',
    },
    {
      titulo: 'Aumento progressivo da mama',
      desc: 'Mudanças assimétricas de tamanho ou de forma que surgem e progridem sem explicação merecem avaliação clínica.',
    },
    {
      titulo: 'Nódulos na axila',
      desc: 'Caroços ou aumentos persistentes na região da axila ou pescoço também fazem parte da avaliação das mamas.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          Sinais de alerta e prevenção
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Notar uma mudança é motivo para procurar cuidado
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          A maioria das alterações na mama não é câncer, mas todas merecem atenção. Conhecer os sinais
          possíveis e não adiar a avaliação profissional é mais importante do que tentar chegar a uma
          conclusão sozinha.
        </p>
      </header>

      {/* 6 Sinais Grid */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
          Alterações que merecem avaliação médica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {sinais.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-1.5 shadow-xs"
            >
              <h3 className="font-heading font-bold text-base text-pink-900 dark:text-pink-200">
                {s.titulo}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong className="text-amber-950 dark:text-amber-200">Sinal não é diagnóstico:</strong>{' '}
            Essas alterações podem ter outras causas benignas. Mesmo assim, não devem ser ignoradas nem
            tratadas com receitas caseiras. A avaliação profissional é o caminho seguro.
          </div>
        </div>
      </section>

      {/* O que fazer ao notar alteração */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          <h2 className="text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
            O que fazer ao notar uma alteração?
          </h2>
          <p>
            Não é preciso esperar a idade recomendada para o rastreamento nem o próximo exame de rotina.
            Uma queixa atual deve ser avaliada quando aparece.
          </p>
          <ol className="space-y-3 list-decimal list-inside pl-1">
            <li className="leading-relaxed">
              <strong className="text-pink-950 dark:text-pink-100">Procure um serviço de saúde.</strong> A
              Unidade Básica de Saúde (UBS) é a porta de entrada do SUS.
            </li>
            <li className="leading-relaxed">
              <strong className="text-pink-950 dark:text-pink-100">Conte quando notou a mudança.</strong> Relate
              há quanto tempo percebeu e se houve aumento de tamanho.
            </li>
            <li className="leading-relaxed">
              <strong className="text-pink-950 dark:text-pink-100">Não faça autodiagnóstico.</strong> Evite
              começar tratamentos por conta própria ou adiar a consulta por medo.
            </li>
          </ol>
        </div>

        <aside className="lg:col-span-5 p-5 rounded-3xl bg-pink-50/60 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2">
          <h3 className="font-heading font-bold text-base text-pink-950 dark:text-pink-100">
            Autoexame não substitui avaliação
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Observar as mamas e conhecer o que é habitual para você ajuda a perceber mudanças. No
            entanto, o toque isolado não substitui o exame clínico nem a mamografia quando indicada.
          </p>
        </aside>
      </section>

      {/* CTA Quiz */}
      <div className="p-6 rounded-3xl bg-pink-100/70 dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100">
            Teste seus conhecimentos sobre sinais de alerta
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Responda às 10 perguntas e veja a explicação educativa de cada uma.
          </p>
        </div>
        <button
          onClick={() => {
            soundEffects.playClick();
            onNavigateTab('quiz');
          }}
          className="px-5 py-3 rounded-xl font-bold text-xs bg-pink-700 hover:bg-pink-600 text-white shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>Fazer o Quiz</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
