/**
 * Gerador de Certificado Digital RosaViva usando HTML5 Canvas nativo
 * Renderiza um documento visual de alta resolução (1200x840 px) para download em PNG.
 */

export interface CertificateData {
  userName: string;
  score: number;
  percentage: number;
  timeSpentFormatted: string;
  dateStr: string;
}

export function generateCertificateDataUrl(data: CertificateData): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Background gradient (soft elegant pink to pure white)
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 840);
  bgGrad.addColorStop(0, '#FFF5F8');
  bgGrad.addColorStop(0.5, '#FFFFFF');
  bgGrad.addColorStop(1, '#FDF2F8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 840);

  // 2. Ornate Border frame
  ctx.strokeStyle = '#BE185D'; // Darker pink
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, 1140, 780);

  ctx.strokeStyle = '#F472B6'; // Soft pink inner border
  ctx.lineWidth = 3;
  ctx.strokeRect(46, 46, 1108, 748);

  // Corner decorations
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#DB2777';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.stroke();

    ctx.fillStyle = '#BE185D';
    ctx.beginPath();
    ctx.arc(10, 10, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(56, 56, 0);
  drawCorner(1144, 56, Math.PI / 2);
  drawCorner(1144, 784, Math.PI);
  drawCorner(56, 784, (Math.PI * 3) / 2);

  // 3. Central Pink Ribbon Graphic (Laço Rosa)
  ctx.save();
  ctx.translate(600, 140);
  // Ribbon loop in canvas
  ctx.strokeStyle = '#DB2777';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  // Loop top
  ctx.arc(0, -25, 24, Math.PI * 0.75, Math.PI * 0.25, false);
  // Left tail
  ctx.moveTo(-16, -8);
  ctx.bezierCurveTo(-28, 15, -45, 45, -35, 75);
  // Right tail
  ctx.moveTo(16, -8);
  ctx.bezierCurveTo(28, 15, 45, 45, 35, 75);
  ctx.stroke();

  // Shadow/highlight ribbon
  ctx.strokeStyle = '#F472B6';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -25, 21, Math.PI * 0.75, Math.PI * 0.25, false);
  ctx.stroke();
  ctx.restore();

  // 4. Header Typography
  ctx.textAlign = 'center';
  ctx.fillStyle = '#9D174D';
  ctx.font = 'bold 20px "Outfit", sans-serif';
  ctx.fillText('OUTUBRO ROSA · CONSCIENTIZAÇÃO E SAÚDE DA MULHER', 600, 245);

  ctx.fillStyle = '#831843';
  ctx.font = '800 48px "Outfit", sans-serif';
  ctx.fillText('CERTIFICADO DE PARTICIPAÇÃO', 600, 298);

  ctx.fillStyle = '#4B5563';
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Certificamos com reconhecimento e estima que', 600, 350);

  // 5. Participant Name
  const nameToDisplay = data.userName.trim() ? data.userName.trim().toUpperCase() : 'PARTICIPANTE CONSCIENTE';
  ctx.fillStyle = '#9D174D';
  ctx.font = 'bold 36px "Outfit", sans-serif';
  ctx.fillText(nameToDisplay, 600, 405);

  // Decorative underline under name
  ctx.strokeStyle = '#F472B6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 420);
  ctx.lineTo(850, 420);
  ctx.stroke();

  // 6. Body Text
  ctx.fillStyle = '#374151';
  ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
  const bodyTextLine1 = 'concluiu com êxito o Quiz Educativo RosaViva sobre o Câncer de Mama e Cuidados com a Saúde,';
  const bodyTextLine2 = 'demonstrando compromisso ativo com a informação segura, a prevenção e o diagnóstico precoce.';
  ctx.fillText(bodyTextLine1, 600, 465);
  ctx.fillText(bodyTextLine2, 600, 498);

  // 7. Score Badge Card on Certificate
  ctx.fillStyle = '#FDF2F8';
  ctx.strokeStyle = '#FBCFE8';
  ctx.lineWidth = 2;
  const cardX = 320;
  const cardY = 535;
  const cardW = 560;
  const cardH = 80;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#BE185D';
  ctx.font = '700 22px "Outfit", sans-serif';
  ctx.fillText(`Pontuação Final: ${data.score} / 100  ·  Aproveitamento: ${data.percentage}%`, 600, 570);

  ctx.fillStyle = '#6B7280';
  ctx.font = '400 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Tempo total de realização: ${data.timeSpentFormatted}  ·  10 Questões Avaliadas`, 600, 595);

  // 8. Signatures & Date Section
  ctx.fillStyle = '#4B5563';
  ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Emitido em: ${data.dateStr}`, 350, 680);

  // Signature line 1
  ctx.strokeStyle = '#9CA3AF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(230, 715);
  ctx.lineTo(470, 715);
  ctx.fillStyle = '#6B7280';
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Time Preto · Grupo Steve Jobs', 350, 735);

  // Signature line 2
  ctx.beginPath();
  ctx.moveTo(730, 715);
  ctx.lineTo(970, 715);
  ctx.stroke();
  ctx.fillText('Campanha Outubro Rosa 2026', 850, 735);

  // 9. Fine Print Disclaimer
  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Documento educativo de incentivo à conscientização. Consulte sempre um médico e realize exames de rastreamento periódicos.', 600, 775);

  return canvas.toDataURL('image/png');
}

export function downloadCertificate(data: CertificateData) {
  const dataUrl = generateCertificateDataUrl(data);
  if (!dataUrl) return;

  const link = document.createElement('a');
  const safeName = (data.userName.trim() || 'participante').toLowerCase().replace(/\s+/g, '_');
  link.download = `certificado_rosaviva_${safeName}.png`;
  link.href = dataUrl;
  link.click();
}
