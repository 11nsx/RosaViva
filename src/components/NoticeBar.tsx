import React from 'react';

export const NoticeBar: React.FC = () => {
  return (
    <div className="w-full bg-pink-50/90 dark:bg-zinc-900/90 border-b border-pink-100 dark:border-pink-950/60 py-2 px-4 text-center text-xs text-zinc-600 dark:text-zinc-300">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 flex-wrap">
        <strong className="text-pink-900 dark:text-pink-200">Conteúdo educativo.</strong>
        <span>Este site não substitui consulta, exames, diagnóstico ou tratamento profissional.</span>
      </div>
    </div>
  );
};
