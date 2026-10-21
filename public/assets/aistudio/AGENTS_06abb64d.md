# AGENTS.md — Rosa Viva

## Objetivo
Construir um site educativo estático para o hackathon Outubro Rosa. O projeto se chama **Rosa Viva**. O prazo é extremamente curto; uma primeira versão funcional vale mais que arquitetura sofisticada.

## Stack e execução
- Somente HTML, CSS e JavaScript puro, salvo se o repositório já contiver uma estrutura útil.
- Evitar framework, build step, dependência de npm ou backend que não seja essencial para a demonstração.
- Preferir várias páginas HTML simples, CSS compartilhado e JS dividido por função.
- Usar caminhos relativos, estrutura previsível e compatível com hospedagem estática.
- Não adicionar bibliotecas só por conveniência. Ícones simples podem ser feitos com SVG inline ou CSS.
- Não perguntar decisões não essenciais: escolher uma solução simples e seguir.

## Estratégia para o prazo
1. Na primeira rodada, entregar site navegável com conteúdo real, quiz completo e leaderboard.
2. Depois, testar os fluxos críticos e corrigir erros.
3. Só então ajustar tipografia, espaçamento e detalhes visuais.
4. Não criar login, banco de dados, painel administrativo, CMS, analytics, testes extensivos ou abstrações sem necessidade explícita.

## Páginas esperadas
- `index.html`: início.
- `informacoes.html`: informações gerais e fatores de risco.
- `sinais-prevencao.html`: sinais de alerta e redução de risco.
- `rastreamento.html`: rastreamento e acesso ao cuidado.
- `mitos-verdades.html`: mitos e verdades sobre câncer de mama e detecção precoce.
- `quiz.html`: quiz obrigatório com exatamente dez perguntas.
- `ranking.html`: leaderboard local.
- `fontes.html`: referências oficiais.
- `assets/styles.css`: estilo global e responsivo.
- `assets/logo-placeholder.svg`: placeholder explicitamente provisório da logo.

Os nomes podem mudar apenas se isso simplificar a integração com uma estrutura já existente. Todos os links devem continuar funcionando.

## Identidade visual e acessibilidade
- Identidade contemporânea e acolhedora, com rosa como cor primária e temas claro e escuro completos.
- Usar variáveis CSS de tema para manter consistência e bom contraste; o usuário deve poder alternar entre claro e escuro por um controle visível e acessível. Persistir a escolha em `localStorage` e usar claro como padrão quando ainda não houver preferência.
- Evitar gradientes em excesso, brilho, animações pesadas, poluição visual e textos minúsculos.
- Responsividade para celular e desktop; navegação consistente; HTML semântico; rótulos associados aos campos; foco de teclado visível; contraste legível; feedback que não dependa apenas de cor.
- Respeitar `prefers-reduced-motion` caso existam animações.
- Não usar imagens externas como dependência essencial.
- Não construir uma logo final: deixar placeholder de imagem claramente substituível.

## Quiz: definição de pronto
- Exatamente 10 perguntas.
- Quatro alternativas por pergunta e somente uma correta.
- Seleção de resposta, avanço funcional, feedback educativo por pergunta, pontuação final e opção de refazer.
- Uma resposta só pode ser contabilizada uma vez; não avançar sem seleção.
- Gabarito e explicações conferidos contra as fontes oficiais.
- Não pedir informações pessoais ou de saúde.

## Leaderboard: definição de pronto
- Salvar apelido opcional, pontuação, total de questões e data local com `localStorage`.
- Ordenar por pontuação decrescente; desempate por conclusão mais antiga.
- Ranking é local ao navegador/dispositivo, não global. A interface precisa explicar a limitação.
- Não misturar resultados reais com exemplos fictícios sem rotulá-los como demonstração.
- Possibilitar apagar resultados locais com confirmação e sem apagar outros dados do site.

## Segurança e precisão em conteúdo de saúde
- Fontes primárias preferenciais: Ministério da Saúde e INCA.
- Não afirmar prevenção absoluta, não culpabilizar pacientes e não induzir autodiagnóstico.
- Conhecer o próprio corpo e autoexame não substituem avaliação profissional nem rastreamento recomendado.
- Qualquer alteração suspeita deve ser avaliada em um serviço de saúde, independentemente da idade.
- A recomendação nacional de rastreamento mamográfico atualizada em 2025 prioriza pessoas assintomáticas de 50 a 74 anos, a cada dois anos, no SUS. Fora dessa faixa, orientar discussão dos riscos e benefícios com profissional; não afirmar que o acesso é proibido.
- Hábitos saudáveis podem reduzir riscos, mas não eliminam a possibilidade de desenvolver câncer.
- Incluir aviso visível de que o site é educativo e não substitui consulta, exames, diagnóstico ou tratamento.
- Evitar afirmações estatísticas sem fonte, conteúdo desatualizado e links quebrados.

## Fontes oficiais iniciais
- INCA — Sinais e sintomas: https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/sinais-e-sintomas
- INCA — Fatores de risco: https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/fatores-de-risco
- INCA — Detecção precoce: https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/acoes/deteccao-precoce
- Ministério da Saúde — Nota Técnica nº 626/2025: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-no-626-2025-cgcan-decan-saes-ms.pdf/@@download/file
- INCA — Onde tratar pelo SUS: https://www.gov.br/inca/pt-br/assuntos/cancer/tratamento/onde-tratar-pelo-sus
- INCA — Como prevenir o câncer: https://www.gov.br/inca/pt-br/assuntos/causas-e-prevencao-do-cancer/como-prevenir-o-cancer/como-prevenir-o-cancer

## Privacidade
- Não coletar nome completo, e-mail, telefone, idade, diagnóstico, sintomas detalhados ou outros dados sensíveis.
- O apelido do ranking é opcional e deve ficar apenas no navegador.
- Não adicionar analytics, rastreadores ou envio oculto de mensagens.
- Não solicitar dados pessoais nem informações de saúde aos visitantes. Não enviar dados do usuário para serviços externos sem necessidade e aviso claro.

## Verificação mínima antes de encerrar
- Abrir a página inicial e testar os links para cada página.
- Testar a alternância entre temas claro/escuro e confirmar que a preferência persiste entre páginas e recarregamentos.
- Responder às 10 questões e confirmar nota/feedback/refazer.
- Confirmar persistência, ordenação e limpeza do ranking local.
- Verificar visualização em largura de celular.
- Conferir se links oficiais existem e se a linguagem médica é cautelosa.
- Resumo final deve distinguir o que foi testado, o que não foi possível testar e qualquer configuração externa necessária. Não alegar publicação sem confirmação real.
