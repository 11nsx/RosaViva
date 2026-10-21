import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Trash2,
  RotateCcw,
  Clock,
  Sparkles,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { PageTab } from '../../types/navigation';
import { soundEffects } from '../../services/soundEffects';
import { fetchRanking, clearRanking, RankingItem } from '../../services/rankingService';

interface RankingPageProps {
  onNavigateTab: (tab: PageTab) => void;
}

export const RankingPage: React.FC<RankingPageProps> = ({ onNavigateTab }) => {
  const [rankingList, setRankingList] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  const loadRanking = async () => {
    setLoading(true);
    try {
      const data = await fetchRanking();
      setRankingList(data);
    } catch {
      // Handled in service
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  const handleClearRanking = async () => {
    soundEffects.playClick();
    await clearRanking();
    setRankingList([]);
    setShowConfirmClear(false);
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recente';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Placar de Conscientização · RosaViva</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-pink-950 dark:text-pink-100">
          Ranking dos Participantes
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
          Resultados do quiz salvos com suporte a API no backend (Vercel) e sincronização local.
          Celebre o conhecimento compartilhado em prol da saúde da mulher!
        </p>
      </header>

      {/* Main Ranking Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 shadow-xl shadow-pink-900/5 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pink-100 dark:border-zinc-800 pb-4">
          <div className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {loading ? (
              <span>Carregando resultados…</span>
            ) : rankingList.length > 0 ? (
              <span>{rankingList.length} participante(s) registrado(s)</span>
            ) : (
              <span>Nenhum participante ainda</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                loadRanking();
              }}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-semibold cursor-pointer"
              title="Recarregar ranking"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setShowConfirmClear(true);
              }}
              disabled={rankingList.length === 0}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                rankingList.length > 0
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar ranking</span>
            </button>
          </div>
        </div>

        {/* Ranking Table */}
        {rankingList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-pink-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Posição</th>
                  <th className="py-3 px-3">Apelido</th>
                  <th className="py-3 px-3">Pontuação</th>
                  <th className="py-3 px-3">Tempo</th>
                  <th className="py-3 px-3">Concluído em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50 dark:divide-zinc-850">
                {rankingList.map((entry, index) => {
                  let badgeRank = '';
                  if (index === 0) badgeRank = '🥇 1º';
                  else if (index === 1) badgeRank = '🥈 2º';
                  else if (index === 2) badgeRank = '🥉 3º';
                  else badgeRank = `${index + 1}º`;

                  return (
                    <tr
                      key={entry.id || index}
                      className="hover:bg-pink-50/40 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 font-heading font-bold text-pink-950 dark:text-pink-100 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${
                            index === 0
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200'
                              : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {badgeRank}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">
                        {entry.nickname}
                        {entry.score === 100 && (
                          <span className="ml-2 text-[10px] text-pink-600 dark:text-pink-400 font-normal">
                            ★ Nota 10
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-pink-700 dark:text-pink-400 whitespace-nowrap">
                        {entry.score} pts{' '}
                        <span className="text-[11px] text-zinc-400 font-normal">
                          ({entry.correctCount}/10 · {entry.percentage}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-zinc-600 dark:text-zinc-400 font-mono tabular-nums whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          {entry.formattedTime}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-zinc-500 dark:text-zinc-400 text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {formatDate(entry.createdAt)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-50 dark:bg-zinc-800 flex items-center justify-center text-pink-600">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100">
              Ainda não há resultados registrados
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Complete o quiz de 10 perguntas para registrar sua pontuação e seu apelido no ranking!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onNavigateTab('quiz');
                }}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-pink-700 hover:bg-pink-600 text-white cursor-pointer"
              >
                Fazer o Quiz Agora
              </button>
            </div>
          </div>
        )}

        {/* Information note */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
          <div>
            <strong>Critério de Ordenação:</strong> Maior pontuação em primeiro lugar. Em caso de
            empate, quem concluiu no menor tempo ou com maior antecedência fica à frente.
          </div>
          <div>
            Projeto concebido e realizado pelo <strong>Time Preto do Grupo Steve Jobs</strong>.
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Clear Ranking */}
      {showConfirmClear && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-pink-950 dark:text-pink-100">
              Apagar resultados do ranking?
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Todos os resultados do quiz registrados no ranking serão apagados. As preferências de tema e
              acessibilidade serão mantidas. Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearRanking}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white cursor-pointer"
              >
                Sim, apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
