import React, { useState } from 'react';
import {
  Timer,
  CheckCircle,
  XCircle,
  ArrowRight,
  Award,
  Sparkles,
  Volume2,
  VolumeX,
  Lightbulb,
} from 'lucide-react';
import { Question, OptionId } from '../types/quiz';
import { soundEffects } from '../services/soundEffects';
import { speechService } from '../services/speechService';

interface QuizQuestionCardProps {
  question: Question;
  questionIndex: number; // 0-based
  totalQuestions: number; // 10
  currentScore: number;
  correctCount: number;
  elapsedSeconds: number;
  onAnswerConfirmed: (questionId: number, selected: OptionId, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  currentScore,
  correctCount,
  elapsedSeconds,
  onAnswerConfirmed,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Format MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionId: OptionId) => {
    if (isConfirmed) return; // Locked after confirmation
    soundEffects.playClick();
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!selectedOption || isConfirmed) return;

    const isCorrect = selectedOption === question.correctAnswer;
    setIsConfirmed(true);

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playIncorrect();
    }

    onAnswerConfirmed(question.id, selectedOption, isCorrect);
  };

  const handleNext = () => {
    soundEffects.playClick();
    speechService.stop();
    setIsReading(false);
    setSelectedOption(null);
    setIsConfirmed(false);
    onNextQuestion();
  };

  const handleReadQuestion = () => {
    soundEffects.playClick();
    if (speechService.isSpeaking()) {
      speechService.stop();
      setIsReading(false);
      return;
    }

    const optionsText = question.options
      .map((opt) => `Alternativa ${opt.id}: ${opt.text}`)
      .join('. ');

    const fullText = `Pergunta ${questionIndex + 1} de ${totalQuestions}. Categoria: ${
      question.category
    }. ${question.question}. ${optionsText}`;

    setIsReading(true);
    speechService.speak(fullText, () => {
      setIsReading(false);
    });
  };

  const isSelected = (id: OptionId) => selectedOption === id;
  const isRightChoice = selectedOption === question.correctAnswer;
  const progressPercentage = Math.round(
    ((questionIndex + (isConfirmed ? 1 : 0)) / totalQuestions) * 100
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      {/* Top Mobile-Optimized Status Bar */}
      <div className="bg-white/95 dark:bg-zinc-900/95 rounded-2xl p-3.5 sm:p-4 shadow-sm border border-pink-100 dark:border-zinc-800 mb-4 transition-colors">
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          {/* Question Counter & Category */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-heading font-extrabold text-pink-950 dark:text-pink-100 text-sm sm:text-base">
              Pergunta {questionIndex + 1} de {totalQuestions}
            </span>
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-pink-100/80 dark:bg-zinc-800 text-pink-800 dark:text-pink-300 font-medium">
              {question.category}
            </span>
          </div>

          {/* Stats: Timer & Score */}
          <div className="flex items-center gap-2">
            {/* Timer */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-50 dark:bg-zinc-800 border border-pink-200/60 dark:border-zinc-700 text-pink-900 dark:text-pink-200"
              title="Tempo decorrido (MM:SS)"
              aria-label={`Tempo decorrido: ${formatTime(elapsedSeconds)}`}
            >
              <Timer className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0" />
              <span className="font-mono tabular-nums font-bold text-xs sm:text-sm">
                {formatTime(elapsedSeconds)}
              </span>
            </div>

            {/* Score */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-zinc-800 border border-amber-200/60 dark:border-zinc-700 text-amber-900 dark:text-amber-300"
              title="Pontuação atual"
              aria-label={`Pontuação: ${currentScore} pontos`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-mono tabular-nums font-bold text-xs sm:text-sm">
                {currentScore} pts
              </span>
            </div>
          </div>
        </div>

        {/* Compact Progress Bar */}
        <div className="mt-2.5">
          <div className="w-full bg-pink-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
            <span>Progresso</span>
            <span>{progressPercentage}%</span>
            <span>{correctCount} acertos</span>
          </div>
        </div>
      </div>

      {/* Main Question Card - Mobile-First Touch Design */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-7 shadow-lg shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 transition-colors">
        {/* Enunciation & Voice Button */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <h2 className="text-base sm:text-xl font-bold font-heading text-pink-950 dark:text-pink-50 leading-snug">
            {question.question}
          </h2>

          <button
            onClick={handleReadQuestion}
            className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
              isReading
                ? 'bg-pink-600 text-white border-pink-600 animate-pulse'
                : 'bg-pink-50 dark:bg-zinc-800 hover:bg-pink-100 dark:hover:bg-zinc-700 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-zinc-700'
            }`}
            title={isReading ? 'Pausar leitura de voz' : 'Ouvir pergunta em voz alta'}
            aria-label="Ouvir pergunta"
          >
            {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 4 Alternatives (A, B, C, D) - Touch targets >= 48px */}
        <div className="space-y-2.5 mb-5" role="radiogroup" aria-label="Alternativas">
          {question.options.map((option) => {
            const isOptSelected = isSelected(option.id);
            const isOptCorrect = option.id === question.correctAnswer;

            let cardStyles =
              'bg-white dark:bg-zinc-850 hover:bg-pink-50/50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200';
            let badgeStyles =
              'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';

            if (!isConfirmed) {
              if (isOptSelected) {
                cardStyles =
                  'bg-pink-50 dark:bg-pink-950/40 border-pink-500 dark:border-pink-500 shadow-xs ring-2 ring-pink-500/30 text-pink-950 dark:text-pink-100';
                badgeStyles = 'bg-pink-600 text-white border-pink-600';
              }
            } else {
              if (isOptCorrect) {
                cardStyles =
                  'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-950 dark:text-emerald-100 font-medium';
                badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isOptSelected && !isOptCorrect) {
                cardStyles =
                  'bg-rose-50 dark:bg-rose-950/40 border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/30 text-rose-950 dark:text-rose-100 opacity-80';
                badgeStyles = 'bg-rose-600 text-white border-rose-600';
              } else {
                cardStyles =
                  'bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={isConfirmed}
                role="radio"
                aria-checked={isOptSelected}
                className={`w-full min-h-[52px] p-3 sm:p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${cardStyles} ${
                  isConfirmed ? 'cursor-default' : ''
                }`}
              >
                {/* Identifier Letter (A, B, C, D) */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 border ${badgeStyles} transition-colors mt-0.5`}
                >
                  {option.id}
                </div>

                <div className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5">
                  {option.text}
                </div>

                {/* State indicator after confirmation */}
                {isConfirmed && isOptCorrect && (
                  <div className="shrink-0 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold text-[10px] sm:text-xs uppercase pt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
                {isConfirmed && isOptSelected && !isOptCorrect && (
                  <div className="shrink-0 text-rose-600 dark:text-rose-400 flex items-center gap-1 font-bold text-[10px] sm:text-xs uppercase pt-1">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Educational Feedback Box */}
        {isConfirmed && (
          <div
            className={`p-4 rounded-2xl border mb-5 animate-fade-in ${
              isRightChoice
                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}
            role="region"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 font-heading font-bold text-sm mb-1.5">
              {isRightChoice ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Muito bem! Resposta Correta (+10 pts)</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Atenção: Resposta Correta é a Letra {question.correctAnswer}</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {question.explanation}
            </p>

            {question.healthTip && (
              <div className="flex items-start gap-1.5 pt-2 mt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs font-medium text-emerald-900 dark:text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  <strong>Orientação de Saúde:</strong> {question.healthTip}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Controls - Full width on mobile for thumb accessibility */}
        <div className="pt-1">
          {!isConfirmed ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedOption}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedOption
                  ? 'bg-pink-700 hover:bg-pink-600 text-white shadow-md shadow-pink-700/25 active:scale-98'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200/60 dark:border-zinc-700'
              }`}
            >
              <span>Confirmar Resposta</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isLastQuestion ? 'Ver Resultado Final' : 'Próxima Pergunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
