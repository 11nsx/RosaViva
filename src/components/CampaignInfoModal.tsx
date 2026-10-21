import React from 'react';
import { X, Heart, ShieldCheck, Activity, Award, ExternalLink } from 'lucide-react';
import { PinkRibbonIcon } from './PinkRibbonIcon';
import { soundEffects } from '../services/soundEffects';

interface CampaignInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

export const CampaignInfoModal: React.FC<CampaignInfoModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-zinc-800 dark:text-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60">
              <PinkRibbonIcon size={28} />
            </div>
            <div>
              <h2 id="campaign-modal-title" className="text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
                Sobre o Outubro Rosa e o RosaViva
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Conscientização, Empatia e Ciência a Serviço da Vida
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Fechar modal informativo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-5 text-sm">
          <div className="p-4 rounded-xl bg-pink-50/70 dark:bg-zinc-800/60 border border-pink-200/70 dark:border-zinc-700 leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong className="text-pink-950 dark:text-pink-200">A Força da Informação:</strong> O câncer de mama é o tipo de câncer mais incidente entre mulheres no Brasil e no mundo (depois do câncer de pele não melanoma). Disseminar conhecimentos verdadeiros e combater o estigma é um ato de saúde pública que salva milhares de vidas.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-1.5">
              <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-pink-600" />
                <span>Prevenção Primária</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Manter alimentação equilibrada, peso saudável, prática de exercícios físicos e evitar álcool e tabaco podem prevenir até 30% dos casos da doença.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-1.5">
              <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-bold text-sm">
                <Activity className="w-4 h-4 text-pink-600" />
                <span>Diagnóstico Oportuno</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Identificar alterações no início eleva para até 95% as chances de sucesso no tratamento, com cirurgias menos invasivas e preservação da mama.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-1.5">
              <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-bold text-sm">
                <Heart className="w-4 h-4 text-pink-600" />
                <span>Autoconhecimento</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A mulher deve observar e apalpar suas mamas rotineiramente para conhecer o padrão normal de seu corpo e notar qualquer alteração suspeita.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-1.5">
              <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-bold text-sm">
                <Award className="w-4 h-4 text-pink-600" />
                <span>Acesso Gratuito no SUS</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                O Sistema Único de Saúde garante consulta, mamografia bienal (50 a 69 anos ou por indicação clínica), biópsia, cirurgia e tratamentos gratuitos.
              </p>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            Fontes científicas oficiais: <strong>Instituto Nacional de Câncer (INCA)</strong> e <strong>Ministério da Saúde do Brasil</strong>.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-pink-100 dark:border-zinc-800 flex items-center justify-between gap-3">
          <a
            href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Portal do INCA</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
                onStartQuiz();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-pink-700 hover:bg-pink-600 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Iniciar o Quiz Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
