import React from 'react';
import { ExternalLink, ShieldAlert, Heart, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#140d12] border-t border-pink-100 dark:border-pink-950/60 py-8 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Notice Callout */}
        <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-zinc-900 border border-pink-200/60 dark:border-zinc-800 flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-pink-950 dark:text-pink-200">
              Aviso de Responsabilidade Médica:
            </strong>{' '}
            Conteúdo educativo baseado em orientações públicas do INCA e do Ministério da Saúde. Não
            substitui consulta, exames, diagnóstico ou tratamento profissional. Diante de qualquer
            alteração, procure um serviço de saúde.
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Brand & Team Attribution */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/rosaviva-logo.png"
                alt="RosaViva Logo"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="font-heading font-extrabold text-lg text-pink-950 dark:text-pink-100">
                Rosa Viva
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Projeto educativo do Outubro Rosa para promover o autoconhecimento, a desmistificação e o
              acesso precoce ao SUS.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-800 dark:text-pink-300 pt-1">
              <Users className="w-4 h-4 text-pink-600" />
              <span>Realizado pelo Time Preto do Grupo Steve Jobs</span>
            </div>
          </div>

          {/* Links e Conteúdo */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-pink-950 dark:text-pink-200 uppercase tracking-wider block">
              Conteúdo Educativo
            </span>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>O que é o Câncer de Mama e Fatores de Risco</li>
              <li>Sinais de Alerta e Redução de Risco</li>
              <li>Rastreamento Mamográfico e Acesso ao SUS</li>
              <li>10 Mitos e Verdades Desmistificados</li>
              <li>Quiz de 10 Perguntas e Leaderboard</li>
            </ul>
          </div>

          {/* Fontes Oficiais */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-pink-950 dark:text-pink-200 uppercase tracking-wider block">
              Fontes Oficiais
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.gov.br/inca/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 text-zinc-600 dark:text-zinc-400 flex items-center gap-1"
                >
                  <span>Instituto Nacional de Câncer (INCA)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.br/saude/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 text-zinc-600 dark:text-zinc-400 flex items-center gap-1"
                >
                  <span>Ministério da Saúde (Nota Técnica 626/2025)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.vlibras.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 text-zinc-600 dark:text-zinc-400 flex items-center gap-1"
                >
                  <span>Acessibilidade Oficial VLibras</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-pink-100 dark:border-pink-950/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <div>
            © 2026 Rosa Viva · Realizado com dedicação pelo <strong>Time Preto do Grupo Steve Jobs</strong>
          </div>
          <div className="flex items-center gap-1 text-pink-700 dark:text-pink-400 font-medium">
            <span>Informação que acolhe e salva vidas</span>
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600 inline ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};
