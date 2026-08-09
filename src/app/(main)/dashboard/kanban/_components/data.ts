import type { BoardState, Column, TaskOwnerProfile, TaskTeam } from "./types";

export const columns = [
  { id: "ideas", title: "Ideias" },
  { id: "planned", title: "Planejado" },
  { id: "building", title: "Em construção" },
  { id: "qa", title: "QA" },
  { id: "shipped", title: "Entregue" },
] as const satisfies readonly Column[];

export const columnIds = columns.map((column) => column.id);

export const tagTones: Record<TaskTeam, string> = {
  Backend: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Dados: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Design: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  Documentação: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  "Operações Financeiras": "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  Plataforma: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  Produto: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  QA: "bg-red-500/10 text-red-700 dark:text-red-300",
  Segurança: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

const taskOwners = {
  arham: {
    name: "Matheus Moraes",
    tone: "[&_[data-slot=avatar-fallback]]:bg-zinc-100 [&_[data-slot=avatar-fallback]]:text-zinc-700 after:border-zinc-200 dark:[&_[data-slot=avatar-fallback]]:bg-zinc-500/15 dark:[&_[data-slot=avatar-fallback]]:text-zinc-300 dark:after:border-zinc-500/20",
  },
  junaid: {
    name: "Ethan Brooks",
    tone: "[&_[data-slot=avatar-fallback]]:bg-lime-100 [&_[data-slot=avatar-fallback]]:text-lime-700 after:border-lime-200 dark:[&_[data-slot=avatar-fallback]]:bg-lime-500/15 dark:[&_[data-slot=avatar-fallback]]:text-lime-300 dark:after:border-lime-500/20",
  },
  maya: {
    name: "Hannah Reed",
    tone: "[&_[data-slot=avatar-fallback]]:bg-indigo-100 [&_[data-slot=avatar-fallback]]:text-indigo-700 after:border-indigo-200 dark:[&_[data-slot=avatar-fallback]]:bg-indigo-500/15 dark:[&_[data-slot=avatar-fallback]]:text-indigo-300 dark:after:border-indigo-500/20",
  },
  meera: {
    name: "Rohan Iyer",
    tone: "[&_[data-slot=avatar-fallback]]:bg-fuchsia-100 [&_[data-slot=avatar-fallback]]:text-fuchsia-700 after:border-fuchsia-200 dark:[&_[data-slot=avatar-fallback]]:bg-fuchsia-500/15 dark:[&_[data-slot=avatar-fallback]]:text-fuchsia-300 dark:after:border-fuchsia-500/20",
  },
  nisha: {
    name: "Nora Bennett",
    tone: "[&_[data-slot=avatar-fallback]]:bg-violet-100 [&_[data-slot=avatar-fallback]]:text-violet-700 after:border-violet-200 dark:[&_[data-slot=avatar-fallback]]:bg-violet-500/15 dark:[&_[data-slot=avatar-fallback]]:text-violet-300 dark:after:border-violet-500/20",
  },
  rahul: {
    name: "Vikram Menon",
    tone: "[&_[data-slot=avatar-fallback]]:bg-pink-100 [&_[data-slot=avatar-fallback]]:text-pink-700 after:border-pink-200 dark:[&_[data-slot=avatar-fallback]]:bg-pink-500/15 dark:[&_[data-slot=avatar-fallback]]:text-pink-300 dark:after:border-pink-500/20",
  },
  sara: {
    name: "Clara Hughes",
    tone: "[&_[data-slot=avatar-fallback]]:bg-sky-100 [&_[data-slot=avatar-fallback]]:text-sky-700 after:border-sky-200 dark:[&_[data-slot=avatar-fallback]]:bg-sky-500/15 dark:[&_[data-slot=avatar-fallback]]:text-sky-300 dark:after:border-sky-500/20",
  },
} satisfies Record<string, TaskOwnerProfile>;

export const initialBoard: BoardState = {
  ideas: [
    {
      id: "tender-workflow-map",
      title: "Mapa de fluxo de licitação",
      description: "Modelar Licitação, Adjudicação/L1, Ordem de Serviço, alocação, salário e documentos.",
      priority: "Alta",
      dueDate: "14 de jun.",
      progress: 10,
      owner: taskOwners.arham,
      team: "Produto",
      insights: [
        { label: "Comentários", count: 7 },
        { label: "Documentos", count: 3 },
      ],
    },
    {
      id: "license-strategy-research",
      title: "Pesquisa de estratégia de licença",
      description: "Comparar MVP privado, open core, GPL, AGPL e módulos comerciais.",
      priority: "Média",
      dueDate: "16 de jun.",
      progress: 20,
      owner: taskOwners.rahul,
      team: "Operações Financeiras",
      insights: [
        { label: "Anexos", count: 2 },
        { label: "Comentários", count: 5 },
      ],
    },
    {
      id: "backup-restore-plan",
      title: "Plano de backup e restauração",
      description: "Definir backup de banco de dados local, restauração e recuperação de documentos exportados.",
      priority: "Média",
      dueDate: "18 de jun.",
      progress: 15,
      owner: taskOwners.maya,
      team: "Plataforma",
      insights: [
        { label: "Anexos", count: 1 },
        { label: "Comentários", count: 4 },
      ],
    },
    {
      id: "work-order-allocation-model",
      title: "Modelo de alocação de ordens de serviço",
      description:
        "Esboçar como ordens de serviço adjudicadas se conectam a alocações de funcionários e meses de salário.",
      priority: "Média",
      dueDate: "19 de jun.",
      progress: 5,
      owner: taskOwners.meera,
      team: "Produto",
      insights: [
        { label: "Comentários", count: 3 },
        { label: "Documentos", count: 1 },
      ],
    },
    {
      id: "future-sync-notes",
      title: "Notas de sincronização futura",
      description:
        "Capturar premissas de sincronização local-first antes de decidir sobre PostgreSQL em nuvem e armazenamento de arquivos.",
      priority: "Baixa",
      dueDate: "21 de jun.",
      progress: 0,
      owner: taskOwners.arham,
      team: "Plataforma",
      insights: [{ label: "Comentários", count: 2 }],
    },
  ],
  planned: [
    {
      id: "electron-app-shell",
      title: "Shell do aplicativo Electron",
      description: "Criar shell desktop local-first com React, Tailwind e shadcn/ui.",
      priority: "Alta",
      dueDate: "20 de jun.",
      progress: 25,
      owner: taskOwners.arham,
      team: "Plataforma",
      insights: [
        { label: "Anexos", count: 4 },
        { label: "Comentários", count: 9 },
        { label: "Documentos", count: 2 },
      ],
    },
    {
      id: "secure-preload-api",
      title: "API de pré-carregamento segura",
      description: "Expor métodos seguros para o renderer para importações, registros, PDFs e backups.",
      priority: "Alta",
      dueDate: "22 de jun.",
      progress: 20,
      owner: taskOwners.nisha,
      team: "Backend",
      insights: [
        { label: "Anexos", count: 2 },
        { label: "Comentários", count: 6 },
        { label: "Documentos", count: 1 },
      ],
    },
    {
      id: "party-employee-records",
      title: "Registros de partes e funcionários",
      description: "Criar registros locais para clientes, contratados, funcionários e identificadores.",
      priority: "Média",
      dueDate: "24 de jun.",
      progress: 15,
      owner: taskOwners.meera,
      team: "Produto",
      insights: [
        { label: "Comentários", count: 5 },
        { label: "Documentos", count: 2 },
      ],
    },
    {
      id: "generated-documents-index",
      title: "Índice de documentos gerados",
      description: "Planejar filtros para PDFs gerados por parte, mês de salário, funcionário e lote de importação.",
      priority: "Média",
      dueDate: "25 de jun.",
      progress: 10,
      owner: taskOwners.maya,
      team: "Documentação",
      insights: [
        { label: "Anexos", count: 2 },
        { label: "Comentários", count: 4 },
      ],
    },
  ],
  building: [
    {
      id: "sqlite-drizzle-schema",
      title: "Esquema SQLite e Drizzle",
      description: "Modelar partes, funcionários, licitações, ordens de serviço, importações de salário e documentos.",
      priority: "Alta",
      dueDate: "26 de jun.",
      progress: 65,
      owner: taskOwners.arham,
      team: "Dados",
      insights: [
        { label: "Anexos", count: 5 },
        { label: "Comentários", count: 11 },
        { label: "Documentos", count: 4 },
      ],
    },
    {
      id: "salary-excel-import",
      title: "Importação de planilha de salários",
      description: "Ler planilhas de salário com SheetJS e persistir lotes de importação localmente.",
      priority: "Alta",
      dueDate: "28 de jun.",
      progress: 45,
      owner: taskOwners.junaid,
      team: "Dados",
      insights: [
        { label: "Anexos", count: 3 },
        { label: "Comentários", count: 8 },
        { label: "Documentos", count: 2 },
      ],
    },
    {
      id: "column-mapping-builder",
      title: "Construtor de mapeamento de colunas",
      description: "Mapear colunas Excel para campos de salário com modelos reutilizáveis por parte.",
      priority: "Média",
      dueDate: "1 de jul.",
      progress: 30,
      owner: taskOwners.sara,
      team: "Design",
      insights: [
        { label: "Comentários", count: 6 },
        { label: "Documentos", count: 2 },
      ],
    },
  ],
  qa: [
    {
      id: "salary-row-validation",
      title: "Validação de linha de salário",
      description: "Marcar IDs de funcionários faltantes, valores inválidos, linhas duplicadas e campos não mapeados.",
      priority: "Alta",
      dueDate: "4 de jul.",
      progress: 75,
      owner: taskOwners.nisha,
      team: "QA",
      insights: [
        { label: "Anexos", count: 4 },
        { label: "Comentários", count: 10 },
      ],
    },
    {
      id: "payslip-preview",
      title: "Pré-visualização de holerite",
      description: "Pré-visualizar holerites gerados antes da exportação em massa de PDFs e histórico de documentos.",
      priority: "Média",
      dueDate: "6 de jul.",
      progress: 60,
      owner: taskOwners.junaid,
      team: "Operações Financeiras",
      insights: [
        { label: "Anexos", count: 3 },
        { label: "Comentários", count: 7 },
        { label: "Documentos", count: 3 },
      ],
    },
  ],
  shipped: [
    {
      id: "architecture-rule",
      title: "Regra de arquitetura bloqueada",
      description:
        "Renderer permanece apenas UI; pré-carregamento, IPC, serviços e banco de dados permanecem separados.",
      priority: "Alta",
      dueDate: "8 de jun.",
      progress: 100,
      owner: taskOwners.arham,
      team: "Backend",
      insights: [
        { label: "Comentários", count: 6 },
        { label: "Documentos", count: 3 },
      ],
    },
    {
      id: "private-mvp-scope",
      title: "Escopo do MVP privado",
      description:
        "Iniciar com fonte privada primeiro, depois revisitar open-core após validação do fluxo de trabalho.",
      priority: "Média",
      dueDate: "10 de jun.",
      progress: 100,
      owner: taskOwners.rahul,
      team: "Operações Financeiras",
      insights: [
        { label: "Anexos", count: 2 },
        { label: "Comentários", count: 4 },
      ],
    },
    {
      id: "mvp-module-priorities",
      title: "Prioridades dos módulos MVP",
      description:
        "Geração de holerite é prioridade, mas o modelo de dados suporta operações de licitação mais amplas.",
      priority: "Média",
      dueDate: "12 de jun.",
      progress: 100,
      owner: taskOwners.meera,
      team: "Operações Financeiras",
      insights: [
        { label: "Comentários", count: 5 },
        { label: "Documentos", count: 2 },
      ],
    },
  ],
};
