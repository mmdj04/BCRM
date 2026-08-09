import { Archive, CircleHelp, File, Inbox, Keyboard, type LucideIcon, Send, Star, Trash2 } from "lucide-react";
import { siFigma, siGoogledocs, siGooglephotos } from "simple-icons";

const matheusMoraes = {
  name: "Matheus Moraes",
  email: "admin@bcrm.com",
};

const weblabsStudio = {
  name: "Weblabs Studio",
  email: "contact@weblabs.studio",
};

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const hoursAgo = (hours: number) => minutesAgo(hours * 60);
const daysAgo = (days: number) => hoursAgo(days * 24);

export type Recipient = {
  name: string;
  email: string;
};

export type Attachment = {
  id: string;
  name: string;
  size: string;
  icon: typeof siFigma;
};

export type Mail = {
  id: string;
  accountId: number;
  from: Recipient;
  to: Recipient[];
  cc?: Recipient[];
  subject: string;
  body: string;
  receivedAt: string;
  folder: "inbox" | "drafts" | "sent" | "archive" | "trash";
  isRead: boolean;
  isPinned: boolean;
  isPriority: boolean;
  labels: string[];
  attachments?: Attachment[];
  messageCount?: number;
};

export type MailNavItem = {
  id: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  isActive: boolean;
};

type MailNavigation = {
  navMain: MailNavItem[];
  folders: MailNavItem[];
  navFooter: MailNavItem[];
};

export const mails: Mail[] = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    accountId: 1,
    from: {
      name: "William Smith",
      email: "williamsmith@example.com",
    },
    to: [matheusMoraes],
    cc: [weblabsStudio],
    subject: "Reunião Amanhã",
    body: "Olá, vamos marcar uma reunião amanhã para discutir o projeto. Tenho revisado os detalhes do projeto e tenho algumas ideias que gostaria de compartilhar. É fundamental que estejamos alinhados sobre os próximos passos para garantir o sucesso do projeto.\n\nPor favor, venha preparado com quaisquer perguntas ou ideias que possa ter. Ansioso pela nossa reunião!\n\nAtenciosamente, William",
    receivedAt: minutesAgo(24),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: true,
    labels: ["reunião", "trabalho", "importante"],
    attachments: [
      {
        id: "studio-admin-fig",
        name: "studio-admin.fig",
        size: "21 MB",
        icon: siFigma,
      },
      {
        id: "features-docx",
        name: "features.docx",
        size: "3.7 MB",
        icon: siGoogledocs,
      },
      {
        id: "preview-png",
        name: "preview.png",
        size: "2.3 MB",
        icon: siGooglephotos,
      },
    ],
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    accountId: 2,
    from: {
      name: "Alice Smith",
      email: "alicesmith@example.com",
    },
    to: [weblabsStudio],
    subject: "Re: Atualização do Projeto",
    body: "Obrigado pela atualização do projeto. Está ótimo! Li o relatório e o progresso está impressionante. A equipe fez um trabalho fantástico, e agradeço o empenho de todos.\n\nTenho algumas pequenas sugestões que incluirei no documento anexo.\n\nVamos discutir isso durante a nossa próxima reunião. Continuem com o excelente trabalho!\n\nAtenciosamente, Alice",
    receivedAt: hoursAgo(2),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: false,
    labels: ["trabalho", "importante"],
    attachments: [
      {
        id: "project-notes-docx",
        name: "project-notes.docx",
        size: "1.8 MB",
        icon: siGoogledocs,
      },
    ],
    messageCount: 3,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    accountId: 1,
    from: {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
    },
    to: [matheusMoraes],
    subject: "Planos para o Fim de Semana",
    body: "Tem algum plano para o fim de semana? Estava pensando em fazer uma caminhada nas montanhas próximas. Faz um tempo que não aproveitamos ao ar livre.\n\nSe estiver interessado, me avise e podemos planejar os detalhes. Será uma ótima forma de relaxar e apreciar a natureza.\n\nAguardo sua resposta!\n\nAbraços, Bob",
    receivedAt: daysAgo(1),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: false,
    labels: ["pessoal"],
  },
  {
    id: "61c35085-72d7-42b4-8d62-738f700d4b92",
    accountId: 1,
    from: {
      name: "Emily Davis",
      email: "emilydavis@example.com",
    },
    to: [matheusMoraes],
    subject: "Re: Pergunta sobre o Orçamento",
    body: "Tenho uma pergunta sobre o orçamento do próximo projeto. Parece que há uma discrepância na alocação de recursos.\n\nRevisei o relatório de orçamento e identifiquei algumas áreas onde podemos otimizar nossos gastos sem comprometer a qualidade do projeto.\n\nAnexei uma análise detalhada para sua referência. Vamos discutir isso mais detalhadamente na nossa próxima reunião.\n\nObrigada, Emily",
    receivedAt: daysAgo(2),
    folder: "inbox",
    isRead: false,
    isPinned: true,
    isPriority: true,
    labels: ["trabalho", "orçamento"],
    attachments: [
      {
        id: "budget-analysis-docx",
        name: "budget-analysis.docx",
        size: "2.1 MB",
        icon: siGoogledocs,
      },
    ],
    messageCount: 2,
  },
  {
    id: "8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97",
    accountId: 2,
    from: {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
    },
    to: [weblabsStudio],
    subject: "Anúncio Importante",
    body: "Tenho um anúncio importante a fazer durante a reunião da equipe. Trata-se de uma mudança estratégica em nossa abordagem para o lançamento do próximo produto. Recebemos feedback valioso dos nossos testadores beta, e acredito que é hora de fazer alguns ajustes para melhor atender às necessidades dos nossos clientes.\n\nEssa mudança é crucial para o nosso sucesso, e espero discuti-la com a equipe. Por favor, esteja preparado para compartilhar suas ideias durante a reunião.\n\nAtenciosamente, Michael",
    receivedAt: daysAgo(3),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: true,
    labels: ["reunião", "trabalho", "importante"],
  },
  {
    id: "1f0f2c02-e299-40de-9b1d-86ef9e42126b",
    accountId: 1,
    from: {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
    },
    to: [matheusMoraes],
    subject: "Re: Feedback sobre a Proposta",
    body: "Obrigado pelo seu feedback sobre a proposta. Está ótimo! Fico feliz em saber que você achou promissor. A equipe trabalhou diligentemente para abordar todos os pontos principais que você levantou, e acredito que agora temos uma base sólida para o projeto.\n\nAnexei a proposta revisada para sua análise.\n\nPor favor, me avise se tiver algum comentário ou sugestão adicional. Aguardo sua resposta.\n\nAtenciosamente, Sarah",
    receivedAt: daysAgo(5),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["trabalho"],
    attachments: [
      {
        id: "proposal-layout-fig",
        name: "proposal-layout.fig",
        size: "14 MB",
        icon: siFigma,
      },
    ],
  },
  {
    id: "17c0a96d-4415-42b1-8b4f-764efab57f66",
    accountId: 2,
    from: {
      name: "David Lee",
      email: "davidlee@example.com",
    },
    to: [weblabsStudio],
    cc: [matheusMoraes],
    subject: "Nova Ideia de Projeto",
    body: "Tenho uma nova ideia de projeto empolgante para discutir com você. Envolve expandir nossos serviços para atingir um nicho de mercado que apresentou crescimento considerável nos últimos meses.\n\nPreparou uma proposta detalhada descrevendo os benefícios potenciais e a estratégia de execução.\n\nEste projeto tem o potencial de impactar positivamente nossos negócios de forma significativa. Vamos marcar uma reunião para aprofundar os detalhes e verificar se está alinhado com nossos objetivos atuais.\n\nAtenciosamente, David",
    receivedAt: daysAgo(8),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["reunião", "trabalho", "importante"],
  },
  {
    id: "2f0130cb-39fc-44c4-bb3c-0a4337edaaab",
    accountId: 1,
    from: {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
    },
    to: [matheusMoraes],
    subject: "Planos de Férias",
    body: "Vamos planejar nossas férias para o próximo mês. O que acha? Estava pensando em visitar um paraíso tropical, e reuni algumas opções de destinos.\n\nAcredito que é hora de relaxarmos e recarregarmos as energias. Por favor, dê uma olhada nas opções e me avise suas preferências.\n\nPodemos começar a fazer os preparativos para garantir uma viagem tranquila e agradável.\n\nAnimada com suas ideias! Olivia",
    receivedAt: daysAgo(12),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["pessoal"],
  },
  {
    id: "de305d54-75b4-431b-adb2-eb6b9e546014",
    accountId: 2,
    from: {
      name: "James Martin",
      email: "jamesmartin@example.com",
    },
    to: [weblabsStudio],
    subject: "Re: Inscrição na Conferência",
    body: "Concluí a inscrição para a conferência do próximo mês. O evento promete ser uma ótima oportunidade de networking, e estou ansioso para participar das diversas sessões e me conectar com especialistas do setor.\n\nTambém anexei a programação da conferência para sua referência.\n\nSe houver tópicos ou sessões específicos que gostaria que eu explorasse, por favor, me avise. É um evento empolgante, e vou aproveitá-lo ao máximo.\n\nAtenciosamente, James",
    receivedAt: daysAgo(18),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["trabalho", "conferência"],
    attachments: [
      {
        id: "conference-schedule-png",
        name: "conference-schedule.png",
        size: "860 KB",
        icon: siGooglephotos,
      },
    ],
  },
  {
    id: "7dd90c63-00f6-40f3-bd87-5060a24e8ee7",
    accountId: 1,
    from: {
      name: "Sophia White",
      email: "sophiawhite@example.com",
    },
    to: [matheusMoraes],
    subject: "Jantar da Equipe",
    body: "Vamos fazer um jantar da equipe na próxima semana para celebrar nosso sucesso. Alcançamos marcos significativos, e é hora de reconhecer nosso trabalho duro e dedicação.\n\nFiz reservas em um restaurante encantador, e tenho certeza de que será uma noite agradável.\n\nPor favor, confirme sua disponibilidade e quaisquer preferências alimentares. Ansiosa por um jantar divertido e memorável com a equipe!\n\nAbraços, Sophia",
    receivedAt: daysAgo(24),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["reunião", "trabalho"],
  },
  {
    id: "99a88f78-3eb4-4d87-87b7-7b15a49a0a05",
    accountId: 2,
    from: {
      name: "Daniel Johnson",
      email: "danieljohnson@example.com",
    },
    to: [weblabsStudio],
    subject: "Solicitação de Feedback",
    body: "Gostaria do seu feedback sobre os últimos entregáveis do projeto. Fizemos progresso significativo, e valorizo sua contribuição para garantir que estamos no caminho certo.\n\nAnexei os entregáveis para sua análise, e estou particularmente interessado em áreas onde você acha que podemos melhorar ainda mais a qualidade ou eficiência.\n\nSeu feedback é inestimável, e agradeço seu tempo e experiência. Vamos trabalhar juntos para tornar este projeto um sucesso.\n\nAtenciosamente, Daniel",
    receivedAt: daysAgo(31),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["trabalho"],
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    accountId: 1,
    from: {
      name: "Ava Taylor",
      email: "avataylor@example.com",
    },
    to: [matheusMoraes],
    subject: "Re: Pauta da Reunião",
    body: "Aqui está a pauta para nossa reunião da próxima semana. Incluí todos os tópicos que precisamos cobrir, bem como as alocações de tempo para cada um.\n\nSe tiver itens adicionais para discutir ou pontos específicos a abordar, por favor, me avise, e podemos integrá-los à pauta.\n\nÉ essencial que nossa reunião seja produtiva e aborde todos os assuntos relevantes.\n\nAnsiosa pela nossa reunião! Ava",
    receivedAt: daysAgo(45),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["reunião", "trabalho"],
  },
  {
    id: "c1a0ecb4-2540-49c5-86f8-21e5ce79e4e6",
    accountId: 2,
    from: {
      name: "William Anderson",
      email: "williamanderson@example.com",
    },
    to: [weblabsStudio],
    subject: "Atualização do Lançamento do Produto",
    body: "O lançamento do produto está no caminho certo. Fornecerei uma atualização durante a nossa chamada. Fizemos progresso substancial no desenvolvimento e marketing do nosso novo produto.\n\nEstou animado para compartilhar as últimas atualizações com você durante a nossa próxima chamada. É fundamental que coordenemos nossos esforços para garantir um lançamento bem-sucedido. Por favor, venha preparado com quaisquer perguntas ou ideias que possa ter.\n\nVamos tornar este lançamento de produto um sucesso retumbante!\n\nAtenciosamente, William",
    receivedAt: daysAgo(62),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["reunião", "trabalho", "importante"],
  },
  {
    id: "ba54eefd-4097-4949-99f2-2a9ae4d1a836",
    accountId: 1,
    from: {
      name: "Mia Harris",
      email: "miaharris@example.com",
    },
    to: [matheusMoraes],
    subject: "Re: Itinerário de Viagem",
    body: "Recebi o itinerário de viagem. Está ótimo! Obrigado pela pronta assistência nos arranjos dos detalhes. Revisei a programação e as acomodações, e tudo parece estar em ordem. Estou ansioso pela viagem, e tenho certeza de que será uma experiência tranquila e agradável.\n\nSe houver atividades ou atrações específicas que você recomenda no nosso destino, por favor, sinta-se à vontade para compartilhar suas sugestões.\n\nAnimado para a viagem! Mia",
    receivedAt: daysAgo(75),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["pessoal", "viagem"],
  },
  {
    id: "df09b6ed-28bd-4e0c-85a9-9320ec5179aa",
    accountId: 2,
    from: {
      name: "Ethan Clark",
      email: "ethanclark@example.com",
    },
    to: [weblabsStudio],
    subject: "Evento de Integração da Equipe",
    body: "Vamos planejar um evento de integração para o nosso departamento. A coesão e a moral da equipe são vitais para o nosso sucesso, e acredito que um evento de integração bem organizado pode ser incrivelmente benéfico. Fiz algumas pesquisas e tenho algumas ideias para atividades divertidas e envolventes.\n\nPor favor, me avise suas ideias e disponibilidade. Queremos que este evento seja tanto agradável quanto produtivo.\n\nJuntos, fortaleceremos nossa equipe e aumentaremos nosso desempenho.\n\nAtenciosamente, Ethan",
    receivedAt: daysAgo(92),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["reunião", "trabalho"],
  },
  {
    id: "d67c1842-7f8b-4b4b-9be1-1b3b1ab4611d",
    accountId: 1,
    from: {
      name: "Chloe Hall",
      email: "chloehall@example.com",
    },
    to: [matheusMoraes],
    subject: "Re: Aprovação do Orçamento",
    body: "O orçamento foi aprovado. Podemos prosseguir com o projeto. Tenho o prazer de informar que nossa proposta de orçamento recebeu o aval do departamento financeiro. Este é um marco significativo, e significa que podemos avançar com o projeto conforme planejado.\n\nAnexei o orçamento finalizado para sua referência. Vamos garantir que mantenhamos o rumo e entregue o projeto no prazo e dentro do orçamento.\n\nÉ um momento empolgante para nós! Chloe",
    receivedAt: daysAgo(118),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["trabalho", "orçamento"],
  },
  {
    id: "6c9a7f94-8329-4d70-95d3-51f68c186ae1",
    accountId: 2,
    from: {
      name: "Samuel Turner",
      email: "samuelturner@example.com",
    },
    to: [weblabsStudio],
    subject: "Caminhada no Fim de Semana",
    body: "Quem topa uma caminhada nas montanhas no fim de semana? Estou com vontade de uma aventura ao ar livre, e uma caminhada nas montanhas parece ser a escapada perfeita. Se estiver disposto ao desafio, podemos explorar algumas trilhas cênicas e aproveitar a beleza da natureza.\n\nFiz algumas pesquisas e tenho algumas rotas em mente.\n\nMe avise se estiver interessado, e podemos planejar os detalhes.\n\nCertamente será uma experiência memorável! Samuel",
    receivedAt: daysAgo(145),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["pessoal"],
  },
];

export const mailNavigation: MailNavigation = {
  navMain: [
    {
      id: "inbox",
      title: "Caixa de Entrada",
      label: "18",
      icon: Inbox,
      isActive: true,
    },
    {
      id: "priority",
      title: "Prioridade",
      label: "3",
      icon: Star,
      isActive: false,
    },
  ],
  folders: [
    {
      id: "drafts",
      title: "Rascunhos",
      label: "9",
      icon: File,
      isActive: false,
    },
    {
      id: "sent",
      title: "Enviados",
      icon: Send,
      isActive: false,
    },
    {
      id: "archive",
      title: "Arquivo",
      icon: Archive,
      isActive: false,
    },
    {
      id: "trash",
      title: "Lixeira",
      icon: Trash2,
      isActive: false,
    },
  ],
  navFooter: [
    {
      id: "help-feedback",
      title: "Ajuda e feedback",
      icon: CircleHelp,
      isActive: false,
    },
    {
      id: "keyboard-shortcuts",
      title: "Atalhos de teclado",
      icon: Keyboard,
      isActive: false,
    },
  ],
};

export const accounts = [
  {
    id: 1,
    label: "Matheus Moraes",
    email: "admin@bcrm.com",
  },
  {
    id: 2,
    label: "Weblabs Studio",
    email: "contact@weblabs.studio",
  },
];
