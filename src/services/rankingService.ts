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

// Seed initial entries if empty
const DEFAULT_INITIAL_ENTRIES: RankingItem[] = [
  {
    id: 'rank_steve_jobs_001',
    nickname: 'Time Preto (Steve Jobs)',
    score: 100,
    correctCount: 10,
    totalQuestions: 10,
    percentage: 100,
    timeSeconds: 135,
    formattedTime: '02:15',
    createdAt: '2026-10-21T18:00:00.000Z',
  },
  {
    id: 'rank_ana_002',
    nickname: 'Ana Conscientizadora',
    score: 90,
    correctCount: 9,
    totalQuestions: 10,
    percentage: 90,
    timeSeconds: 164,
    formattedTime: '02:44',
    createdAt: '2026-10-21T17:30:00.000Z',
  },
  {
    id: 'rank_estudante_003',
    nickname: 'Estudante Outubro Rosa',
    score: 80,
    correctCount: 8,
    totalQuestions: 10,
    percentage: 80,
    timeSeconds: 195,
    formattedTime: '03:15',
    createdAt: '2026-10-21T16:45:00.000Z',
  },
];

function mergeAndSortEntries(listA: RankingItem[], listB: RankingItem[]): RankingItem[] {
  const map = new Map<string, RankingItem>();

  // Add all from A
  for (const item of listA) {
    if (item && item.nickname) {
      const key = item.id || `${item.nickname}_${item.score}_${item.createdAt}`;
      map.set(key, item);
    }
  }

  // Add all from B
  for (const item of listB) {
    if (item && item.nickname) {
      const key = item.id || `${item.nickname}_${item.score}_${item.createdAt}`;
      map.set(key, item);
    }
  }

  const combined = Array.from(map.values());

  return combined.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSeconds - b.timeSeconds;
  });
}

export async function fetchRanking(): Promise<RankingItem[]> {
  let localEntries: RankingItem[] = [];
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      localEntries = JSON.parse(stored);
    }
  } catch {}

  let backendEntries: RankingItem[] = [];
  try {
    const res = await fetch('/api/ranking', { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        backendEntries = data;
      }
    }
  } catch (err) {
    console.warn('Backend ranking indisponível, usando armazenamento local:', err);
  }

  // Merge backend, local storage, and defaults to guarantee persistence
  let merged = mergeAndSortEntries(backendEntries, localEntries);
  if (merged.length === 0) {
    merged = [...DEFAULT_INITIAL_ENTRIES];
  }

  // Persist merged list back to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
  } catch {}

  return merged;
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

  const newEntry: RankingItem = {
    id: 'rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    nickname: payload.nickname,
    score: payload.score,
    correctCount: payload.correctCount,
    totalQuestions: payload.totalQuestions,
    percentage: payload.percentage,
    timeSeconds: payload.timeSeconds,
    formattedTime: payload.formattedTime,
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately persist to localStorage
  try {
    const current = await fetchRanking();
    const updated = mergeAndSortEntries([newEntry], current);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  // 2. Persist to Backend API
  try {
    await fetch('/api/ranking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('Erro ao salvar no backend, preservado no localStorage:', err);
  }

  return newEntry;
}
