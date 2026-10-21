import React from 'react';
import {
  SlidersHorizontal,
  Moon,
  Sun,
  AudioWaveform,
  Ear,
  Type,
  Eye,
} from 'lucide-react';
import { AccessibilitySettings } from '../types/quiz';
import { soundEffects } from '../services/soundEffects';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenAccessibilityModal: () => void;
  onOpenLibrasModal: () => void;
  isReadingText: boolean;
  onToggleSpeech: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  settings,
  onUpdateSettings,
  onOpenAccessibilityModal,
  onOpenLibrasModal,
  isReadingText,
  onToggleSpeech,
}) => {
  const toggleDarkMode = () => {
    soundEffects.playClick();
    onUpdateSettings({ darkMode: !settings.darkMode });
  };

  const handleFontSizeCycle = () => {
    soundEffects.playClick();
    const sizes: AccessibilitySettings['fontSize'][] = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    onUpdateSettings({ fontSize: nextSize });
  };

  return (
    <div
      role="region"
      aria-label="Barra de Acessibilidade Rápida"
      className="w-full bg-pink-100/80 dark:bg-zinc-900 border-b border-pink-200/80 dark:border-zinc-800 transition-colors py-2 px-3 sm:px-4 text-xs font-medium text-pink-950 dark:text-pink-100 sticky top-0 z-30"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Main Accessibility Trigger Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onOpenAccessibilityModal();
          }}
          type="button"
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-pink-700 hover:bg-pink-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          title="Abrir Central de Acessibilidade (Daltonismo, Libras, Tema, Fonte, Som)"
          aria-label="Abrir opções de acessibilidade"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Acessibilidade</span>
          {settings.colorBlindness !== 'none' && (
            <span className="w-2 h-2 rounded-full bg-amber-300"></span>
          )}
        </button>

        {/* Quick Direct Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* Direct Daltonismo Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenAccessibilityModal();
            }}
            type="button"
            className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-white/90 dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 border border-pink-200 dark:border-zinc-700 text-pink-900 dark:text-pink-200 transition-colors cursor-pointer shrink-0"
            title="Ajustar Filtro para Daltonismo"
            aria-label="Modo Daltonismo"
          >
            <Eye className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            <span className="text-xs font-semibold">Daltonismo</span>
            {settings.colorBlindness !== 'none' && (
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600 dark:bg-pink-400"></span>
            )}
          </button>

          {/* Libras */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenLibrasModal();
            }}
            type="button"
            className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-white/90 dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 border border-pink-200 dark:border-zinc-700 text-pink-900 dark:text-pink-200 transition-colors cursor-pointer shrink-0"
            title="Acessibilidade em Libras e Guia de Sinais"
            aria-label="Libras"
          >
            <Ear className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            <span className="text-xs font-semibold">Libras</span>
          </button>

          {/* Text-to-Speech Narrator */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleSpeech();
            }}
            type="button"
            className={`flex items-center gap-1 py-1.5 px-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isReadingText
                ? 'bg-pink-600 text-white border-pink-600 animate-pulse'
                : 'bg-white/90 dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 border-pink-200 dark:border-zinc-700 text-pink-900 dark:text-pink-200'
            }`}
            title={isReadingText ? 'Pausar Leitura' : 'Ler Texto em Voz Alta'}
            aria-label="Leitor de Texto por Voz"
          >
            <AudioWaveform className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{isReadingText ? 'Ouvindo...' : 'Voz'}</span>
          </button>

          {/* Font Size Quick Adjuster */}
          <button
            onClick={handleFontSizeCycle}
            type="button"
            className="flex items-center gap-1 py-1.5 px-2 rounded-xl bg-white/90 dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 border border-pink-200 dark:border-zinc-700 text-pink-900 dark:text-pink-200 transition-colors cursor-pointer shrink-0"
            title="Ajustar Tamanho da Fonte (A- / A / A+)"
            aria-label={`Tamanho da fonte: ${settings.fontSize}`}
          >
            <Type className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            <span className="font-bold text-[11px] uppercase">
              {settings.fontSize === 'sm' && 'A-'}
              {settings.fontSize === 'base' && 'A'}
              {settings.fontSize === 'lg' && 'A+'}
              {settings.fontSize === 'xl' && 'A++'}
            </span>
          </button>

          {/* Dark Mode Quick Toggle */}
          <button
            onClick={toggleDarkMode}
            type="button"
            className="p-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 hover:bg-pink-50 dark:hover:bg-zinc-700 border border-pink-200 dark:border-zinc-700 text-pink-900 dark:text-pink-200 transition-colors cursor-pointer shrink-0"
            title={settings.darkMode ? 'Modo Claro' : 'Modo Escuro'}
            aria-label="Alternar Tema Claro/Escuro"
          >
            {settings.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-pink-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
