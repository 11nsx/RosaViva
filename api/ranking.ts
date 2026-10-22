/**
 * Vercel Serverless Function: /api/ranking
 * Permite persistência no backend quando o projeto for hospedado na Vercel
 */

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

let inMemoryRanking: RankingItem[] = [
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

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const sorted = [...inMemoryRanking].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSeconds - b.timeSeconds;
    });
    return res.status(200).json(sorted);
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const targetId = body.id || ('rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));
    const entryData: RankingItem = {
      id: targetId,
      nickname: (body.nickname || 'Participante RosaViva').toString().trim().slice(0, 24),
      score: Number(body.score) || 0,
      correctCount: Number(body.correctCount) || 0,
      totalQuestions: Number(body.totalQuestions) || 10,
      percentage: Number(body.percentage) || 0,
      timeSeconds: Number(body.timeSeconds) || 0,
      formattedTime: body.formattedTime || '00:00',
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const existingIndex = inMemoryRanking.findIndex((item) => item.id === targetId);
    if (existingIndex >= 0) {
      inMemoryRanking[existingIndex] = { ...inMemoryRanking[existingIndex], ...entryData };
    } else {
      inMemoryRanking.push(entryData);
    }

    return res.status(200).json(entryData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
