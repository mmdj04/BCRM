"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  Shield,
  Smartphone,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSetup } from "@/contexts/setup-context";

const moduleLabels: Record<string, string> = {
  crm: "CRM",
  finance: "Finanças",
  analytics: "Análises",
  productivity: "Produtividade",
  ecommerce: "Comércio Eletrônico",
  academy: "Academia",
  logistics: "Logística",
  infrastructure: "Infraestrutura",
  fileManager: "Gerenciador de Arquivos",
  patientMonitoring: "Monitoramento de Pacientes",
  email: "E-mail",
  chat: "Chat",
  calendar: "Calendário",
  kanban: "Kanban",
  tasks: "Tarefas",
  invoice: "Fatura",
  users: "Usuários",
  roles: "Funções",
};

const paymentLabels: Record<string, string> = {
  stripe: "Stripe",
  pix: "PIX",
  boleto: "Boleto Bancário",
  creditCard: "Cartão de Crédito (Brasil)",
  bankTransfer: "Transferência Bancária",
};

const notificationLabels: Record<string, string> = {
  email: "Notificações por E-mail",
  whatsapp: "Notificações por WhatsApp",
  push: "Notificações Push",
  weeklyReport: "Relatório Semanal",
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 789,90",
    period: "/mês",
    description: "Para pequenas equipes começando",
    features: ["Até 5 usuários", "3 módulos", "Suporte por e-mail", "1 GB de armazenamento"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 1.889,90",
    period: "/mês",
    description: "Para equipes em crescimento",
    features: ["Até 25 usuários", "Todos os módulos", "Suporte prioritário", "10 GB de armazenamento", "Relatórios avançados"],
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: "R$ 7.989,90",
    period: "/mês",
    description: "Para organizações grandes",
    features: ["Usuários ilimitados", "Todos os módulos", "Suporte 24/7", "Armazenamento ilimitado", "API completa", "SSO/SAML"],
  },
];

const countries = [
  "Afeganistão",
  "Albânia",
  "Alemanha",
  "Angola",
  "Anguila",
  "Antígua e Barbuda",
  "Arábia Saudita",
  "Argélia",
  "Argentina",
  "Armênia",
  "Aruba",
  "Austrália",
  "Áustria",
  "Azerbaijão",
  "Bahamas",
  "Bahrein",
  "Bangladesh",
  "Barbados",
  "Bélgica",
  "Benim",
  "Bermudas",
  "Bielorrússia",
  "Bolívia",
  "Bósnia e Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunei",
  "Bulgária",
  "Burkina Faso",
  "Burundi",
  "Butão",
  "Cabo Verde",
  "Camarões",
  "Camboja",
  "Canadá",
  "Catar",
  "Cazaquistão",
  "Chade",
  "Chile",
  "China",
  "Chipre",
  "Colômbia",
  "Comores",
  "Congo",
  "Costa do Marfim",
  "Costa Rica",
  "Croácia",
  "Cuba",
  "Curaçao",
  "Dinamarca",
  "Djibuti",
  "Dominica",
  "Egito",
  "El Salvador",
  "Emirados Árabes Unidos",
  "Equador",
  "Eritreia",
  "Eslováquia",
  "Eslovênia",
  "Espanha",
  "Estados Unidos",
  "Estônia",
  "Eswatini",
  "Etiópia",
  "Fiji",
  "Filipinas",
  "Finlândia",
  "França",
  "Gabão",
  "Gâmbia",
  "Gana",
  "Geórgia",
  "Gibraltar",
  "Granada",
  "Grécia",
  "Guadalupe",
  "Guatemala",
  "Guernsey",
  "Guiana",
  "Guiné",
  "Guiné-Bissau",
  "Guiné Equatorial",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungria",
  "Ilha de Man",
  "Ilhas Cayman",
  "Ilhas Cook",
  "Ilhas Marshall",
  "Ilhas Salomão",
  "Ilhas Virgens",
  "Índia",
  "Indonésia",
  "Irlanda",
  "Islândia",
  "Israel",
  "Itália",
  "Jamaica",
  "Japão",
  "Jersey",
  "Jordânia",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Laos",
  "Letônia",
  "Líbano",
  "Libéria",
  "Líbia",
  "Liechtenstein",
  "Lituânia",
  "Luxemburgo",
  "Macau",
  "Macedônia do Norte",
  "Madagascar",
  "Malásia",
  "Malawi",
  "Maldivas",
  "Mali",
  "Malta",
  "Marrocos",
  "Martinica",
  "Maurício",
  "Mauritânia",
  "Mayotte",
  "México",
  "Micronésia",
  "Moçambique",
  "Moldávia",
  "Mônaco",
  "Mongólia",
  "Montenegro",
  "Montserrat",
  "Moçambique",
  "Myanmar",
  "Namíbia",
  "Nauru",
  "Nepal",
  "Nicarágua",
  "Níger",
  "Nigéria",
  "Niue",
  "Noruega",
  "Nova Caledônia",
  "Nova Zelândia",
  "Omã",
  "Palau",
  "Panamá",
  "Papua-Nova Guiné",
  "Paquistão",
  "Paraguai",
  "Peru",
  "Polinésia Francesa",
  "Polônia",
  "Porto Rico",
  "Portugal",
  "Quênia",
  "Quirguistão",
  "Quiribati",
  "Reino Unido",
  "República Centro-Africana",
  "República Democrática do Congo",
  "República Dominicana",
  "Reunião",
  "Romênia",
  "Ruanda",
  "Rússia",
  "Saara Ocidental",
  "Saint Martin",
  "Samoa",
  "San Marino",
  "Santa Lúcia",
  "São Bartolomeu",
  "São Cristóvão e Neves",
  "São Martinho",
  "São Pedro e Miquelon",
  "São Tomé e Príncipe",
  "São Vicente e Granadinas",
  "Senegal",
  "Sérvia",
  "Seychelles",
  "Serra Leoa",
  "Singapura",
  "Síria",
  "Somália",
  "Sri Lanka",
  "Suazilândia",
  "Sudão",
  "Sudão do Sul",
  "Suécia",
  "Suíça",
  "Suriname",
  "Tailândia",
  "Taiwan",
  "Tajiquistão",
  "Tanzânia",
  "Território Britânico do Oceano Índico",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trindade e Tobago",
  "Tunísia",
  "Turcomenistão",
  "Turquia",
  "Tuvalu",
  "Ucrânia",
  "Uganda",
  "Uruguai",
  "Uzbequistão",
  "Vanuatu",
  "Venezuela",
  "Vietnã",
  "Wallis e Futuna",
  "Zâmbia",
  "Zimbábue",
];

function VisaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M19.5 21H17L19.5 11H22L19.5 21Z" fill="white" />
      <path d="M28 11L25.5 21H23L21 14L20 11H16L19.5 21H22L25.5 11H28Z" fill="white" />
      <path d="M33 11L30.5 21H28L30.5 11H33Z" fill="white" />
      <path d="M38 11L34 21H31.5L31 19H28L27.5 21H25L28.5 11H33L38 11Z" fill="#F7B600" />
      <path d="M15 11L12 19L11.5 17L11 15C10.5 13.5 9 11 6 11H1.5L1.5 11.5C4.5 12.5 9 14.5 11 17L10 11H15Z" fill="white" />
    </svg>
  );
}

function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="19" cy="16" r="9" fill="#EB001B" />
      <circle cx="29" cy="16" r="9" fill="#F79E1B" />
      <path d="M24 9.5C25.8 10.8 27 12.8 27 15C27 17.2 25.8 19.2 24 20.5C22.2 19.2 21 17.2 21 15C21 12.8 22.2 10.8 24 9.5Z" fill="#FF5F00" />
    </svg>
  );
}

function EloIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#0052A5" />
      <ellipse cx="24" cy="16" rx="14" ry="8" fill="white" />
      <ellipse cx="24" cy="16" rx="10" ry="5.5" fill="#0052A5" />
      <ellipse cx="24" cy="16" rx="6" ry="3" fill="#FFB300" />
      <text x="24" y="18" textAnchor="middle" fontSize="5" fontWeight="bold" fill="white">elo</text>
    </svg>
  );
}

function AmexIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#006FCF" />
      <text x="24" y="19" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">AMEX</text>
    </svg>
  );
}

function HipercardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#CC0000" />
      <text x="24" y="19" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white">hiper</text>
    </svg>
  );
}

function PixIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00BFA5" />
      <path d="M2 17L12 22L22 17" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoletoIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const enabledModules = Object.entries(setupData.modules).filter(([_, v]) => v).map(([k]) => k);
  const disabledModules = Object.entries(setupData.modules).filter(([_, v]) => !v).map(([k]) => k);
  const enabledPayments = Object.entries(setupData.payment).filter(([_, v]) => v).map(([k]) => k);
  const enabledNotifications = Object.entries(setupData.notifications).filter(([_, v]) => v).map(([k]) => k);
  const disabledNotifications = Object.entries(setupData.notifications).filter(([_, v]) => !v).map(([k]) => k);

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((f) => setTimeout(f, 2000));
    setProcessing(false);
    setPaymentComplete(true);
    setPaymentDialogOpen(false);
  };

  const handleComplete = () => completeSetup();

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;

  const isCardFormValid = cardName && cardNumber && cardExpiry && cardCvc && address && city && zipCode;

  return (
    <>
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="size-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Configuração Completa!</CardTitle>
          <CardDescription>Revise todas as configurações antes de começar.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Accordion type="multiple" className="w-full" defaultValue={[]}>
            {/* Empresa */}
            <AccordionItem value="company">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Dados da Empresa</span>
                  {setupData.company.name ? <CheckCircle2 className="size-3.5 text-green-600" /> : <X className="size-3.5 text-muted-foreground" />}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-sm">
                  <p><strong>Nome:</strong> {fmt(setupData.company.name, "Não informado")}</p>
                  <p><strong>CNPJ:</strong> {fmt(setupData.company.cnpj, "Não informado")}</p>
                  <p><strong>Descrição:</strong> {fmt(setupData.company.description, "Não informada")}</p>
                  <p><strong>Website:</strong> {fmt(setupData.company.website, "Não informado")}</p>
                  <p><strong>Setor:</strong> {fmt(setupData.company.industry, "Não selecionado")}</p>
                  <p><strong>Tamanho:</strong> {fmt(setupData.company.size, "Não selecionado")}</p>
                  <p><strong>Cidade:</strong> {fmt(setupData.company.city, "Não informada")}{setupData.company.state ? ` - ${setupData.company.state}` : ""}</p>
                  <p><strong>Endereço:</strong> {fmt(setupData.company.address, "Não informado")}</p>
                  <p><strong>Telefone:</strong> {fmt(setupData.company.phone, "Não informado")}</p>
                  <p><strong>E-mail:</strong> {fmt(setupData.company.email, "Não informado")}</p>
                  <p><strong>Fuso horário:</strong> {setupData.company.timezone === "America/Sao_Paulo" ? "Horário de Brasília" : fmt(setupData.company.timezone, "Não selecionado")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Projeto */}
            <AccordionItem value="project">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Globe className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Configurações do Projeto</span>
                  <CheckCircle2 className="size-3.5 text-green-600" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-sm">
                  <p><strong>Nome:</strong> {setupData.project.name || "BCRM"}</p>
                  <p><strong>URL:</strong> {fmt(setupData.project.url, "Não configurada")}</p>
                  <p><strong>Domínio personalizado:</strong> {fmt(setupData.project.customDomain, "Não configurado")}</p>
                  <p><strong>Logo:</strong> {fmt(setupData.project.logo, "Não configurada")}</p>
                  <p><strong>Descrição:</strong> {fmt(setupData.project.description, "Não informada")}</p>
                  <p><strong>Idioma:</strong> {setupData.project.language === "pt-BR" ? "Português (Brasil)" : setupData.project.language || "Não selecionado"}</p>
                  <p><strong>Tema:</strong> {setupData.project.theme === "light" ? "Claro" : setupData.project.theme === "dark" ? "Escuro" : "Sistema"}</p>
                  <p><strong>Modo:</strong> {setupData.project.mode === "production" ? "Produção" : "Desenvolvimento"}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Módulos */}
            <AccordionItem value="modules">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Módulos</span>
                  <Badge variant="secondary" className="ml-1 text-xs">{enabledModules.length} ativados</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">ATIVADOS ({enabledModules.length})</p>
                    {enabledModules.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {enabledModules.map((mod) => (
                          <span key={mod} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">{moduleLabels[mod]}</span>
                        ))}
                      </div>
                    ) : <p className="text-muted-foreground text-xs">Nenhum módulo ativado.</p>}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-muted-foreground text-xs">DESATIVADOS ({disabledModules.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledModules.map((mod) => (
                        <span key={mod} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">{moduleLabels[mod]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pagamento */}
            <AccordionItem value="payment-methods">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Banknote className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Formas de Pagamento Aceitas</span>
                  <Badge variant="secondary" className="ml-1 text-xs">{enabledPayments.length} métodos</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-2 rounded-lg border p-3">
                  {enabledPayments.length > 0 ? (
                    enabledPayments.map((pay) => (
                      <div key={pay} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-3.5 text-green-600" />
                        <span>{paymentLabels[pay]}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Nenhum método configurado.</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Usuários e Equipes */}
            <AccordionItem value="users">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Usuários e Equipes</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {setupData.users.length} usuários, {setupData.teams.length} equipes
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Equipes ({setupData.teams.length})</p>
                    {setupData.teams.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {setupData.teams.map((team, i) => (
                          <span key={`${team.name}-${i}`} className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                            <span className={`size-2 rounded-full ${team.color || "bg-blue-500"}`} />
                            {team.name}
                          </span>
                        ))}
                      </div>
                    ) : <p className="text-muted-foreground text-xs">Nenhuma equipe criada.</p>}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Usuários ({setupData.users.length})</p>
                    {setupData.users.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {setupData.users.map((user, i) => (
                          <div key={`${user.email}-${i}`} className="flex items-center justify-between text-sm">
                            <span>{user.name} ({user.email})</span>
                            <div className="flex items-center gap-1.5">
                              {user.team && <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">{user.team}</span>}
                              <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{user.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-muted-foreground text-xs">Nenhum usuário adicionado.</p>}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Funções Personalizadas ({setupData.customRoles.length})</p>
                    {setupData.customRoles.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {setupData.customRoles.map((role, i) => (
                          <span key={`${role.name}-${i}`} className="rounded bg-purple-50 px-2 py-0.5 text-purple-700 text-xs dark:bg-purple-950 dark:text-purple-300">{role.name}</span>
                        ))}
                      </div>
                    ) : <p className="text-muted-foreground text-xs">Nenhuma função personalizada criada.</p>}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Notificações */}
            <AccordionItem value="notifications">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Smartphone className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Notificações</span>
                  <Badge variant="secondary" className="ml-1 text-xs">{enabledNotifications.length} ativas</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">ATIVAS ({enabledNotifications.length})</p>
                    {enabledNotifications.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {enabledNotifications.map((notif) => (
                          <span key={notif} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">{notificationLabels[notif]}</span>
                        ))}
                      </div>
                    ) : <p className="text-muted-foreground text-xs">Nenhuma notificação ativada.</p>}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-muted-foreground text-xs">INATIVAS ({disabledNotifications.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledNotifications.map((notif) => (
                        <span key={notif} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">{notificationLabels[notif]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Seleção de Plano */}
          <div className="mt-2">
            <h3 className="mb-3 font-semibold text-base">Selecione seu Plano</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
                    selectedPlan === plan.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-muted-foreground/50"
                  } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
                >
                  {plan.popular && <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">Mais Popular</span>}
                  <span className="font-semibold text-base">{plan.name}</span>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="font-bold text-xl">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="size-3 shrink-0 text-green-600" /><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Botão de Pagamento */}
          {!paymentComplete ? (
            <div className="mt-2">
              <Button
                onClick={() => setPaymentDialogOpen(true)}
                size="lg"
                className="w-full"
              >
                <CreditCard className="mr-2 size-4" />
                Confirmar Plano {selectedPlanData?.name} ({selectedPlanData?.price}{selectedPlanData?.period})
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="size-12 text-green-600" />
              <div className="text-center">
                <p className="font-semibold text-green-800 text-lg dark:text-green-200">Pagamento Aprovado!</p>
                <p className="text-green-700 text-sm dark:text-green-300">Plano {selectedPlanData?.name} ativado com sucesso.</p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(6)}>Voltar</Button>
            <Button onClick={handleComplete} size="lg" disabled={!paymentComplete}>
              <Check className="mr-2 size-4" />
              Iniciar BCRM
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Pagamento */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl">Dados de Pagamento</DialogTitle>
            <DialogDescription>
              Preencha os dados do pagamento para ativar o plano {selectedPlanData?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-0 overflow-hidden">
            {/* Lado Esquerdo: Formulário de Pagamento */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 min-w-0 md:max-h-[calc(85vh-120px)]">
              {/* Método de pagamento */}
              <div className="mb-5">
                <p className="mb-2 font-medium text-sm">Método de Pagamento</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "card", label: "Cartão", icon: CreditCard },
                    { id: "pix", label: "PIX", icon: PixIcon },
                    { id: "boleto", label: "Boleto", icon: BoletoIcon },
                    { id: "transfer", label: "Transferência", icon: Banknote },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-center gap-2 rounded-lg border-2 p-3 text-xs transition-all ${
                        paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <m.icon className="size-4 text-muted-foreground" />
                      <span className="font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  {/* Bandeiras do cartão */}
                  <div className="mb-5">
                    <p className="mb-2 font-medium text-muted-foreground text-xs">Bandeiras aceitas</p>
                    <div className="flex items-center gap-2">
                      <VisaIcon className="h-6 w-auto rounded" />
                      <MastercardIcon className="h-6 w-auto rounded" />
                      <EloIcon className="h-6 w-auto rounded" />
                      <AmexIcon className="h-6 w-auto rounded" />
                      <HipercardIcon className="h-6 w-auto rounded" />
                    </div>
                  </div>

                  <FieldGroup className="gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="dialog-card-name">
                        Nome Completo
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="dialog-card-name" placeholder="Nome como impresso no cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="dialog-card-number">
                        Número do Cartão
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="dialog-card-number" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                        setCardNumber(v.substring(0, 19));
                      }} maxLength={19} />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="dialog-card-expiry">
                          Validade
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="dialog-card-expiry" placeholder="MM/AA" value={cardExpiry} onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length >= 2) v = `${v.substring(0, 2)}/${v.substring(2, 4)}`;
                          setCardExpiry(v.substring(0, 5));
                        }} maxLength={5} />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="dialog-card-cvc">
                          CVC
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="dialog-card-cvc" placeholder="000" value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))} maxLength={4} />
                      </Field>
                    </div>
                  </FieldGroup>

                  <div className="my-4">
                    <p className="mb-2 font-medium text-sm">Endereço de Cobrança</p>
                  </div>

                  <FieldGroup className="gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="dialog-pay-country">
                        País ou Região
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <select id="dialog-pay-country" value={country} onChange={(e) => setCountry(e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="dialog-pay-address">
                        Endereço
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="dialog-pay-address" placeholder="Rua, número, complemento" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="dialog-pay-city">
                          Cidade
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="dialog-pay-city" placeholder="Sua cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="dialog-pay-zip">
                          CEP
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="dialog-pay-zip" placeholder="00000-000" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                      </Field>
                    </div>
                  </FieldGroup>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 text-xs dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                    <Shield className="size-4 shrink-0" />
                    <p>Pagamento processado com segurança pela Stripe. Seus dados de cartão não são armazenados no nosso servidor.</p>
                  </div>
                </>
              )}

              {paymentMethod === "pix" && (
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="flex size-40 items-center justify-center rounded-lg border bg-white p-2">
                    <div className="size-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0id2hpdGUiLz48dGV4dCB4PSI2MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ09ERSA8L3RleHQ+PC9zdmc+')] bg-center bg-contain bg-no-repeat" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">PIX - Pagamento Instantâneo</p>
                    <p className="mt-1 text-muted-foreground text-xs">Escaneie o QR Code ou copie o código abaixo</p>
                    <p className="mt-2 max-w-xs break-all rounded bg-muted p-2 font-mono text-xs">00020126580014BR.GOV.BCB.PIX0136bcrm-replace-with-real-key52040000530398654040.015802BR5913BCRM TECNOLOGIA6009SAO PAULO62070503***6304ABCD</p>
                  </div>
                </div>
              )}

              {paymentMethod === "boleto" && (
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="text-center">
                    <p className="font-medium text-sm">Boleto Bancário</p>
                    <p className="mt-1 text-muted-foreground text-xs">O boleto será gerado após a confirmação. Prazo de até 3 dias úteis para compensação.</p>
                  </div>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div className="flex flex-col gap-4 py-6">
                  <div className="text-center">
                    <p className="font-medium text-sm">Transferência Bancária (TED/DOC)</p>
                    <p className="mt-1 text-muted-foreground text-xs">Os dados bancários serão exibidos após a confirmação.</p>
                  </div>
                  <div className="rounded-lg border p-3 text-sm">
                    <p><strong>Banco:</strong> 001 - Banco do Brasil</p>
                    <p><strong>Agência:</strong> 0000-0</p>
                    <p><strong>Conta:</strong> 00000-0</p>
                    <p><strong>CNPJ:</strong> 00.000.000/0001-00</p>
                    <p><strong>Favorecido:</strong> BCRM Tecnologia Ltda</p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={processing || (paymentMethod === "card" && !isCardFormValid)}
                  className="flex-1"
                >
                  {processing ? (
                    <>Processando...</>
                  ) : (
                    <>
                      <Wallet className="mr-2 size-4" />
                      Pagar {selectedPlanData?.price}{selectedPlanData?.period}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Lado Direito: Resumo do Plano */}
            <div className="flex flex-col gap-4 border-l bg-muted/30 px-6 py-6 w-full md:w-[380px] md:max-h-[calc(85vh-120px)] md:overflow-y-auto shrink-0">
              <div>
                <p className="mb-1 text-muted-foreground text-xs">Plano Selecionado</p>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-lg">{selectedPlanData?.name}</h4>
                  {selectedPlanData?.popular && (
                    <Badge className="text-xs">Mais Popular</Badge>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-bold text-2xl">{selectedPlanData?.price}</span>
                  <span className="text-muted-foreground text-sm">{selectedPlanData?.period}</span>
                </div>
                <p className="mt-1 text-muted-foreground text-xs">{selectedPlanData?.description}</p>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-muted-foreground text-xs">Recursos Inclusos</p>
                <ul className="flex flex-col gap-2">
                  {selectedPlanData?.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-3.5 shrink-0 text-green-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-muted-foreground text-xs">Configuração</p>
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Módulos ativos</span>
                    <span className="font-medium">{enabledModules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuários</span>
                    <span className="font-medium">{setupData.users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipes</span>
                    <span className="font-medium">{setupData.teams.length}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                <div className="flex items-center gap-2 text-green-800 text-xs dark:text-green-200">
                  <Shield className="size-4 shrink-0" />
                  <p>Pagamento seguro via Stripe. Cancele quando quiser.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
