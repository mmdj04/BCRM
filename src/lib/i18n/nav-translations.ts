import type { Locale } from "./config";

export const navTranslations = {
  "pt-BR": {
    groups: { Dashboards: "Dashboards", Pages: "Páginas", Legacy: "Legado", Misc: "Diversos" },
    items: {
      Default: "Padrão", CRM: "CRM", Finance: "Finanças", Analytics: "Análises", Productivity: "Produtividade",
      "E-commerce": "E-commerce", Academy: "Academia", Logistics: "Logística", Infrastructure: "Infraestrutura",
      "File Manager": "Gerenciador de arquivos", "Patient Monitoring": "Monitoramento de pacientes", Email: "E-mail",
      Chat: "Chat", Calendar: "Calendário", Kanban: "Kanban", Tasks: "Tarefas", Invoice: "Fatura", Profile: "Perfil",
      Users: "Usuários", Roles: "Funções", Authentication: "Autenticação", "Login v1": "Login v1", "Login v2": "Login v2",
      "Register v1": "Cadastro v1", "Register v2": "Cadastro v2", "Default V1": "Padrão V1", "CRM V1": "CRM V1",
      "Finance V1": "Finanças V1", "Analytics V1": "Análises V1", Others: "Outros",
    },
    quickCreate: "Criação rápida", inbox: "Caixa de entrada", new: "novo", soon: "em breve",
    account: "Conta", billing: "Cobrança", notifications: "Notificações", logout: "Sair",
    supportTitle: "Tem algo em mente?", supportBefore: "Sugira um recurso ou converse comigo sobre um trabalho personalizado pelo",
    supportBetween: "ou por", email: "e-mail", reachOut: "Entre em contato pelo X",
  },
  "en-US": {
    groups: { Dashboards: "Dashboards", Pages: "Pages", Legacy: "Legacy", Misc: "Misc" },
    items: {
      Default: "Default", CRM: "CRM", Finance: "Finance", Analytics: "Analytics", Productivity: "Productivity",
      "E-commerce": "E-commerce", Academy: "Academy", Logistics: "Logistics", Infrastructure: "Infrastructure",
      "File Manager": "File Manager", "Patient Monitoring": "Patient Monitoring", Email: "Email", Chat: "Chat",
      Calendar: "Calendar", Kanban: "Kanban", Tasks: "Tasks", Invoice: "Invoice", Profile: "Profile", Users: "Users",
      Roles: "Roles", Authentication: "Authentication", "Login v1": "Login v1", "Login v2": "Login v2",
      "Register v1": "Register v1", "Register v2": "Register v2", "Default V1": "Default V1", "CRM V1": "CRM V1",
      "Finance V1": "Finance V1", "Analytics V1": "Analytics V1", Others: "Others",
    },
    quickCreate: "Quick Create", inbox: "Inbox", new: "new", soon: "soon", account: "Account", billing: "Billing",
    notifications: "Notifications", logout: "Log out", supportTitle: "Have something in mind?",
    supportBefore: "Suggest a feature or discuss custom work with me on", supportBetween: "or by", email: "email",
    reachOut: "Reach out on X",
  },
} satisfies Record<Locale, unknown>;

export type NavTranslationSchema = typeof navTranslations["pt-BR"];
