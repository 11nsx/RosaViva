import React from 'react';
import { X, Ear, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface LibrasGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LibrasGuideModal: React.FC<LibrasGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleActivateVLibras = () => {
    soundEffects.playClick();
    // Try to trigger the official VLibras access button in DOM if present
    const btn = document.querySelector('[vw-access-button]') as HTMLElement;
    if (btn) {
      btn.click();
    }
    onClose();
  };

  const sinaisSaude = [
    {
      termo: 'Mamografia',
      configuracao: 'Mãos em semi-círculo em frente ao peito simulando suave aproximação de placas de imagem.',
      contexto: 'Exame de imagem radiológico fundamental para o rastreamento do câncer em estágios iniciais.',
    },
    {
      termo: 'Autoconhecimento da Mama',
      configuracao: 'Mão aberta tocando suavemente com as polpas digitais em movimentos circulares sobre a mama oposta.',
      contexto: 'Gesto de cuidado e familiaridade com as próprias mamas no dia a dia, auxiliando a notar alterações.',
    },
    {
      termo: 'Prevenção',
      configuracao: 'Mão em configuração de "B" à frente do corpo com movimento de anteparo e bloqueio de proteção.',
      contexto: 'Conjunto de atitudes e hábitos saudáveis que reduzem os riscos de enfermidades.',
    },
    {
      termo: 'Saúde da Mulher',
      configuracao: 'Sinal de "Saúde" (mão em "S" ou "5" no peito com expressão leve) seguido do sinal de "Mulher".',
      contexto: 'Acompanhamento integral, respeito aos ciclos da vida e promoção do bem-estar biopsicossocial.',
    },
    {
      termo: 'Câncer / Tumor',
      configuracao: 'Mão em garra se fechando suavemente, representando a atenção celular necessária e busca por cura.',
      contexto: 'Multiplicação desordenada de células que requer diagnóstico oportuno e tratamento adequado.',
    },
    {
      termo: 'Acolhimento no SUS',
      configuracao: 'Ambos os braços abertos aproximando-se do peito com expressão de abraço e segurança.',
      contexto: 'Acesso gratuito, universal e humanizado aos exames e tratamentos nas Unidades Básicas de Saúde.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="libras-modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-zinc-800 dark:text-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
              <Ear className="w-6 h-6" />
            </div>
            <div>
              <h2 id="libras-modal-title" className="text-xl font-bold font-heading text-pink-950 dark:text-pink-100">
                Acessibilidade em Libras · RosaViva
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Língua Brasileira de Sinais e Inclusão para a Comunidade Surda
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-6">
          {/* VLibras Widget Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-zinc-800/80 dark:to-zinc-800/40 border border-pink-200/80 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-pink-900 dark:text-pink-200 text-sm">
                <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>Avatar 3D Interativo do VLibras</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                O widget oficial do Governo Federal já está integrado nesta página. Clique no botão lateral azul com as mãos sinalizadoras ou no botão abaixo para ativar a tradução automática para Libras.
              </p>
            </div>
            <button
              onClick={handleActivateVLibras}
              className="px-4 py-2 text-xs font-bold text-white bg-pink-700 hover:bg-pink-600 rounded-lg shadow-sm whitespace-nowrap cursor-pointer transition-colors shrink-0"
            >
              Ativar Avatar VLibras
            </button>
          </div>

          {/* Sinais em Saúde */}
          <div>
            <h3 className="text-sm font-bold text-pink-950 dark:text-pink-200 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              Guia Rápido de Sinais e Parâmetros em Saúde da Mulher
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sinaisSaude.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1.5"
                >
                  <div className="font-bold text-sm text-pink-900 dark:text-pink-300">
                    {item.termo}
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Como sinalizar: </span>
                    {item.configuracao}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                    {item.contexto}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dica de Acessibilidade */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-pink-50/50 dark:bg-zinc-800/30 p-3 rounded-lg border border-pink-100 dark:border-zinc-800 leading-relaxed">
            <strong>Dica de Acessibilidade:</strong> Você também pode selecionar qualquer texto do site com o mouse para que o avatar do VLibras o traduza instantaneamente na janela de sinalização.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-pink-100 dark:border-zinc-800 flex items-center justify-between">
          <a
            href="https://www.vlibras.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Conheça a Plataforma VLibras</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
