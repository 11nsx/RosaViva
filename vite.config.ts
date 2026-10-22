import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function rankingApiPlugin(): Plugin {
  const jsonPath = path.resolve(__dirname, 'src/data/ranking.json');
  const publicJsonPath = path.resolve(__dirname, 'public/data/ranking.json');

  const readEntries = () => {
    try {
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Erro ao ler ranking.json:', err);
    }
    return [];
  };

  const writeEntries = (entries: any[]) => {
    try {
      const serialized = JSON.stringify(entries, null, 2);
      fs.writeFileSync(jsonPath, serialized, 'utf-8');
      if (fs.existsSync(path.dirname(publicJsonPath))) {
        fs.writeFileSync(publicJsonPath, serialized, 'utf-8');
      }
    } catch (err) {
      console.warn('Erro ao persistir ranking.json:', err);
    }
  };

  return {
    name: 'ranking-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url === '/api/ranking' || req.url.startsWith('/api/ranking?'))) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (req.method === 'GET') {
            const list = readEntries();
            const sorted = [...list].sort((a: any, b: any) => {
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
                const list = readEntries();
                const targetId = parsed.id || ('rank_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));
                const entryData = {
                  id: targetId,
                  nickname: (parsed.nickname || 'Participante RosaViva').slice(0, 24),
                  score: Number(parsed.score) || 0,
                  correctCount: Number(parsed.correctCount) || 0,
                  totalQuestions: Number(parsed.totalQuestions) || 10,
                  percentage: Number(parsed.percentage) || 0,
                  timeSeconds: Number(parsed.timeSeconds) || 0,
                  formattedTime: parsed.formattedTime || '00:00',
                  createdAt: parsed.createdAt || new Date().toISOString(),
                };

                const existingIndex = list.findIndex((item: any) => item.id === targetId);
                if (existingIndex >= 0) {
                  list[existingIndex] = { ...list[existingIndex], ...entryData };
                } else {
                  list.push(entryData);
                }

                writeEntries(list);
                res.statusCode = 200;
                res.end(JSON.stringify(entryData));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Formato inválido' }));
              }
            });
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
