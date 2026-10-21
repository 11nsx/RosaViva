export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface Option {
  id: OptionId;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  category: string;
  options: [Option, Option, Option, Option];
  correctAnswer: OptionId;
  explanation: string;
  healthTip?: string;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: OptionId;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export type ViewState = 'home' | 'quiz' | 'results';

export type ColorBlindnessMode =
  | 'none'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'high-contrast'
  | 'monochrome';

export type FontSize = 'sm' | 'base' | 'lg' | 'xl';

export interface AccessibilitySettings {
  darkMode: boolean;
  colorBlindness: ColorBlindnessMode;
  fontSize: FontSize;
  soundEnabled: boolean;
  ttsEnabled: boolean;
}
