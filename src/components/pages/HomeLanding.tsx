import React from 'react';
import {
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  Award,
} from 'lucide-react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';

interface HomeLandingProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({ onNavigateTab }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" aria-labelledby="hero-title">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/90 dark:bg-pink-950/70 text-pink-800 dark:text-pink-300 text-xs font-semibold">
            <span>Outubro Rosa · Informação que acolhe</span>
          </div>

          <h1 id="hero-title" className="text-3xl sm:text-5xl font-black font-heading text-pink-950 dark:text-pink-50 tracking-tight leading-tight">
            Conhecer o próprio corpo é um{' '}
            <span className="italic text-pink-700 dark:text-pink-400 font-serif font-normal">
              ato de cuidado
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
            Informação clara, baseada em fontes oficiais, sobre câncer de mama, sinais de alerta e
            rastreamento. Sem alarmismo, sem culpa e sem substituir o atendimento profissional.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigateTab('quiz');
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Fazer o quiz de 10 perguntas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigateTab('sinais');
              }}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-pink-50 dark:bg-zinc-800 hover:bg-pink-100 dark:hover:bg-zinc-700 text-pink-900 dark:text-pink-200 border border-pink-200 dark:border-zinc-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              Ver sinais de alerta
            </button>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            Cerca de 4 minutos · sem cadastro · nenhum dado pessoal solicitado
          </p>
        </div>

        {/* Aside Panel "Em Resumo" */}
        <aside className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-pink-100 dark:border-zinc-800 shadow-xl shadow-pink-900/5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Em resumo
          </div>

          <dl className="space-y-4 divide-y divide-pink-100 dark:divide-zinc-800 text-sm">
            <div className="pt-2">
              <dt className="font-heading font-extrabold text-xl text-pink-900 dark:text-pink-200">
                50 a 74 anos
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-0.5">
                faixa priorizada para o rastreamento mamográfico no SUS, em pessoas sem sintomas
              </dd>
            </div>

            <div className="pt-3">
              <dt className="font-heading font-extrabold text-xl text-pink-900 dark:text-pink-200">
                A cada 2 anos
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-0.5">
                intervalo recomendado para essa faixa etária
              </dd>
            </div>

            <div className="pt-3">
              <dt className="font-heading font-extrabold text-xl text-pink-900 dark:text-pink-200">
                Em qualquer idade
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-0.5">
                uma alteração suspeita deve ser avaliada em um serviço de saúde
              </dd>
            </div>
          </dl>

          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-2 border-t border-pink-100 dark:border-zinc-800">
            Referência: <a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-no-626-2025-cgcan-decan-saes-ms.pdf/@@download/file" target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400 hover:underline">Nota Técnica nº 626/2025 (Ministério da Saúde)</a>.
          </p>
        </aside>
      </section>

      {/* 2. Comece por Aqui (4 Cards) */}
      <section className="space-y-6" aria-labelledby="comece-titulo">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Comece por aqui
          </p>
          <h2 id="comece-titulo" className="text-2xl sm:text-3xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
            Quatro caminhos para entender melhor
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Escolha o assunto que mais interessa. Todos os conteúdos foram escritos com linguagem simples e cautelosa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateTab('informacoes');
            }}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-700 text-left transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 block mb-1">
                01 · ENTENDA
              </span>
              <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100 group-hover:text-pink-600 transition-colors">
                O que é o câncer de mama
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Como a doença se desenvolve e quais fatores podem aumentar o risco.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-4 flex items-center gap-1">
              Ler informações <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateTab('sinais');
            }}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-700 text-left transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 block mb-1">
                02 · RECONHEÇA
              </span>
              <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100 group-hover:text-pink-600 transition-colors">
                Sinais de alerta
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Alterações que merecem avaliação e atitudes que podem reduzir riscos.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-4 flex items-center gap-1">
              Ver sinais <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateTab('rastreamento');
            }}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-700 text-left transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 block mb-1">
                03 · ACESSE
              </span>
              <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100 group-hover:text-pink-600 transition-colors">
                Rastreamento e cuidado
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                A recomendação nacional para a mamografia e como chegar ao atendimento pelo SUS.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-4 flex items-center gap-1">
              Entender o rastreamento <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateTab('mitos');
            }}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-700 text-left transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 block mb-1">
                04 · ESCLAREÇA
              </span>
              <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100 group-hover:text-pink-600 transition-colors">
                Mitos e verdades
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Respostas curtas para dúvidas comuns sobre prevenção e detecção precoce.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 mt-4 flex items-center gap-1">
              Separar mito de verdade <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* 3. Para Levar (3 Ideias) */}
      <section className="space-y-6" aria-labelledby="tres-ideias-titulo">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Para levar
          </p>
          <h2 id="tres-ideias-titulo" className="text-2xl sm:text-3xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
            Três ideias que ajudam a cuidar melhor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-pink-50/60 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2">
            <h3 className="font-heading font-bold text-lg text-pink-900 dark:text-pink-200">
              Sinal não é diagnóstico
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Um nódulo, uma alteração na pele ou uma saída de líquido não confirmam câncer.
              Também não devem ser ignorados: precisam de avaliação profissional.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pink-50/60 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2">
            <h3 className="font-heading font-bold text-lg text-pink-900 dark:text-pink-200">
              Rastreamento não é prevenção
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A mamografia de rastreamento busca encontrar alterações cedo, em quem não tem sintomas.
              Ela não impede o câncer de surgir.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pink-50/60 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2">
            <h3 className="font-heading font-bold text-lg text-pink-900 dark:text-pink-200">
              Cuidado não é culpa
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hábitos saudáveis podem reduzir riscos, mas não garantem proteção absoluta.
              Ninguém é responsável por desenvolver a doença.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Aprender Brincando - Quiz CTA */}
      <section className="bg-gradient-to-r from-pink-700 via-pink-600 to-rose-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-pink-900/10" aria-labelledby="quiz-cta-titulo">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase font-bold tracking-wider text-pink-200">
            Aprender brincando
          </p>
          <h2 id="quiz-cta-titulo" className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
            Teste o que você sabe em 10 perguntas
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            Quiz educativo sobre sinais de alerta, fatores de risco, prevenção e rastreamento.
            Cada resposta vem com uma explicação e a fonte oficial. Ao final, confira sua pontuação,
            gere seu certificado e registre seu apelido no ranking!
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigateTab('quiz');
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-pink-900 hover:bg-pink-50 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Começar o quiz</span>
              <ArrowRight className="w-4 h-4 text-pink-600" />
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigateTab('ranking');
              }}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-pink-800/60 hover:bg-pink-800 text-white border border-pink-400/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Ver ranking de participantes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Sobre o Rosa Viva & Alerta */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-labelledby="projeto-titulo">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
            Sobre o Rosa Viva
          </p>
          <h2 id="projeto-titulo" className="text-2xl font-bold font-heading text-pink-950 dark:text-pink-100">
            Informação com responsabilidade
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            O Rosa Viva é um projeto educativo criado para a campanha do Outubro Rosa. Reúne orientações
            públicas do Instituto Nacional de Câncer (INCA) e do Ministério da Saúde em uma navegação
            simples, acessível com Libras, modos de daltonismo e síntese de voz, com espaço para testar
            o aprendizado.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigateTab('fontes');
              }}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Consultar todas as fontes oficiais</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Callout Alerta */}
        <aside className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2" aria-labelledby="aviso-home-titulo">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span id="aviso-home-titulo">Quando procurar atendimento</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Se você perceber uma alteração persistente na mama, no mamilo ou na axila, procure um
            serviço de saúde. Isso vale em qualquer idade, mesmo sem histórico familiar.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 italic pt-1">
            Em caso de dúvida, a Unidade Básica de Saúde (UBS) é a porta de entrada acolhedora do SUS.
          </p>
        </aside>
      </section>
    </div>
  );
};
