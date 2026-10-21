import React from 'react';
import {
  X,
  Moon,
  Sun,
  Eye,
  Type,
  Volume2,
  VolumeX,
  AudioWaveform,
  Ear,
  Sparkles,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { AccessibilitySettings, ColorBlindnessMode, FontSize } from '../types/quiz';
import { soundEffects } from '../services/soundEffects';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenLibrasGuide: () => void;
  isReadingSpeech: boolean;
  onToggleSpeech: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenLibrasGuide,
  isReadingSpeech,
  onToggleSpeech,
}) => {
  if (!isOpen) return null;

  const handleActivateVLibras = () => {
    soundEffects.playClick();
    const btn = document.querySelector('[vw-access-button]') as HTMLElement;
    if (btn) {
      btn.click();
    }
  };

  const colorBlindOptions: { id: ColorBlindnessMode; label: string; desc: string }[] = [
    { id: 'none', label: 'Cores Naturais', desc: 'Visualização padrão' },
    { id: 'protanopia', label: 'Protanopia', desc: 'Ajuste para tons de vermelho' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Ajuste para tons de verde' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'Ajuste para tons de azul' },
    { id: 'high-contrast', label: 'Alto Contraste', desc: 'Máxima nitidez e contraste' },
    { id: 'monochrome', label: 'Monocromático', desc: 'Escala de cinza acessível' },
  ];

  const fontOptions: { id: FontSize; label: string; sample: string }[] = [
    { id: 'sm', label: 'Pequeno', sample: 'Aa' },
    { id: 'base', label: 'Padrão', sample: 'Aa' },
    { id: 'lg', label: 'Grande', sample: 'Aa' },
    { id: 'xl', label: 'Muito Grande', sample: 'Aa' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 border-t sm:border border-pink-200 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 text-zinc-800 dark:text-zinc-100 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 dark:border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="accessibility-modal-title" className="text-lg font-bold font-heading text-pink-950 dark:text-pink-100">
                Central de Acessibilidade
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Ajuste visual, sonoro e Libras com facilidade
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Fechar painel de acessibilidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-sm">
          {/* 1. Tema Claro / Escuro */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Tema de Cores
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onUpdateSettings({ darkMode: false });
                }}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm cursor-pointer transition-all ${
                  !settings.darkMode
                    ? 'bg-pink-50 border-pink-500 text-pink-900 ring-2 ring-pink-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Modo Claro</span>
                {!settings.darkMode && <Check className="w-3.5 h-3.5 text-pink-600 ml-auto" />}
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onUpdateSettings({ darkMode: true });
                }}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm cursor-pointer transition-all ${
                  settings.darkMode
                    ? 'bg-pink-950/40 border-pink-500 text-pink-100 ring-2 ring-pink-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Moon className="w-4 h-4 text-pink-400" />
                <span>Modo Escuro</span>
                {settings.darkMode && <Check className="w-3.5 h-3.5 text-pink-400 ml-auto" />}
              </button>
            </div>
          </div>

          {/* 2. Libras (Destaque Acessível) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-zinc-800 dark:to-zinc-800/80 border border-pink-200 dark:border-zinc-700 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-pink-900 dark:text-pink-300">
              <Ear className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span>Acessibilidade em Libras</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Tradução em Língua Brasileira de Sinais via avatar 3D do Governo Federal e guia de sinais em saúde.
            </p>
            <div className="flex flex-col xs:flex-row gap-2 pt-1">
              <button
                onClick={handleActivateVLibras}
                className="flex-1 py-2.5 px-3 rounded-xl bg-pink-700 hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>Ativar Avatar VLibras</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenLibrasGuide();
                }}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-700 hover:bg-pink-50 dark:hover:bg-zinc-800 text-pink-900 dark:text-pink-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Guia de Sinais</span>
              </button>
            </div>
          </div>

          {/* 3. Tamanho da Fonte */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              <span>Tamanho do Texto</span>
            </span>
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
              {fontOptions.map((f) => {
                const isActive = settings.fontSize === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundEffects.playClick();
                      onUpdateSettings({ fontSize: f.id });
                    }}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-900 dark:text-pink-100 ring-2 ring-pink-500/20 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="text-base">{f.sample}</div>
                    <div className="text-[11px] mt-0.5">{f.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Filtros de Daltonismo */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Modos de Daltonismo e Contraste</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colorBlindOptions.map((opt) => {
                const isActive = settings.colorBlindness === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      soundEffects.playClick();
                      onUpdateSettings({ colorBlindness: opt.id });
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-900 dark:text-pink-100 ring-2 ring-pink-500/20'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        {opt.desc}
                      </div>
                    </div>
                    {isActive && (
                      <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Recursos de Áudio */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Recursos Multissensoriais
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Leitor TTS */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onToggleSpeech();
                }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isReadingSpeech
                    ? 'bg-pink-600 text-white border-pink-600 animate-pulse'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <AudioWaveform className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-xs">
                    {isReadingSpeech ? 'Lendo Agora...' : 'Leitura de Voz (TTS)'}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold opacity-80">
                  {isReadingSpeech ? 'Pausar' : 'Ouvir'}
                </span>
              </button>

              {/* Efeitos Sonoros */}
              <button
                onClick={() => {
                  const nextVal = !settings.soundEnabled;
                  soundEffects.setEnabled(nextVal);
                  if (nextVal) soundEffects.playClick();
                  onUpdateSettings({ soundEnabled: nextVal });
                }}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  settings.soundEnabled
                    ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-900 dark:text-pink-100 ring-2 ring-pink-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 shrink-0" />
                  )}
                  <span className="font-semibold text-xs">Sons Educativos</span>
                </div>
                <span className="text-[10px] uppercase font-bold">
                  {settings.soundEnabled ? 'Ligado' : 'Mudo'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-5 border-t border-pink-100 dark:border-zinc-800 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-pink-700 hover:bg-pink-600 text-white transition-colors cursor-pointer text-center"
          >
            Concluir Ajustes
          </button>
        </div>
      </div>
    </div>
  );
};
