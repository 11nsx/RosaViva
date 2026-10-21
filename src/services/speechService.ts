/**
 * Serviço de Leitura em Voz Alta (Text-To-Speech) via Web Speech API
 * Promove acessibilidade para pessoas com baixa visão, dislexia ou dificuldades de leitura.
 */

class SpeechService {
  private isSupported: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeSpeaking: boolean = false;
  private onStateChangeCallback: ((speaking: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSupported = true;
    }
  }

  public registerStateListener(cb: (speaking: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public hasSupport(): boolean {
    return this.isSupported;
  }

  public isSpeaking(): boolean {
    if (!this.isSupported) return false;
    return window.speechSynthesis.speaking || this.activeSpeaking;
  }

  public stop() {
    if (!this.isSupported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignored
    }
    this.activeSpeaking = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isSupported) return;

    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select Portuguese voice if available
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(
        (v) => v.lang === 'pt-BR' || v.lang.startsWith('pt')
      );
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      utterance.onstart = () => {
        this.activeSpeaking = true;
        if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      };

      utterance.onend = () => {
        this.activeSpeaking = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.activeSpeaking = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.activeSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }
}

export const speechService = new SpeechService();
