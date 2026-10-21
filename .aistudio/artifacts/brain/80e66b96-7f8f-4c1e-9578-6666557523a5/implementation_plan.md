# RosaViva — Quiz Educativo Outubro Rosa e Saúde da Mulher

Aplicação web completa, moderna e acessível voltada à conscientização sobre prevenção, sinais de alerta, diagnóstico precoce e cuidados com a saúde da mulher na campanha Outubro Rosa, com 10 questões médicas revisadas (INCA / Ministério da Saúde), cronômetro, revisão interativa, modos de acessibilidade (Libras, daltonismo, modo escuro, leitor por voz e controle de fonte) e emissão de certificado digital.

---

### Decisões Confirmadas e Alinhamento com o Usuário

> [!IMPORTANT]
> Decisões refinadas na etapa de alinhamento incorporadas ao projeto:
> - **Acessibilidade em Libras**: Integração do widget governamental oficial VLibras (`vlibras-plugin`) com ativação direta, além de modal explicativo com guia visual de Libras para termos de saúde feminina.
> - **Certificado Digital de Conclusão**: Gerador interativo de certificado digital personalizado com o nome da participante, pontuação e data, exportável diretamente em imagem PNG via Canvas.
> - **Recursos Multissensoriais**: Ambos os pacotes de acessibilidade incluídos — filtros de daltonismo (Deuteranopia, Protanopia, Tritanopia e Alto Contraste), Modo Escuro / Claro, redimensionamento de fonte (A-, A, A+), sintetizador de voz nativo (Web Speech API) para leitura em áudio das questões e efeitos sonoros educativos suaves (Web Audio API sem dependências externas).
> - **Responsabilidade Médica (INCA / Ministério da Saúde)**: Conteúdo sem promessas absolutas, ressaltando o autoconhecimento mamário (sem tratar o autoexame isolado como substituto da mamografia de rastreamento) e respeitando as diretrizes oficiais de saúde pública brasileira.

---

## 1. Visão Geral e Conceito do Produto

- **O que faz**: Oferece uma jornada educativa e interativa de conscientização sobre o câncer de mama, dividida em três fases: Apresentação & Ambientação Acessível, Quiz Interativo com 10 perguntas cronometradas e Tela de Resultados com Diagnóstico de Desempenho, Revisão Ponto a Ponto e Emissão de Certificado.
- **Público-Alvo**: Mulheres de todas as idades, estudantes, educadores, profissionais de saúde e o público em geral em campanhas comunitárias ou corporativas do Outubro Rosa.
- **Valor Principal**: Desmistificar tabus e combater a desinformação de forma acolhedora, inclusiva e cientificamente responsável, incentivando o diagnóstico precoce e a busca ativa por atendimento nos postos de saúde e unidades básicas.

---

## 2. Experiência do Usuário e Design Visual

### Fluxos Principais
1. **Página Inicial (Boas-Vindas & Preparação)**:
   - Apresentação do tema RosaViva com o laço rosa estilizado em SVG de alta fidelidade.
   - Regras do jogo: exatamente 10 perguntas, 4 alternativas (A, B, C, D), apenas 1 correta, cronômetro contínuo.
   - Painel superior de acessibilidade sempre visível e operante: Modo Escuro, Filtros de Daltonismo, Redimensionamento de Fonte, Leitura por Voz e Ativador de Libras.
   - Botão de destaque *"Começar Quiz"*.
2. **Execução do Quiz (10 Perguntas)**:
   - Cabeçalho dinâmico com: indicador de pergunta ("Pergunta X de 10"), cronômetro contínuo em formato `MM:SS`, barra de progresso animada e pontuação em tempo real (10 pts por acerto).
   - Cartão da questão com tipografia legível, botão de áudio/leitura da pergunta e 4 alternativas com identificadores estilizados (A, B, C, D).
   - Seleção única com destaque visual claro; botão de ação *"Confirmar Resposta"*.
   - Após confirmação: desabilitação imediata para impedir troca, destaque cromático e semântico (ícone de visto/cruz + texto explícito de Acerto/Erro), seguido de card com justificativa educativa profunda fundamentada no INCA.
   - Botão *"Próxima Pergunta"* ou, na 10ª questão, *"Ver Resultado"*.
3. **Tela de Resultados & Conscientização**:
   - Resumo analítico: Pontuação final (ex.: "80 de 100 pontos"), porcentagem de acertos, respostas certas vs. incorretas e tempo total decorrido.
   - Feedback categorizado por faixas oficiais do briefing (0–39%, 40–69%, 70–89%, 90–100%).
   - Alerta institucional e orientações oficiais de saúde.
   - Seção interativa de geração do Certificado Digital "Embaixadora / Conscientizadora Outubro Rosa" com input de nome e download em PNG.
4. **Revisão Detalhada das 10 Perguntas**:
   - Listagem exaustiva de todas as 10 perguntas com o enunciado, alternativa marcada pelo usuário, alternativa correta, status acessível (ícone + texto legível) e explicação médica.
5. **Ações Finais**:
   - Botões *"Refazer Quiz"* (reseta cronômetro, pontuação, respostas e estado) e *"Voltar ao Início"*.

### Identidade Visual & Acessibilidade
- **Paleta de Cores (Outubro Rosa com Contraste WCAG AA)**:
  - *Neutro dominante (60%)*: Fundo claro suave `#FFF5F7` / `#FAF7F9` (Modo Claro) e ardósia escuro com nuances rosadas `#181116` (Modo Escuro).
  - *Superfícies estruturais (30%)*: Cartões em branco puro `#FFFFFF` (Claro) e `#261A23` (Escuro), com bordas suaves e sombras delicadas.
  - *Acentos semânticos (10%)*: Rosa Viva primário `#E11D74` / `#BE185D`, Rosa suave `#FCE7F3`, Verde acessível para acertos `#0D9488` / `#16A34A` e Coral de contraste para erros `#DC2626`.
- **Filtros de Daltonismo por CSS SVG Matrix Filters**:
  - Padrão (Sem filtro)
  - Deuteranopia (auxílio para verde-vermelho)
  - Protanopia (auxílio para deficiência de vermelho)
  - Tritanopia (auxílio para azul-amarelo)
  - Alto Contraste (preto/branco com realces ambar/ouro)
- **Acessibilidade em Libras**:
  - Integração oficial do script `VLibras` com avatar 3D da plataforma governamental.
  - Modal complementar "Guia em Libras" com sinalização e guia dos principais termos em Língua Brasileira de Sinais.

---

## 3. Estrutura e Conteúdo das 10 Perguntas Educativas

Todas as perguntas foram meticulosamente desenvolvidas seguindo as orientações do INCA e Ministério da Saúde do Brasil:
1. **Origem e Significado do Outubro Rosa**: Surgimento do laço rosa na década de 1990 e foco na conscientização global.
2. **O que é o Câncer de Mama**: Multiplicação desordenada de células anormais da mama formando tumores.
3. **Fatores de Risco e Prevenção**: Idade, histórico genético, sedentarismo, obesidade e consumo de álcool (hábitos reduzem riscos em até 30%, mas não os eliminam 100%).
4. **Sinais e Sintomas de Alerta**: Nódulos endurecidos, alterações no bico do peito, secreção espontânea e aspecto de "casca de laranja" (destacando que nem todo nódulo é maligno).
5. **Papel do Autoconhecimento das Mamas**: A importância de a mulher observar e conhecer suas mamas no dia a dia sem a falsa crença de que o toque isolado substitui os exames clínicos e mamografia.
6. **Mamografia de Rastreamento**: Recomendações oficiais do Ministério da Saúde no Brasil (mulheres de 50 a 69 anos a cada 2 anos no rastreamento padrão pelo SUS, ou conforme indicação médica para grupos de risco).
7. **Importância do Diagnóstico Precoce**: Quando identificado em estágios iniciais, as chances de cura podem chegar a até 95%, além de possibilitar tratamentos menos invasivos.
8. **Mitos e Verdades**: Desmistificação de crenças populares (como uso de desodorante antitranspirante, sutiã com aro ou pancadas na mama não causarem câncer).
9. **Câncer de Mama em Homens**: Esclarecimento de que homens também possuem tecido mamário e podem, em menor proporção (cerca de 1%), desenvolver a doença.
10. **Acesso ao SUS e Cuidados com a Saúde**: Onde buscar acolhimento (Unidades Básicas de Saúde / postos de saúde da família) e a importância do acompanhamento multiprofissional contínuo.

---

## 4. Arquitetura Técnica do Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RosaViva Web Application                        │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Logo RosaViva + Laço SVG + Acessibilidade + Dark/Libras)     │
├────────────────────────────────────────────────────────────────────────┤
│  Acessibility Toolbar:                                                 │
│  [A- A A+] [Filtro Daltonismo] [Tema Escuro] [Som Ligar/Desligar]       │
│  [Libras VLibras Avatar / Guia]                                        │
├────────────────────────────────────────────────────────────────────────┤
│                     View Controller (FSM State)                        │
│                                                                        │
│   ┌────────────────┐      ┌─────────────────┐     ┌────────────────┐   │
│   │   Home View    │ ───> │    Quiz View    │ ──> │  Results View  │   │
│   │  Apresentação  │      │   10 Questões   │     │  & Certificado │   │
│   │  & Informações │      │   Cronômetro    │     │  & 10 Revisões │   │
│   └────────────────┘      └─────────────────┘     └────────────────┘   │
├────────────────────────────────────────────────────────────────────────┤
│  Data & Engine Modules:                                                │
│  - questions.ts (10 questões com A, B, C, D, gabarito e explicação)   │
│  - audioService.ts (Web Audio API synths para acerto/erro/clique)      │
│  - speechService.ts (Web Speech API para locução TTS em PT-BR)         │
│  - certificateGenerator.ts (Exportação de certificado em Canvas 2D)    │
│  - vlibrasIntegration.ts (Inicialização do widget oficial VLibras)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Componentes Principais
1. `src/types/quiz.ts`: Interfaces para `Question`, `Option`, `UserAnswer`, `QuizStats`, `AccessibilityState`.
2. `src/data/quizQuestions.ts`: Estrutura de dados imutável com as 10 perguntas completas, opções, respostas corretas e notas de conscientização.
3. `src/services/soundEffects.ts`: Efeitos sonoros discretos e amigáveis gerados sinteticamente com Web Audio API.
4. `src/services/speechSynthesis.ts`: Leitor de voz nativo do navegador para acessibilidade de pessoas com baixa visão ou deficiência visual.
5. `src/components/AccessibilityBar.tsx`: Barra de ferramentas de acessibilidade com controles de tamanho de fonte, filtros para daltonismo (Protanopia, Deuteranopia, Tritanopia, Alto Contraste), modo escuro, som e Libras.
6. `src/components/Header.tsx`: Identidade visual RosaViva com símbolo do laço rosa em SVG.
7. `src/components/HomeView.tsx`: Tela inicial acolhedora com introdução, diretrizes e botão "Começar Quiz".
8. `src/components/QuizQuestionCard.tsx`: Renderização da pergunta, cronômetro contínuo, 4 opções, validação de seleção única, confirmação, feedback com nota educativa e avanço de fase.
9. `src/components/ResultsView.tsx`: Pontuação (0 a 100), acertos/erros, tempo gasto, faixa de desempenho, certificado interativo e revisão minuciosa das 10 perguntas.
10. `src/components/LibrasGuideModal.tsx`: Modal interativo com sinais e termos de saúde da mulher em Libras como complemento ao widget VLibras.
11. `src/components/Footer.tsx`: Rodapé com aviso de responsabilidade médica e links informativos oficiais (INCA e Ministério da Saúde).

---

## 5. Verificação e Critérios de Conclusão

- [x] Exatamente 10 perguntas estruturadas com 4 alternativas (A, B, C, D) e 1 correta cada.
- [x] Cronômetro no formato `MM:SS` que inicia no início do quiz e pausa exatamente no fim.
- [x] Pontuação acumulada calculada de 0 a 100 pontos (10 pontos por acerto) e cálculo exato de porcentagem.
- [x] Feedbacks educativos imediatos e completos após confirmação.
- [x] Tela de resultados com mensagens para cada faixa de desempenho estipulada.
- [x] Revisão completa das 10 perguntas exibindo escolhas do usuário, resposta correta e explicação.
- [x] Botões "Refazer Quiz" e "Voltar ao Início" com reset completo de estados.
- [x] Recursos de acessibilidade plenos: Libras (VLibras oficial + Guia visual), filtros de daltonismo, modo escuro, ajuste de tamanho de fonte e leitor de tela por voz.
- [x] Design responsivo adaptado para celulares, tablets e desktops com identidade Outubro Rosa.
