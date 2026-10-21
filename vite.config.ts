import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function rankingApiPlugin(): Plugin {
  let rankingEntries = [
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

  return {
    name: 'ranking-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url === '/api/ranking' || req.url.startsWith('/api/ranking?'))) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (req.method === 'GET') {
            const sorted = [...rankingEntries].sort((a, b) => {
              if (b.score !== a.score) return b.score - a.score;
              return a.timeSeconds - b.timeSeconds;
            });
            res.end(JSON.stringify(sorted));
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const newEntry = {
                  id: 'rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
                  nickname: (parsed.nickname || 'Participante RosaViva').slice(0, 24),
                  score: Number(parsed.score) || 0,
                  correctCount: Number(parsed.correctCount) || 0,
                  totalQuestions: Number(parsed.totalQuestions) || 10,
                  percentage: Number(parsed.percentage) || 0,
                  timeSeconds: Number(parsed.timeSeconds) || 0,
                  formattedTime: parsed.formattedTime || '00:00',
                  createdAt: new Date().toISOString(),
                };
                rankingEntries.push(newEntry);
                res.statusCode = 201;
                res.end(JSON.stringify(newEntry));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Formato inválido' }));
              }
            });
            return;
          }

          if (req.method === 'DELETE') {
            rankingEntries = [];
            res.end(JSON.stringify({ success: true, message: 'Ranking limpo' }));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), rankingApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
