import React from 'react';
import {
  ArrowRight,
  HelpCircle,
  Timer,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import { speechService } from '../services/speechService';

interface HomeViewProps {
  onStartQuiz: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartQuiz }) => {
  const introSpeechText =
    'Bem-vinda ao Quiz Outubro Rosa RosaViva. Teste seus conhecimentos sobre o câncer de mama e a saúde da mulher. O quiz contém exatamente 10 perguntas, com 4 alternativas cada e uma única resposta correta. O cronômetro acompanha seu progresso. Toque em Começar Quiz para iniciar.';

  const handleReadIntro = () => {
    soundEffects.playClick();
    if (speechService.isSpeaking()) {
      speechService.stop();
    } else {
      speechService.speak(introSpeechText);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Central Quiz Card - Clean, Mobile-First */}
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-lg shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 text-center relative overflow-hidden transition-colors">
        {/* Official Logo */}
        <div className="inline-flex p-2 rounded-2xl bg-pink-50 dark:bg-zinc-800 border border-pink-200/80 dark:border-zinc-700 mb-4 shadow-xs">
          <img
            src="/rosaviva-logo.png"
            alt="RosaViva Logo Oficial"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
          />
        </div>

        {/* Title & Subtitle mandated by briefing */}
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-50 tracking-tight leading-tight mb-2">
          Quiz Outubro Rosa
        </h1>

        <p className="text-base sm:text-lg font-medium text-pink-700 dark:text-pink-300 max-w-md mx-auto mb-4">
          Teste seus conhecimentos sobre o câncer de mama e a saúde da mulher
        </p>

        {/* Brief Explanation */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
          A conscientização e a informação de qualidade salvam vidas. Conhecer os sinais de alerta,
          o autoconhecimento do corpo e os exames preventivos pelo SUS aumentam em até 95% as chances
          de cura com o diagnóstico precoce.
        </p>

        {/* Audio helper button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleReadIntro}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-zinc-800 hover:bg-pink-100 dark:hover:bg-zinc-700 rounded-full border border-pink-200 dark:border-zinc-700 transition-colors cursor-pointer"
            aria-label="Ouvir introdução em voz alta"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Ouvir Apresentação</span>
          </button>
        </div>

        {/* 3 Core Rules mandated by briefing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
          <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80 flex items-center sm:flex-col sm:items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0" />
            <div>
              <div className="font-bold text-xs text-pink-950 dark:text-pink-100">
                10 Perguntas
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Exatamente 10 questões oficiais INCA/SUS.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80 flex items-center sm:flex-col sm:items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0" />
            <div>
              <div className="font-bold text-xs text-pink-950 dark:text-pink-100">
                4 Alternativas (A, B, C, D)
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Apenas 1 resposta correta por pergunta.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80 flex items-center sm:flex-col sm:items-start gap-2.5">
            <Timer className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0" />
            <div>
              <div className="font-bold text-xs text-pink-950 dark:text-pink-100">
                Cronômetro MM:SS
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Inicia ao começar, sem penalidades por tempo.
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA - Big, thumb-friendly on mobile */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onStartQuiz();
          }}
          className="w-full py-4 px-6 text-base font-bold text-white bg-gradient-to-r from-pink-600 via-pink-700 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-98 rounded-2xl shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
        >
          <span>Começar Quiz</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
