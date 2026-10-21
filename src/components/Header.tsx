import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  SlidersHorizontal,
  Trophy,
} from 'lucide-react';
import { PageTab } from '../types/navigation';
import { soundEffects } from '../services/soundEffects';

interface HeaderProps {
  activeTab: PageTab;
  onNavigateTab: (tab: PageTab) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAccessibilityModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigateTab,
  darkMode,
  onToggleDarkMode,
  onOpenAccessibilityModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'informacoes', label: 'Informações' },
    { id: 'sinais', label: 'Sinais e prevenção' },
    { id: 'rastreamento', label: 'Rastreamento' },
    { id: 'mitos', label: 'Mitos e verdades' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'fontes', label: 'Fontes' },
  ];

  const handleNavClick = (tab: PageTab) => {
    soundEffects.playClick();
    onNavigateTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header w-full bg-white/95 dark:bg-[#181116]/95 backdrop-blur-md border-b border-pink-100 dark:border-pink-950/60 sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Lockup with Official Logo */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          aria-label="Rosa Viva — página inicial"
        >
          <img
            src="/rosaviva-logo.png"
            alt="RosaViva Logo Oficial"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl sm:text-2xl text-pink-900 dark:text-pink-100 tracking-tight leading-none">
              Rosa Viva
            </span>
            <span className="text-[11px] font-medium text-pink-700/80 dark:text-pink-300">
              Informação que acolhe
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-pink-900 dark:text-pink-100 bg-pink-100/70 dark:bg-pink-950/60 font-bold'
                    : 'hover:text-pink-700 dark:hover:text-pink-300 hover:bg-pink-50/60 dark:hover:bg-zinc-800/40'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.id === 'quiz' && (
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-600 mr-1.5 animate-pulse"></span>
                )}
                {link.id === 'ranking' && (
                  <Trophy className="inline-block w-3.5 h-3.5 mr-1 text-amber-500" />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Accessibility Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenAccessibilityModal();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-100/90 dark:bg-pink-950/70 hover:bg-pink-200 dark:hover:bg-pink-900 text-pink-900 dark:text-pink-200 border border-pink-200/80 dark:border-pink-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            title="Abrir Central de Acessibilidade (Libras, Daltonismo, Voz, Fonte)"
            aria-label="Abrir opções de acessibilidade"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-pink-700 dark:text-pink-400" />
            <span className="hidden sm:inline">Acessibilidade</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleDarkMode();
            }}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
            title={darkMode ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
            aria-label={darkMode ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Tema Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-pink-700" />
                <span className="hidden sm:inline">Tema Escuro</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#181116] border-b border-pink-200 dark:border-pink-950/80 px-4 py-3 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1 text-sm font-medium" aria-label="Navegação móvel">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-900 dark:text-pink-100 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2">
                    {link.id === 'quiz' && (
                      <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
                    )}
                    {link.id === 'ranking' && (
                      <Trophy className="w-4 h-4 text-amber-500" />
                    )}
                    <span>{link.label}</span>
                  </div>
                  {isActive && <span className="text-xs text-pink-600 font-bold">Ativo</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
