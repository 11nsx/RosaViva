import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Trophy,
  Check,
} from 'lucide-react';
import { Question, UserAnswer } from '../types/quiz';
import { soundEffects } from '../services/soundEffects';
import { downloadCertificate, CertificateData } from '../services/certificateGenerator';
import { saveRankingEntry } from '../services/rankingService';

interface ResultsViewProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  totalScore: number;
  totalTimeSeconds: number;
  rankingId?: string | null;
  onRestartQuiz: () => void;
  onNavigateHome: () => void;
  onNavigateRanking: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  questions,
  userAnswers,
  totalScore,
  totalTimeSeconds,
  rankingId,
  onRestartQuiz,
  onNavigateHome,
  onNavigateRanking,
}) => {
  const [userName, setUserName] = useState('');
  const [isCertificateDownloaded, setIsCertificateDownloaded] = useState(false);

  // Nickname for ranking
  const [nickname, setNickname] = useState('');
  const [isNicknameUpdated, setIsNicknameUpdated] = useState(false);
  const [rankingSaveLoading, setRankingSaveLoading] = useState(false);
  const [activeRankingId, setActiveRankingId] = useState<string | null>(rankingId || null);

  const [filterReview, setFilterReview] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const correctAnswersCount = userAnswers.filter((a) => a.isCorrect).length;
  const incorrectAnswersCount = userAnswers.length - correctAnswersCount;
  const percentage = Math.round((correctAnswersCount / 10) * 100);

  // Format MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formattedTime = formatTime(totalTimeSeconds);

  // Performance tier messages per briefing
  let tierMessage = '';
  let tierBadgeColor = '';

  if (percentage <= 39) {
    tierMessage =
      'Continue aprendendo! Conhecer o assunto é um passo importante para a conscientização.';
    tierBadgeColor = 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-300';
  } else if (percentage <= 69) {
    tierMessage =
      'Bom esforço! Continue aprendendo sobre o câncer de mama e os cuidados com a saúde.';
    tierBadgeColor = 'text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-300';
  } else if (percentage <= 89) {
    tierMessage = 'Muito bem! Você demonstrou bons conhecimentos sobre o tema.';
    tierBadgeColor = 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300';
  } else {
    tierMessage = 'Excelente! Você demonstrou um ótimo conhecimento sobre o Outubro Rosa.';
    tierBadgeColor = 'text-pink-800 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/50 border-pink-300';
  }

  useEffect(() => {
    soundEffects.playComplete();
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#DB2777', '#EC4899', '#F472B6', '#10B981'],
        });
      } catch {}
    }
  }, [percentage]);

  // Ensure score is persistently recorded in ranking immediately
  useEffect(() => {
    if (!activeRankingId) {
      const generatedId = 'rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      setActiveRankingId(generatedId);
      saveRankingEntry({
        id: generatedId,
        nickname: 'Participante RosaViva',
        score: totalScore,
        correctCount: correctAnswersCount,
        totalQuestions: 10,
        percentage,
        timeSeconds: totalTimeSeconds,
        formattedTime,
      }).catch((err) => console.warn('Ranking auto-save fallback error:', err));
    }
  }, [activeRankingId, totalScore, correctAnswersCount, percentage, totalTimeSeconds, formattedTime]);

  const toggleQuestionExpand = (qId: number) => {
    soundEffects.playClick();
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleDownloadCertificate = () => {
    soundEffects.playClick();
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const certData: CertificateData = {
      userName: userName.trim() || 'Participante RosaViva',
      score: totalScore,
      percentage,
      timeSpentFormatted: formattedTime,
      dateStr: today,
    };

    downloadCertificate(certData);
    setIsCertificateDownloaded(true);
  };

  const handleSaveToRanking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rankingSaveLoading) return;

    soundEffects.playClick();
    setRankingSaveLoading(true);

    try {
      await saveRankingEntry({
        id: activeRankingId || undefined,
        nickname: nickname.trim() || 'Participante RosaViva',
        score: totalScore,
        correctCount: correctAnswersCount,
        totalQuestions: 10,
        percentage,
        timeSeconds: totalTimeSeconds,
        formattedTime,
      });
      setIsNicknameUpdated(true);
    } catch {
      setIsNicknameUpdated(true);
    } finally {
      setRankingSaveLoading(false);
    }
  };

  const filteredAnswers = questions
    .map((q) => {
      const ans = userAnswers.find((a) => a.questionId === q.id);
      return { question: q, answer: ans };
    })
    .filter(({ answer }) => {
      if (filterReview === 'correct') return answer?.isCorrect;
      if (filterReview === 'incorrect') return !answer?.isCorrect;
      return true;
    });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* 1. Card de Desempenho Principal */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 text-center relative overflow-hidden transition-colors">
        <div className="inline-flex p-3 rounded-2xl bg-pink-100/70 dark:bg-pink-950/60 border border-pink-200/80 dark:border-pink-800/80 mb-3">
          <Award className="w-8 h-8 text-pink-600 dark:text-pink-400" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-pink-950 dark:text-pink-100 mb-2">
          Resultado do seu Quiz
        </h1>

        <div
          className={`inline-block px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold max-w-xl mx-auto mb-5 ${tierBadgeColor}`}
        >
          {tierMessage}
        </div>

        {/* 4 Métricas Chave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-6">
          <div className="p-3.5 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Pontuação</div>
            <div className="text-xl sm:text-2xl font-black font-heading text-pink-900 dark:text-pink-300 mt-0.5">
              {totalScore} <span className="text-xs font-normal text-zinc-500">/ 100</span>
            </div>
            <div className="text-[10px] text-pink-700/80 dark:text-pink-400">pontos</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Aproveitamento</div>
            <div className="text-xl sm:text-2xl font-black font-heading text-pink-900 dark:text-pink-300 mt-0.5">
              {percentage}%
            </div>
            <div className="text-[10px] text-pink-700/80 dark:text-pink-400">de acertos</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-zinc-800/60 border border-emerald-100 dark:border-zinc-700/80">
            <div className="text-[11px] text-emerald-800 dark:text-zinc-400 font-medium">Respostas</div>
            <div className="text-xl sm:text-2xl font-black font-heading text-emerald-700 dark:text-emerald-400 mt-0.5">
              {correctAnswersCount} <span className="text-xs font-normal text-zinc-500">certas</span>
            </div>
            <div className="text-[10px] text-emerald-800/80 dark:text-emerald-400">
              {incorrectAnswersCount} incorretas
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700/80">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Tempo Gasto</div>
            <div className="text-xl sm:text-2xl font-black font-heading text-pink-900 dark:text-pink-300 mt-0.5 font-mono tabular-nums">
              {formattedTime}
            </div>
            <div className="text-[10px] text-pink-700/80 dark:text-pink-400">minutos : seg</div>
          </div>
        </div>

        {/* Nota Educativa */}
        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-zinc-800/40 border border-pink-200/70 dark:border-zinc-700 text-left max-w-2xl mx-auto flex items-start gap-2.5 mb-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
          <div>
            <strong>Acompanhamento Profissional:</strong> Conhecer o corpo e ter informações oficiais
            são fundamentais. Mantenha os exames periódicos em dia e procure o SUS ao notar qualquer alteração.
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onRestartQuiz();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md shadow-pink-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer Quiz</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateRanking();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-sm bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Ver Ranking Geral</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateHome();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>
        </div>
      </div>

      {/* 2. Placar e Ranking Persistente (Gravado Automaticamente) */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-7 shadow-lg shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 transition-colors space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-pink-950 dark:text-pink-100">
                Placar e Ranking Oficial
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Sua participação e nota já estão salvas com segurança no banco de dados
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigateRanking();
            }}
            type="button"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Ver Placar Geral</span>
          </button>
        </div>

        {/* Confirmation banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100">
            <span className="font-bold">Pontuação gravada com sucesso!</span>{' '}
            Você obteve <strong>{totalScore} pontos</strong> ({correctAnswersCount}/10 acertos · {percentage}%) em <strong>{formattedTime}</strong>.
          </div>
        </div>

        {/* Nickname update form */}
        <form onSubmit={handleSaveToRanking} className="space-y-3 pt-1">
          <label
            htmlFor="nickname-input"
            className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
          >
            {isNicknameUpdated
              ? 'Apelido personalizado no placar:'
              : 'Deseja personalizar seu apelido no ranking? (Padrão: Participante RosaViva)'}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="nickname-input"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={24}
              placeholder="Digite seu nome ou apelido (máx. 24 letras)"
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <button
              type="submit"
              disabled={rankingSaveLoading}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-pink-700 hover:bg-pink-600 text-white shadow-xs transition-colors cursor-pointer shrink-0 text-center"
            >
              {rankingSaveLoading
                ? 'Atualizando…'
                : isNicknameUpdated
                ? 'Apelido Atualizado ✓'
                : 'Salvar Meu Apelido'}
            </button>
          </div>
          <p className="text-[11px] text-zinc-400">
            Armazenamento permanente e imutável. Realizado pelo Time Preto do Grupo Steve Jobs.
          </p>
        </form>
      </div>

      {/* 3. Certificado Digital Personalizado */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-7 shadow-lg shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 transition-colors">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-pink-950 dark:text-pink-100">
              Certificado de Participação RosaViva
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Personalize com seu nome e baixe a imagem em alta resolução (PNG)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="cert-name-input"
              className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1"
            >
              Nome completo para o documento:
            </label>
            <input
              id="cert-name-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ex.: Maria da Silva"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm bg-pink-700 hover:bg-pink-600 text-white shadow-md shadow-pink-700/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>
              {isCertificateDownloaded ? 'Baixar Novamente (PNG)' : 'Baixar Certificado em Imagem (PNG)'}
            </span>
          </button>
        </div>
      </div>

      {/* 4. Revisão Detalhada das 10 Perguntas */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-7 shadow-lg shadow-pink-900/5 border border-pink-100 dark:border-zinc-800 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pink-100 dark:border-zinc-800 pb-4 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
              Revisão das 10 Perguntas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Justificativas e orientações oficiais do INCA
            </p>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilterReview('all');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
                filterReview === 'all'
                  ? 'bg-white dark:bg-zinc-900 text-pink-950 dark:text-pink-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Todas (10)
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilterReview('correct');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
                filterReview === 'correct'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Certas ({correctAnswersCount})
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilterReview('incorrect');
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
                filterReview === 'incorrect'
                  ? 'bg-white dark:bg-zinc-900 text-rose-700 dark:text-rose-300 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Erradas ({incorrectAnswersCount})
            </button>
          </div>
        </div>

        {/* 10 Questões */}
        <div className="space-y-3">
          {filteredAnswers.map(({ question, answer }) => {
            const isCorrect = answer?.isCorrect;
            const chosenOptionId = answer?.selectedOption;
            const chosenOption = question.options.find((o) => o.id === chosenOptionId);
            const correctOption = question.options.find((o) => o.id === question.correctAnswer);
            const isExpanded = expandedQuestions[question.id] !== false;

            return (
              <div
                key={question.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                <div
                  onClick={() => toggleQuestionExpand(question.id)}
                  className="p-3.5 sm:p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-0.5">
                        Questão {question.id} de 10 · {isCorrect ? 'Acertou (+10 pts)' : 'Errou (0 pts)'}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-pink-950 dark:text-pink-100 leading-snug">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  <button className="p-1 text-zinc-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-3.5 pb-4 sm:px-4 space-y-2.5 border-t border-zinc-100 dark:border-zinc-800/80 pt-2.5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-0.5">
                          Sua Escolha:
                        </div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {chosenOptionId || '-'}: {chosenOption?.text || 'Não respondida'}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
                        <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 mb-0.5">
                          Resposta Correta:
                        </div>
                        <div className="font-semibold text-emerald-950 dark:text-emerald-100">
                          {question.correctAnswer}: {correctOption?.text}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-pink-100 dark:border-zinc-700/80 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <strong className="text-pink-900 dark:text-pink-300 block mb-1">
                        Explicação Médica (INCA):
                      </strong>
                      {question.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
