import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';

interface FontesPageProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const FontesPage: React.FC<FontesPageProps> = ({ onNavigateTab }) => {
  const fontes = [
    {
      orgao: 'INCA',
      titulo: 'Sinais e sintomas do câncer de mama',
      desc: 'Descrição dos sinais que merecem investigação, incluindo nódulos, alterações de pele e saída de líquido pelo mamilo.',
      url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/sinais-e-sintomas',
    },
    {
      orgao: 'INCA',
      titulo: 'Fatores de risco',
      desc: 'Informações sobre idade, histórico familiar, predisposição genética, fatores hormonais e hábitos relacionados ao risco de câncer de mama.',
      url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/fatores-de-risco',
    },
    {
      orgao: 'INCA',
      titulo: 'Detecção precoce',
      desc: 'Orientações sobre rastreamento, diagnóstico precoce e a diferença entre buscar alterações em pessoas sem sintomas e investigar uma queixa.',
      url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/acoes/deteccao-precoce',
    },
    {
      orgao: 'Ministério da Saúde',
      titulo: 'Nota Técnica nº 626/2025',
      desc: 'Documento que atualiza as recomendações nacionais de rastreamento do câncer de mama, com prioridade para pessoas assintomáticas de 50 a 74 anos, a cada dois anos, no SUS.',
      url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-no-626-2025-cgcan-decan-saes-ms.pdf/@@download/file',
    },
    {
      orgao: 'INCA',
      titulo: 'Onde tratar pelo SUS',
      desc: 'Orientação sobre o acesso ao tratamento oncológico pelo Sistema Único de Saúde e os caminhos de acolhimento e atendimento.',
      url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tratamento/onde-tratar-pelo-sus',
    },
    {
      orgao: 'INCA',
      titulo: 'Como prevenir o câncer',
      desc: 'Recomendações de hábitos que podem contribuir para reduzir o risco de câncer, como alimentação, atividade física, controle de peso e redução do álcool.',
      url: 'https://www.gov.br/inca/pt-br/assuntos/causas-e-prevencao-do-cancer/como-prevenir-o-cancer/como-prevenir-o-cancer',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          Transparência e Ciência
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Fontes oficiais usadas neste site
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          O conteúdo do Rosa Viva foi redigido a partir de publicações do Instituto Nacional de
          Câncer (INCA) e do Ministério da Saúde. Os links abaixo levam diretamente aos documentos originais.
        </p>
      </header>

      {/* Grid de Fontes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fontes.map((f, idx) => (
          <article
            key={idx}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2.5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-pink-700 dark:text-pink-400 uppercase tracking-wide">
                {f.orgao}
              </span>
              <h2 className="font-heading font-bold text-base sm:text-lg text-pink-950 dark:text-pink-100 mt-1">
                {f.titulo}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {f.desc}
              </p>
            </div>

            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 dark:text-pink-400 hover:underline pt-2"
            >
              <span>Acessar no portal gov.br</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </article>
        ))}
      </div>

      {/* Metodologia de Escrita */}
      <div className="p-6 rounded-3xl bg-pink-50/70 dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-pink-950 dark:text-pink-100">
          <BookOpen className="w-4 h-4 text-pink-600" />
          <span>Como o conteúdo foi escrito</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          As informações foram resumidas e adaptadas para linguagem acessível. Não foram incluídas
          estatísticas sem fonte, promessas de prevenção absoluta ou orientações de autodiagnóstico.
          Quando um tema depende do caso individual, o site orienta a conversar com um profissional de saúde.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
          Projeto realizado com dedicação pelo <strong>Time Preto do Grupo Steve Jobs</strong>.
        </p>
      </div>

      {/* CTA Quiz */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-base text-pink-950 dark:text-pink-100">
            Pronto para testar seu conhecimento?
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Faça o quiz com 10 perguntas baseadas nestas fontes oficiais.
          </p>
        </div>
        <button
          onClick={() => {
            soundEffects.playClick();
            onNavigateTab('quiz');
          }}
          className="px-5 py-3 rounded-xl font-bold text-xs bg-pink-700 hover:bg-pink-600 text-white shrink-0 cursor-pointer"
        >
          Iniciar Quiz
        </button>
      </div>
    </div>
  );
};
