import React, { useState, useEffect, useRef } from 'react';
import { PageTab } from './types/navigation';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import { UserAnswer, OptionId, AccessibilitySettings } from './types/quiz';
import { Header } from './components/Header';
import { NoticeBar } from './components/NoticeBar';
import { AccessibilityBar } from './components/AccessibilityBar';
import { AccessibilityModal } from './components/AccessibilityModal';
import { LibrasGuideModal } from './components/LibrasGuideModal';
import { Footer } from './components/Footer';

// Pages
import { HomeLanding } from './components/pages/HomeLanding';
import { InformacoesPage } from './components/pages/InformacoesPage';
import { SinaisPrevencaoPage } from './components/pages/SinaisPrevencaoPage';
import { RastreamentoPage } from './components/pages/RastreamentoPage';
import { MitosVerdadesPage } from './components/pages/MitosVerdadesPage';
import { RankingPage } from './components/pages/RankingPage';
import { FontesPage } from './components/pages/FontesPage';

// Quiz Components
import { HomeView as QuizIntroView } from './components/HomeView';
import { QuizQuestionCard } from './components/QuizQuestionCard';
import { ResultsView } from './components/ResultsView';

import { speechService } from './services/speechService';
import { soundEffects } from './services/soundEffects';
import { saveRankingEntry } from './services/rankingService';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<PageTab>('inicio');

  // Quiz Game State
  const [quizStage, setQuizStage] = useState<'intro' | 'playing' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [currentRankingId, setCurrentRankingId] = useState<string | null>(null);

  // Accessibility State (with localStorage persistence)
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    let savedDark = false;
    try {
      savedDark = localStorage.getItem('rosaviva.tema') === 'escuro';
    } catch {}

    return {
      darkMode: savedDark,
      colorBlindness: 'none',
      fontSize: 'base',
      soundEnabled: true,
      ttsEnabled: false,
    };
  });

  const [isReadingSpeech, setIsReadingSpeech] = useState<boolean>(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState<boolean>(false);
  const [isLibrasModalOpen, setIsLibrasModalOpen] = useState<boolean>(false);

  // Timer interval ref
  const timerRef = useRef<number | null>(null);

  // Sync TTS listener
  useEffect(() => {
    speechService.registerStateListener((speaking) => {
      setIsReadingSpeech(speaking);
    });
    return () => {
      speechService.stop();
    };
  }, []);

  // Update HTML class for Dark Mode and persist
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.darkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem('rosaviva.tema', 'escuro');
      } catch {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('rosaviva.tema', 'claro');
      } catch {}
    }

    root.classList.remove('font-size-sm', 'font-size-base', 'font-size-lg', 'font-size-xl');
    root.classList.add(`font-size-${accessibility.fontSize}`);
  }, [accessibility.darkMode, accessibility.fontSize]);

  // Timer Lifecycle
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerRunning]);

  // Tab Navigation Handler
  const handleNavigateTab = (tab: PageTab) => {
    speechService.stop();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quiz Lifecycle Handlers
  const handleStartQuiz = () => {
    speechService.stop();
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimerSeconds(0);
    setCurrentRankingId(null);
    setIsTimerRunning(true);
    setQuizStage('playing');
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartQuiz = () => {
    speechService.stop();
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimerSeconds(0);
    setCurrentRankingId(null);
    setIsTimerRunning(true);
    setQuizStage('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerConfirmed = (
    questionId: number,
    selectedOption: OptionId,
    isCorrect: boolean
  ) => {
    setUserAnswers((prev) => {
      const existing = prev.filter((a) => a.questionId !== questionId);
      return [
        ...existing,
        {
          questionId,
          selectedOption,
          isCorrect,
          timeSpentSeconds: timerSeconds,
        },
      ];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsTimerRunning(false);
      setQuizStage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Automatically register the participant's score immediately into persistent ranking
      const finalScore = userAnswers.reduce((acc, curr) => (curr.isCorrect ? acc + 10 : acc), 0);
      const finalCorrect = userAnswers.filter((a) => a.isCorrect).length;
      const finalPercentage = Math.round((finalCorrect / 10) * 100);
      const mins = Math.floor(timerSeconds / 60);
      const secs = timerSeconds % 60;
      const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      const entryId = 'rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

      setCurrentRankingId(entryId);

      saveRankingEntry({
        id: entryId,
        nickname: 'Participante RosaViva',
        score: finalScore,
        correctCount: finalCorrect,
        totalQuestions: 10,
        percentage: finalPercentage,
        timeSeconds: timerSeconds,
        formattedTime,
      }).catch((err) => console.warn('Auto-save ranking error:', err));
    }
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    soundEffects.playClick();
    setAccessibility((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  // Toggle TTS Speech
  const handleToggleSpeech = () => {
    if (speechService.isSpeaking()) {
      speechService.stop();
    } else {
      let text = 'Rosa Viva. Informação que acolhe. Campanha oficial do Outubro Rosa.';
      if (activeTab === 'inicio') {
        text = 'Página inicial do Rosa Viva. Conhecer o próprio corpo é um ato de cuidado. Faça o quiz educativo de 10 perguntas.';
      } else if (activeTab === 'quiz' && quizStage === 'playing') {
        const q = QUIZ_QUESTIONS[currentQuestionIndex];
        text = `Pergunta ${currentQuestionIndex + 1} de 10. ${q.question}`;
      } else if (activeTab === 'ranking') {
        text = 'Placar e ranking do quiz educativo Rosa Viva.';
      }
      speechService.speak(text);
    }
  };

  const totalScore = userAnswers.reduce((acc, curr) => (curr.isCorrect ? acc + 10 : acc), 0);
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;

  const getColorBlindnessFilterClass = () => {
    switch (accessibility.colorBlindness) {
      case 'protanopia':
        return 'filter-cb-protanopia';
      case 'deuteranopia':
        return 'filter-cb-deuteranopia';
      case 'tritanopia':
        return 'filter-cb-tritanopia';
      case 'high-contrast':
        return 'filter-cb-high-contrast';
      case 'monochrome':
        return 'filter-cb-monochrome';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 bg-[#FFF8FA] dark:bg-[#140D12] text-[#2D1E27] dark:text-[#F5EDF2] font-body relative">
      {/* Content wrapper with Color Blindness filter strictly confined to visual content */}
      <div className={`flex-1 flex flex-col ${getColorBlindnessFilterClass()}`}>
        {/* 1. Barra de Acessibilidade Rápida */}
        <AccessibilityBar
          settings={accessibility}
          onUpdateSettings={(newSettings) =>
            setAccessibility((prev) => ({ ...prev, ...newSettings }))
          }
          onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
          onOpenLibrasModal={() => setIsLibrasModalOpen(true)}
          isReadingText={isReadingSpeech}
          onToggleSpeech={handleToggleSpeech}
        />

        {/* 2. Cabeçalho com Logo Oficial e Navegação */}
        <Header
          activeTab={activeTab}
          onNavigateTab={handleNavigateTab}
          darkMode={accessibility.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        />

        {/* 3. Aviso Educativo */}
        <NoticeBar />

        {/* 4. Conteúdo Principal das Abas */}
        <main className="flex-1 flex flex-col justify-center py-4">
          {activeTab === 'inicio' && <HomeLanding onNavigateTab={handleNavigateTab} />}

          {activeTab === 'informacoes' && <InformacoesPage onNavigateTab={handleNavigateTab} />}

          {activeTab === 'sinais' && <SinaisPrevencaoPage onNavigateTab={handleNavigateTab} />}

          {activeTab === 'rastreamento' && <RastreamentoPage onNavigateTab={handleNavigateTab} />}

          {activeTab === 'mitos' && <MitosVerdadesPage />}

          {activeTab === 'fontes' && <FontesPage onNavigateTab={handleNavigateTab} />}

          {activeTab === 'ranking' && <RankingPage onNavigateTab={handleNavigateTab} />}

          {activeTab === 'quiz' && (
            <div className="w-full">
              {quizStage === 'intro' && (
                <QuizIntroView onStartQuiz={handleStartQuiz} />
              )}

              {quizStage === 'playing' && (
                <QuizQuestionCard
                  question={QUIZ_QUESTIONS[currentQuestionIndex]}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={QUIZ_QUESTIONS.length}
                  currentScore={totalScore}
                  correctCount={correctCount}
                  elapsedSeconds={timerSeconds}
                  onAnswerConfirmed={handleAnswerConfirmed}
                  onNextQuestion={handleNextQuestion}
                  isLastQuestion={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
                />
              )}

              {quizStage === 'results' && (
                <ResultsView
                  questions={QUIZ_QUESTIONS}
                  userAnswers={userAnswers}
                  totalScore={totalScore}
                  totalTimeSeconds={timerSeconds}
                  rankingId={currentRankingId}
                  onRestartQuiz={handleRestartQuiz}
                  onNavigateHome={() => {
                    setQuizStage('intro');
                    handleNavigateTab('inicio');
                  }}
                  onNavigateRanking={() => handleNavigateTab('ranking')}
                />
              )}
            </div>
          )}
        </main>

        {/* 5. Rodapé com Atribuição ao Time Preto do Grupo Steve Jobs */}
        <Footer />
      </div>

      {/* 6. Central de Acessibilidade Intuitiva (Strictly outside filtered container) */}
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        settings={accessibility}
        onUpdateSettings={(newSettings) =>
          setAccessibility((prev) => ({ ...prev, ...newSettings }))
        }
        onOpenLibrasGuide={() => {
          setIsAccessibilityModalOpen(false);
          setIsLibrasModalOpen(true);
        }}
        isReadingSpeech={isReadingSpeech}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* 7. Modal de Guia em Libras (Strictly outside filtered container) */}
      <LibrasGuideModal
        isOpen={isLibrasModalOpen}
        onClose={() => setIsLibrasModalOpen(false)}
      />
    </div>
  );
}
