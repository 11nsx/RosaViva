import { Question } from '../types/quiz';

/**
 * 10 Questões Oficiais RosaViva
 * Baseadas estritamente nas diretrizes do Instituto Nacional de Câncer (INCA)
 * e do Ministério da Saúde do Brasil.
 */
export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'História & Significado',
    question: 'Qual é o principal objetivo da campanha mundial do Outubro Rosa simbolizada pelo laço rosa?',
    options: [
      {
        id: 'A',
        text: 'Conscientizar sobre a importância da prevenção, do diagnóstico precoce e do acesso aos serviços de saúde para o câncer de mama.',
      },
      {
        id: 'B',
        text: 'Determinar que apenas mulheres acima de 70 anos devem realizar exames preventivos anuais.',
      },
      {
        id: 'C',
        text: 'Promover a venda exclusiva de medicamentos e produtos cosméticos temáticos na cor rosa.',
      },
      {
        id: 'D',
        text: 'Substituir as consultas ginecológicas médicas por campanhas informativas exclusivamente digitais.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'O Outubro Rosa surgiu na década de 1990 nos Estados Unidos e expandiu-se globalmente com o objetivo de compartilhar informações, promover a conscientização sobre o câncer de mama, proporcionar maior acesso aos serviços de diagnóstico e de tratamento e contribuir para a redução da mortalidade.',
    healthTip:
      'Informação confiável e acolhimento salvam vidas. A campanha lembra a importância do cuidado contínuo durante o ano todo.',
  },
  {
    id: 2,
    category: 'Conceito Biológico',
    question: 'O que caracteriza clinicamente o câncer de mama?',
    options: [
      {
        id: 'A',
        text: 'Uma infecção bacteriana contagiosa transmitida por contato físico direto com a pele.',
      },
      {
        id: 'B',
        text: 'A multiplicação desordenada de células anormais da mama, que formam um tumor com potencial de invadir outros tecidos.',
      },
      {
        id: 'C',
        text: 'Um acúmulo temporário de leite materno sem qualquer relação com alterações celulares genéticas.',
      },
      {
        id: 'D',
        text: 'Uma inflamação benigna e passageira causada exclusivamente por esforço muscular nos membros superiores.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Segundo o INCA, o câncer de mama é uma doença resultante da multiplicação desordenada de células anormais da mama, que formam um tumor com capacidade de invadir tecidos adjacentes e outros órgãos (metástase). Existem vários tipos de câncer de mama, cada um com comportamento e evolução específicos.',
    healthTip:
      'Nem todo tumor mamário é maligno; a maioria dos nódulos investigados na prática médica é de natureza benigna (como cistos e fibroadenomas).',
  },
  {
    id: 3,
    category: 'Fatores de Risco & Prevenção',
    question: 'Sobre a prevenção e os fatores de risco associados ao câncer de mama, o que a evidência científica comprova?',
    options: [
      {
        id: 'A',
        text: 'Hábitos saudáveis como atividade física regular, alimentação balanceada e evitar álcool reduzem o risco em até 30%, mas não o eliminam por completo.',
      },
      {
        id: 'B',
        text: 'Praticar esportes e ter alimentação saudável garante 100% de imunidade contra qualquer tipo de câncer.',
      },
      {
        id: 'C',
        text: 'O histórico genético familiar é o único fator determinante; o estilo de vida não tem nenhuma influência.',
      },
      {
        id: 'D',
        text: 'O câncer de mama afeta apenas mulheres que nunca tiveram filhos ou que não amamentaram.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'O INCA estima que cerca de 30% dos casos de câncer de mama podem ser evitados com a adoção de hábitos saudáveis: praticar atividade física, manter o peso corporal adequado, evitar o consumo de bebidas alcoólicas e amamentar. No entanto, hábitos saudáveis reduzem o risco, mas não eliminam completamente a possibilidade de desenvolver a doença, já que fatores hormonais, idade e aspectos genéticos também exercem papel relevante.',
    healthTip:
      'Cuidar da saúde física é fundamental para o bem-estar global, sem abrir mão das consultas médicas periódicas.',
  },
  {
    id: 4,
    category: 'Sinais & Sintomas de Alerta',
    question: 'Quais alterações nas mamas devem ser observadas como sinais de alerta que exigem avaliação médica?',
    options: [
      {
        id: 'A',
        text: 'Nódulo fixo e geralmente indolor, pele com aspecto de casca de laranja, retração no mamilo ou secreção espontânea transparente ou sanguinolenta.',
      },
      {
        id: 'B',
        text: 'Apenas dor passageira nas mamas no período pré-menstrual sem nenhum nódulo ou alteração visual.',
      },
      {
        id: 'C',
        text: 'Aumento leve e simétrico de ambas as mamas decorrente de gravidez ou ganho de peso corporal.',
      },
      {
        id: 'D',
        text: 'Presença de sardas ou pequenas pintas congênitas na pele do tórax presentes desde a infância.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Os principais sinais de alerta descritos pelo Ministério da Saúde incluem: nódulo (caroço) fixo e geralmente indolor (principal manifestação em 90% dos casos sintomáticos), pele da mama avermelhada ou com aspecto semelhante à casca de laranja, alterações no bico do peito (como retração) e saída espontânea de líquido anormal pelo mamilo.',
    healthTip:
      'A presença desses sinais não significa diagnóstico de câncer com certeza, mas serve como indicativo claro para buscar avaliação de um profissional de saúde.',
  },
  {
    id: 5,
    category: 'Autoconhecimento das Mamas',
    question: 'Qual é o papel correto do autoconhecimento das mamas (palpação e observação da própria mama) na saúde da mulher?',
    options: [
      {
        id: 'A',
        text: 'Ele permite que a mulher reconheça o que é normal em seu corpo e perceba alterações precocemente, mas não substitui a mamografia e a consulta médica.',
      },
      {
        id: 'B',
        text: 'Ele é o único exame necessário para o diagnóstico definitivo, dispensando qualquer mamografia.',
      },
      {
        id: 'C',
        text: 'Ele não tem nenhuma utilidade clínica e não deve ser encorajado em nenhuma hipótese.',
      },
      {
        id: 'D',
        text: 'Ele é capaz de detectar microcalcificações invisíveis que nem mesmo aparelhos de imagem conseguem registrar.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'O Ministério da Saúde e o INCA recomendam que as mulheres conheçam o próprio corpo e suas mamas nas atividades cotidianas (no banho, ao se vestir ou pentear o cabelo), para perceberem alterações suspeitas. Entretanto, o autoexame isolado não substitui os exames clínicos nem a mamografia de rastreamento, pois lesões milimétricas em fases iniciais não são palpáveis.',
    healthTip:
      'Conhecer o próprio corpo é um gesto de amor-próprio e cuidado diário; faça dele um aliado dos seus exames médicos periódicos.',
  },
  {
    id: 6,
    category: 'Mamografia & Rastreamento',
    question: 'De acordo com as diretrizes do Ministério da Saúde e do INCA no Brasil, como é recomendado o rastreamento por mamografia no SUS para mulheres assintomáticas?',
    options: [
      {
        id: 'A',
        text: 'Para mulheres na faixa etária de 50 a 69 anos, recomenda-se a realização de mamografia a cada 2 anos.',
      },
      {
        id: 'B',
        text: 'Deve ser realizada apenas uma vez na vida, logo após completar 18 anos de idade.',
      },
      {
        id: 'C',
        text: 'É recomendada mensalmente para todas as mulheres a partir dos 20 anos, sem critério de risco.',
      },
      {
        id: 'D',
        text: 'A mamografia foi descontinuada e substituída exclusivamente por exames de sangue laboratoriais de rotina.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'No Brasil, as diretrizes oficiais do Ministério da Saúde para o rastreamento em mulheres sem sinais ou sintomas recomendam a mamografia de rastreamento bienal (a cada 2 anos) na faixa etária de 50 a 69 anos, intervalo e faixa etária onde o balanço entre benefícios e riscos é cientificamente favorável. Mulheres com histórico de alto risco familiar de câncer de mama devem ter conduta individualizada com seu médico.',
    healthTip:
      'A mamografia é o exame de imagem mais eficaz para identificar tumores menores que um centímetro, antes mesmo de se tornarem palpáveis.',
  },
  {
    id: 7,
    category: 'Diagnóstico Precoce',
    question: 'Por que o diagnóstico do câncer de mama em estágios iniciais é tão relevante para o prognóstico?',
    options: [
      {
        id: 'A',
        text: 'Porque eleva as chances de cura para cerca de 95% e viabiliza cirurgias menos invasivas e tratamentos com menor toxicidade.',
      },
      {
        id: 'B',
        text: 'Porque o estágio inicial da doença dispensa qualquer forma de acompanhamento médico subsequente.',
      },
      {
        id: 'C',
        text: 'Porque impede que a pessoa desenvolva qualquer outro tipo de enfermidade ao longo da vida.',
      },
      {
        id: 'D',
        text: 'Porque em estágio inicial os tumores desaparecem espontaneamente sem necessitar de terapia médica orientada.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'O diagnóstico precoce é o principal determinante para o sucesso do tratamento do câncer de mama. Quando descoberto em estágios iniciais, o tratamento pode ser mais conservador (preservando a mama), menos agressivo e com taxas de sucesso e cura que superam 90% a 95%, reduzindo significativamente a taxa de mortalidade.',
    healthTip:
      'Quanto mais cedo o tumor for identificado, maiores são as alternativas terapêuticas e a qualidade de vida durante e após a recuperação.',
  },
  {
    id: 8,
    category: 'Mitos & Verdades',
    question: 'Em relação aos mitos populares sobre o câncer de mama, assinale a afirmação cientificamente VERDADEIRA:',
    options: [
      {
        id: 'A',
        text: 'O uso de desodorantes antitranspirantes, sutiãs com aro de sustentação e pancadas acidentais na mama NÃO causam câncer.',
      },
      {
        id: 'B',
        text: 'Bater a mama em algum objeto é a causa número um de desenvolvimento de tumores malignos.',
      },
      {
        id: 'C',
        text: 'Usar sutiã preto durante o dia bloqueia a circulação linfática e obrigatoriamente produz câncer.',
      },
      {
        id: 'D',
        text: 'Mulheres com seios pequenos nunca desenvolvem câncer de mama por terem poucas células.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Não existem evidências científicas que comprovem ligação entre o uso de antitranspirantes, o tipo de sutiã ou pequenos traumas físicos (como batidas acidentais) e o surgimento do câncer de mama. O tamanho das mamas também não interfere no risco; o que importa é a densidade e as características do tecido mamário.',
    healthTip:
      'Desmistificar informações falsas evita medos infundados e ajuda a focar naquilo que realmente faz a diferença: exames em dia e estilo de vida saudável.',
  },
  {
    id: 9,
    category: 'Câncer de Mama em Homens',
    question: 'Qual é a realidade médica do câncer de mama na população masculina?',
    options: [
      {
        id: 'A',
        text: 'Homens também possuem glândula mamária e podem ter câncer de mama, representando cerca de 1% do total de casos registrados.',
      },
      {
        id: 'B',
        text: 'Homens são biologicamente imunes a qualquer doença na região do tórax e das mamas.',
      },
      {
        id: 'C',
        text: 'O câncer de mama afeta homens e mulheres em proporções rigorosamente iguais (50% cada).',
      },
      {
        id: 'D',
        text: 'A doença em homens é sempre causada exclusivamente por ingestão excessiva de doces.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Embora seja muito mais comum no sexo feminino, os homens também possuem tecido mamário residual e podem desenvolver câncer de mama. Casos masculinos representam aproximadamente 1% do total de diagnósticos. Por ser raro e pouco divulgado, homens frequentemente demoram mais a procurar o médico ao notar nódulos ou retrações na região peitoral.',
    healthTip:
      'Homens que notarem caroço abaixo da aréola, secreção ou alteração na pele do peito também devem procurar atendimento médico imediatamente.',
  },
  {
    id: 10,
    category: 'Acesso à Saúde & Cuidado',
    question: 'Diante de qualquer alteração suspeita na mama ou para fazer o acompanhamento preventivo regular, qual é a conduta correta?',
    options: [
      {
        id: 'A',
        text: 'Procurar uma Unidade Básica de Saúde (UBS) do SUS ou um médico especialista (mastologista/ginecologista) para avaliação individualizada.',
      },
      {
        id: 'B',
        text: 'Aguardar vários meses para verificar se a alteração desaparece por conta própria sem procurar auxílio.',
      },
      {
        id: 'C',
        text: 'Recorrer a receitas caseiras milagrosas divulgadas na internet sem comprovação médica.',
      },
      {
        id: 'D',
        text: 'Evitar falar sobre o assunto por medo e não comparecer a consultas de rotina.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'A orientação oficial do Ministério da Saúde é procurar a Unidade Básica de Saúde (UBS / posto de saúde) mais próxima ao perceber qualquer alteração mamária, ou no intervalo do rastreamento de rotina. O SUS oferece de forma gratuita a consulta, a mamografia, os exames complementares (como ultrassonografia e biópsia) e todo o suporte terapêutico necessário.',
    healthTip:
      'O cuidado com a saúde é um direito e um ato de coragem. O acolhimento precoce na rede de saúde transforma incertezas em caminhos de cura.',
  },
];
