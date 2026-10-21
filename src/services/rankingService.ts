export interface RankingItem {
  id: string;
  nickname: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  timeSeconds: number;
  formattedTime: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'rosaviva.ranking.v1';

export async function fetchRanking(): Promise<RankingItem[]> {
  try {
    const res = await fetch('/api/ranking', { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Sync local storage as backup
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch {}
        return data;
      }
    }
  } catch (err) {
    console.warn('API ranking indisponível, usando fallback local:', err);
  }

  // Fallback to localStorage
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}

  // Default initial demo entries if completely empty
  const defaultEntries: RankingItem[] = [
    {
      id: 'demo-1',
      nickname: 'Time Preto (Steve Jobs)',
      score: 100,
      correctCount: 10,
      totalQuestions: 10,
      percentage: 100,
      timeSeconds: 135,
      formattedTime: '02:15',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      nickname: 'Conscientização Viva',
      score: 90,
      correctCount: 9,
      totalQuestions: 10,
      percentage: 90,
      timeSeconds: 164,
      formattedTime: '02:44',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
  return defaultEntries;
}

export async function saveRankingEntry(entry: {
  nickname: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  timeSeconds: number;
  formattedTime: string;
}): Promise<RankingItem> {
  const payload = {
    ...entry,
    nickname: (entry.nickname.trim() || 'Participante RosaViva').slice(0, 24),
  };

  try {
    const res = await fetch('/api/ranking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const saved = await res.json();
      // Sync local storage
      const current = await fetchRanking();
      const updated = [saved, ...current.filter((c) => c.id !== saved.id)];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return saved;
    }
  } catch (err) {
    console.warn('Erro ao salvar no backend, salvando localmente:', err);
  }

  // Fallback save to localStorage
  const fallbackItem: RankingItem = {
    id: 'local_' + Date.now(),
    nickname: payload.nickname,
    score: payload.score,
    correctCount: payload.correctCount,
    totalQuestions: payload.totalQuestions,
    percentage: payload.percentage,
    timeSeconds: payload.timeSeconds,
    formattedTime: payload.formattedTime,
    createdAt: new Date().toISOString(),
  };

  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: RankingItem[] = stored ? JSON.parse(stored) : [];
    const updated = [fallbackItem, ...list];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  return fallbackItem;
}

export async function clearRanking(): Promise<void> {
  try {
    await fetch('/api/ranking', { method: 'DELETE' });
  } catch {}

  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {}
}
