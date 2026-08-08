import {
  AlertTriangleIcon,
  ArrowUp,
  Ban,
  CheckCircle2,
  Droplets,
  Flame,
  Forklift,
  type LucideIcon,
  PackageCheck,
  PenLine,
  ShieldCheck,
  Snowflake,
  Star,
  Thermometer,
  Truck,
} from "lucide-react";

export type ShipmentStatus =
  | "Agendado"
  | "Em Trânsito"
  | "Saiu para Entrega"
  | "Entregue"
  | "Atrasado"
  | "Em Espera"
  | "Retido na Alfândega";

export type TransportMode = "land" | "air" | "sea";
export type RouteType = "road" | "flight" | "ship";
export type CustomerTier = "Prioritário" | "Padrão" | "Não Prioritário";

export type GeoCoordinate = [longitude: number, latitude: number];

export type ShipmentLocation = {
  coordinates: GeoCoordinate;
  display: string;
  country: string;
  countryCode: string;
};

export type ShipmentCustomer = {
  name: string;
  initials: string;
  id: string;
  tier: CustomerTier;
  tierLabel: string;
};

export type HandlingTag = {
  label: string;
  icon: LucideIcon;
};

export type ShipmentHandling = {
  label: string;
  note: string;
  tags: HandlingTag[];
};

export type Shipment = {
  id: string;
  customer: ShipmentCustomer;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  cargo: string;
  handling: ShipmentHandling;
  weight: string;
  eta: string;
  etaMeta: string;
  status: ShipmentStatus;
  progress: number;
  mode: TransportMode;
  routeType: RouteType;
  transportNumber: string;
};

const customerAccounts = {
  techCorp: {
    name: "TechCorp",
    initials: "TC",
    id: "SDA-1001-2401-01",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  regionalRoadExpress: {
    name: "Regional Road Express",
    initials: "RR",
    id: "SDA-1002-2402-02",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  sendWell: {
    name: "SendWell B.V.",
    initials: "SW",
    id: "SDA-1003-2403-03",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  sourceDay: {
    name: "SourceDay",
    initials: "SD",
    id: "SDA-1004-2404-04",
    tier: "Padrão",
    tierLabel: "Conta de envios recorrentes",
  },
  shippingEasy: {
    name: "ShippingEasy",
    initials: "SE",
    id: "SDA-1005-2405-05",
    tier: "Padrão",
    tierLabel: "Conta de envios recorrentes",
  },
  freightView: {
    name: "FreightView",
    initials: "FV",
    id: "SDA-1006-2406-06",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  logisticsPlus: {
    name: "Logistics Plus",
    initials: "LP",
    id: "SDA-1007-2407-07",
    tier: "Padrão",
    tierLabel: "Conta de frete gerenciado",
  },
  transvirtual: {
    name: "Transvirtual",
    initials: "TV",
    id: "SDA-1008-2408-08",
    tier: "Padrão",
    tierLabel: "Conta de frete gerenciado",
  },
  skyTrack: {
    name: "SkyTrack",
    initials: "ST",
    id: "SDA-1009-2409-09",
    tier: "Não Prioritário",
    tierLabel: "Conta de envios ocasionais",
  },
  maersk: {
    name: "Maersk",
    initials: "MK",
    id: "SDA-1010-2410-10",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  flexport: {
    name: "Flexport",
    initials: "FX",
    id: "SDA-1011-2411-11",
    tier: "Prioritário",
    tierLabel: "Top 1% em volume de envios",
  },
  piedPiper: {
    name: "Pied Piper",
    initials: "PP",
    id: "SDA-1012-2412-12",
    tier: "Não Prioritário",
    tierLabel: "Conta de envios ocasionais",
  },
} satisfies Record<string, ShipmentCustomer>;

export const shipments: Shipment[] = [
  {
    id: "SDA-01-2401",
    customer: customerAccounts.techCorp,
    origin: {
      display: "CGK Airport",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [106.6429036, -6.1238696],
    },
    destination: {
      display: "SIN Airport",
      country: "Singapura",
      countryCode: "SG",
      coordinates: [103.9949824, 1.3510921],
    },
    cargo: "Eletrônicos de Consumo",
    handling: {
      label: "Eletrônicos frágeis",
      note: "Mantenha a embalagem lacrada até a entrega.",
      tags: [
        { label: "Não empilhe", icon: Ban },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "2,450 kg",
    eta: "08:45 AM",
    etaMeta: "Hoje",
    status: "Em Trânsito",
    progress: 65,
    mode: "air",
    routeType: "flight",
    transportNumber: "GA-884",
  },
  {
    id: "SDA-02-2402",
    customer: customerAccounts.regionalRoadExpress,
    origin: {
      display: "Surabaya",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [112.7377674, -7.2462836],
    },
    destination: {
      display: "Semarang",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [110.4229104, -6.9903988],
    },
    cargo: "Maquinário Industrial",
    handling: {
      label: "Maquinário pesado",
      note: "Fixe o maquinário à base da paleta antes do despacho rodoviário.",
      tags: [
        { label: "Somente empilhadeira", icon: Forklift },
        { label: "Fixe a carga", icon: ShieldCheck },
        { label: "Não vire", icon: Ban },
      ],
    },
    weight: "8,120 kg",
    eta: "11:20 AM",
    etaMeta: "Amanhã",
    status: "Atrasado",
    progress: 42,
    mode: "land",
    routeType: "road",
    transportNumber: "B 9042 KX",
  },
  {
    id: "SDA-03-2403",
    customer: customerAccounts.sendWell,
    origin: {
      display: "Tanjung Priok Port",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [106.8805674, -6.1045642],
    },
    destination: {
      display: "Port of Singapore",
      country: "Singapura",
      countryCode: "SG",
      coordinates: [103.7566, 1.2788],
    },
    cargo: "Frutos do Mar Congelados",
    handling: {
      label: "Controle de temperatura",
      note: "Mantenha a cadeia de frio em -18°C ou abaixo até a entrega no porto.",
      tags: [
        { label: "Registro de temperatura", icon: Thermometer },
        { label: "Mantenha congelado", icon: Snowflake },
        { label: "Selo intacto", icon: ShieldCheck },
      ],
    },
    weight: "19,800 kg",
    eta: "09:15 PM",
    etaMeta: "Entregue Ontem",
    status: "Entregue",
    progress: 100,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV SEA-318",
  },
  {
    id: "SDA-04-2404",
    customer: customerAccounts.maersk,
    origin: {
      display: "KUL Airport",
      country: "Malásia",
      countryCode: "MY",
      coordinates: [101.7063995, 2.7431274],
    },
    destination: {
      display: "BKK Airport",
      country: "Tailândia",
      countryCode: "TH",
      coordinates: [100.7485803, 13.6818767],
    },
    cargo: "Kits Farmacêuticos",
    handling: {
      label: "Controle de temperatura",
      note: "Mantenha a temperatura controlada e verifique a liberação da alfândega antes de despachar.",
      tags: [
        { label: "Registro de temperatura", icon: Thermometer },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "540 kg",
    eta: "06:10 PM",
    etaMeta: "Hoje",
    status: "Em Espera",
    progress: 28,
    mode: "air",
    routeType: "flight",
    transportNumber: "MH-728",
  },
  {
    id: "SDA-05-2405",
    customer: customerAccounts.sourceDay,
    origin: {
      display: "Bandung",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [107.6070833, -6.9218457],
    },
    destination: {
      display: "Yogyakarta",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [110.3672845, -7.7953473],
    },
    cargo: "Têxteis",
    handling: {
      label: "Frete padrão",
      note: "Mantenha as caixas secas e longe da luz solar direta.",
      tags: [
        { label: "Mantenha seco", icon: Droplets },
        { label: "Não esmague", icon: Ban },
        { label: "Entrega padrão", icon: PackageCheck },
      ],
    },
    weight: "1,380 kg",
    eta: "09:30 AM",
    etaMeta: "Sexta-feira",
    status: "Agendado",
    progress: 12,
    mode: "land",
    routeType: "road",
    transportNumber: "D 1284 YA",
  },
  {
    id: "SDA-06-2406",
    customer: customerAccounts.logisticsPlus,
    origin: {
      display: "Port Klang",
      country: "Malásia",
      countryCode: "MY",
      coordinates: [101.3913589, 2.9996963],
    },
    destination: {
      display: "Laem Chabang Port",
      country: "Tailândia",
      countryCode: "TH",
      coordinates: [100.8994177, 13.0734119],
    },
    cargo: "Materiais de Construção",
    handling: {
      label: "Carga a granel pesada",
      note: "Carregue com equipamento de elevação pesada e fixe contra deslocamentos.",
      tags: [
        { label: "Elevação pesada", icon: Forklift },
        { label: "Fixe a carga", icon: ShieldCheck },
        { label: "Não empilhe", icon: Ban },
      ],
    },
    weight: "27,400 kg",
    eta: "03:40 PM",
    etaMeta: "Saindo Hoje",
    status: "Agendado",
    progress: 18,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV LC-204",
  },
  {
    id: "SDA-07-2407",
    customer: customerAccounts.flexport,
    origin: {
      display: "HKG Airport",
      country: "Hong Kong",
      countryCode: "HK",
      coordinates: [113.9172999, 22.3125986],
    },
    destination: {
      display: "MNL Airport",
      country: "Filipinas",
      countryCode: "PH",
      coordinates: [121.0219223, 14.5122467],
    },
    cargo: "Dispositivos Médicos",
    handling: {
      label: "Equipamento médico sensível",
      note: "Mantenha os dispositivos médicos lacrados até a inspeção aduaneira.",
      tags: [
        { label: "Selo intacto", icon: ShieldCheck },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "860 kg",
    eta: "Pending",
    etaMeta: "Alfândega",
    status: "Retido na Alfândega",
    progress: 33,
    mode: "air",
    routeType: "flight",
    transportNumber: "CX-901",
  },
  {
    id: "SDA-08-2408",
    customer: customerAccounts.shippingEasy,
    origin: {
      display: "Jakarta",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [106.827168, -6.1754049],
    },
    destination: {
      display: "Bandung",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [107.6070833, -6.9218457],
    },
    cargo: "Vestuário de Varejo",
    handling: {
      label: "Frete padrão",
      note: "Mantenha as caixas secas e ligue para o destinatário antes da entrega final.",
      tags: [
        { label: "Mantenha seco", icon: Droplets },
        { label: "Ligue antes da entrega", icon: Truck },
        { label: "Entrega padrão", icon: PackageCheck },
      ],
    },
    weight: "620 kg",
    eta: "02:15 PM",
    etaMeta: "Hoje",
    status: "Saiu para Entrega",
    progress: 88,
    mode: "land",
    routeType: "road",
    transportNumber: "B 7712 JKT",
  },
  {
    id: "SDA-09-2409",
    customer: customerAccounts.freightView,
    origin: {
      display: "Shanghai Port",
      country: "China",
      countryCode: "CN",
      coordinates: [121.4872194, 31.2219444],
    },
    destination: {
      display: "Busan Port",
      country: "Coreia do Sul",
      countryCode: "KR",
      coordinates: [129.0492086, 35.1177052],
    },
    cargo: "Peças Automotivas",
    handling: {
      label: "Peças industriais",
      note: "Fixe as paletas e proteja superfícies usinadas contra umidade.",
      tags: [
        { label: "Fixe a carga", icon: ShieldCheck },
        { label: "Mantenha seco", icon: Droplets },
        { label: "Somente empilhadeira", icon: Forklift },
      ],
    },
    weight: "12,200 kg",
    eta: "05:50 PM",
    etaMeta: "Quarta-feira",
    status: "Em Trânsito",
    progress: 54,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV BUSAN-54",
  },
  {
    id: "SDA-10-2410",
    customer: customerAccounts.techCorp,
    origin: {
      display: "NRT Airport",
      country: "Japão",
      countryCode: "JP",
      coordinates: [140.3933101, 35.7758714],
    },
    destination: {
      display: "ICN Airport",
      country: "Coreia do Sul",
      countryCode: "KR",
      coordinates: [126.4417093, 37.4634593],
    },
    cargo: "Wafers de Semicondutores",
    handling: {
      label: "Carga frágil de alto valor",
      note: "Mantenha os wafers lacrados em embalagem com proteção contra impactos até a entrega com assinatura.",
      tags: [
        { label: "Não empilhe", icon: Ban },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "320 kg",
    eta: "08:30 PM",
    etaMeta: "Entregue Ontem",
    status: "Entregue",
    progress: 100,
    mode: "air",
    routeType: "flight",
    transportNumber: "KE-704",
  },
  {
    id: "SDA-11-2411",
    customer: customerAccounts.sourceDay,
    origin: {
      display: "Kuala Lumpur",
      country: "Malásia",
      countryCode: "MY",
      coordinates: [101.6942371, 3.1516964],
    },
    destination: {
      display: "Penang",
      country: "Malásia",
      countryCode: "MY",
      coordinates: [100.3287352, 5.4141619],
    },
    cargo: "Ingredientes Alimentícios",
    handling: {
      label: "Manuseio alimentício",
      note: "Mantenha os selos alimentícios intactos e evite contaminação cruzada.",
      tags: [
        { label: "Alimentício", icon: PackageCheck },
        { label: "Selo intacto", icon: ShieldCheck },
        { label: "Mantenha seco", icon: Droplets },
      ],
    },
    weight: "3,950 kg",
    eta: "01:05 PM",
    etaMeta: "Hoje",
    status: "Em Trânsito",
    progress: 71,
    mode: "land",
    routeType: "road",
    transportNumber: "WQH 2184",
  },
  {
    id: "SDA-12-2412",
    customer: customerAccounts.transvirtual,
    origin: {
      display: "Cebu Port",
      country: "Filipinas",
      countryCode: "PH",
      coordinates: [123.9174564, 10.3054355],
    },
    destination: {
      display: "Davao Port",
      country: "Filipinas",
      countryCode: "PH",
      coordinates: [125.6627111, 7.1265272],
    },
    cargo: "Produtos Agrícolas",
    handling: {
      label: "Produtos perecíveis",
      note: "Priorize a ventilação e inspecione a condição dos produtos na entrega no porto.",
      tags: [
        { label: "Perecível", icon: Thermometer },
        { label: "Porão ventilado", icon: PackageCheck },
        { label: "Inspecione na chegada", icon: CheckCircle2 },
      ],
    },
    weight: "6,700 kg",
    eta: "09:40 AM",
    etaMeta: "Sexta-feira",
    status: "Atrasado",
    progress: 39,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV DAVAO-12",
  },
  {
    id: "SDA-13-2413",
    customer: customerAccounts.flexport,
    origin: {
      display: "SIN Airport",
      country: "Singapura",
      countryCode: "SG",
      coordinates: [103.9949824, 1.3510921],
    },
    destination: {
      display: "DPS Airport",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [115.1673704, -8.746515],
    },
    cargo: "Produtos de Luxo",
    handling: {
      label: "Carga de alto valor",
      note: "Mantenha as caixas lacradas; libere apenas para o contato autorizado de recebimento.",
      tags: [
        { label: "Alto valor", icon: Star },
        { label: "Não empilhe", icon: Ban },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "210 kg",
    eta: "07:15 AM",
    etaMeta: "Segunda-feira",
    status: "Agendado",
    progress: 9,
    mode: "air",
    routeType: "flight",
    transportNumber: "SQ-938",
  },
  {
    id: "SDA-14-2414",
    customer: customerAccounts.sendWell,
    origin: {
      display: "Port of Manila",
      country: "Filipinas",
      countryCode: "PH",
      coordinates: [120.9522815, 14.6038906],
    },
    destination: {
      display: "Tanjung Priok Port",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [106.8805674, -6.1045642],
    },
    cargo: "Rolos de Papel",
    handling: {
      label: "Carga sensível a umidade",
      note: "Mantenha os rolos secos e evite impacto nas bordas durante a descarga.",
      tags: [
        { label: "Mantenha seco", icon: Droplets },
        { label: "Não vire", icon: Ban },
        { label: "Somente empilhadeira", icon: Forklift },
      ],
    },
    weight: "15,900 kg",
    eta: "Awaiting Release",
    etaMeta: "Galpão",
    status: "Em Espera",
    progress: 25,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV PRI-77",
  },
  {
    id: "SDA-15-2415",
    customer: customerAccounts.skyTrack,
    origin: {
      display: "Medan",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [98.6741623, 3.5894617],
    },
    destination: {
      display: "Pekanbaru",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [101.4515727, 0.5262455],
    },
    cargo: "Estoque de Bebidas",
    handling: {
      label: "Frete paletizado padrão",
      note: "Mantenha as paletas na vertical e previna o esmagamento das caixas durante o transporte rodoviário.",
      tags: [
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Não empilhe", icon: Ban },
        { label: "Entrega padrão", icon: PackageCheck },
      ],
    },
    weight: "4,500 kg",
    eta: "03:30 PM",
    etaMeta: "Hoje",
    status: "Agendado",
    progress: 16,
    mode: "land",
    routeType: "road",
    transportNumber: "BK 4520 RA",
  },
  {
    id: "SDA-16-2416",
    customer: customerAccounts.regionalRoadExpress,
    origin: {
      display: "BOM Airport",
      country: "Índia",
      countryCode: "IN",
      coordinates: [72.8638223, 19.0901376],
    },
    destination: {
      display: "DEL Airport",
      country: "Índia",
      countryCode: "IN",
      coordinates: [77.0847985, 28.5553942],
    },
    cargo: "Componentes Automotivos",
    handling: {
      label: "Peças industriais",
      note: "Fixe as caixas e inspecione as faixas das paletas antes da entrega final.",
      tags: [
        { label: "Fixe a carga", icon: ShieldCheck },
        { label: "Somente empilhadeira", icon: Forklift },
        { label: "Inspecione na chegada", icon: CheckCircle2 },
      ],
    },
    weight: "780 kg",
    eta: "04:10 PM",
    etaMeta: "Hoje",
    status: "Saiu para Entrega",
    progress: 84,
    mode: "air",
    routeType: "flight",
    transportNumber: "AI-864",
  },
  {
    id: "SDA-17-2417",
    customer: customerAccounts.logisticsPlus,
    origin: {
      display: "Rotterdam Port",
      country: "Países Baixos",
      countryCode: "NL",
      coordinates: [4.4298268, 51.904333],
    },
    destination: {
      display: "Hamburg Port",
      country: "Alemanha",
      countryCode: "DE",
      coordinates: [9.9118353, 53.5279971],
    },
    cargo: "Materiais de Embalagem",
    handling: {
      label: "Frete padrão",
      note: "Mantenha as paletas secas e verifique a contagem na descarga.",
      tags: [
        { label: "Mantenha seco", icon: Droplets },
        { label: "Contagem na chegada", icon: CheckCircle2 },
        { label: "Entrega padrão", icon: PackageCheck },
      ],
    },
    weight: "21,300 kg",
    eta: "Next Week",
    etaMeta: "Terça-feira",
    status: "Em Trânsito",
    progress: 62,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV HAM-902",
  },
  {
    id: "SDA-18-2418",
    customer: customerAccounts.transvirtual,
    origin: {
      display: "Ho Chi Minh City",
      country: "Vietnã",
      countryCode: "VN",
      coordinates: [106.7166008, 10.7737261],
    },
    destination: {
      display: "Da Nang",
      country: "Vietnã",
      countryCode: "VN",
      coordinates: [108.212, 16.068],
    },
    cargo: "Eletrodomésticos",
    handling: {
      label: "Produtos frágeis e volumosos",
      note: "Use manuseio de duas pessoas e mantenha os eletrodomésticos na vertical até a entrega.",
      tags: [
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Não empilhe", icon: Ban },
        { label: "Elevação de duas pessoas", icon: Truck },
      ],
    },
    weight: "2,060 kg",
    eta: "11:40 AM",
    etaMeta: "Entregue Hoje",
    status: "Entregue",
    progress: 100,
    mode: "land",
    routeType: "road",
    transportNumber: "51C-208.44",
  },
  {
    id: "SDA-19-2419",
    customer: customerAccounts.maersk,
    origin: {
      display: "DXB Airport",
      country: "Emirados Árabes Unidos",
      countryCode: "AE",
      coordinates: [55.3666519, 25.2515424],
    },
    destination: {
      display: "JED Airport",
      country: "Arábia Saudita",
      countryCode: "SA",
      coordinates: [39.1634852, 21.6839754],
    },
    cargo: "Produtos com Controle de Temperatura",
    handling: {
      label: "Controle de temperatura",
      note: "Mantenha a faixa de temperatura e escale exceções de atraso imediatamente.",
      tags: [
        { label: "Registro de temperatura", icon: Thermometer },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Escale atraso", icon: AlertTriangleIcon },
      ],
    },
    weight: "1,120 kg",
    eta: "10:50 PM",
    etaMeta: "Hoje à Noite",
    status: "Atrasado",
    progress: 47,
    mode: "air",
    routeType: "flight",
    transportNumber: "SV-591",
  },
  {
    id: "SDA-20-2420",
    customer: customerAccounts.freightView,
    origin: {
      display: "Nhava Sheva Port",
      country: "Índia",
      countryCode: "IN",
      coordinates: [72.952661, 18.9470339],
    },
    destination: {
      display: "Colombo Port",
      country: "Sri Lanka",
      countryCode: "LK",
      coordinates: [79.8564409, 6.9646289],
    },
    cargo: "Bobinas de Aço",
    handling: {
      label: "Carga a granel pesada",
      note: "Use suportes para bobinas e confirme as amarrações antes da liberação.",
      tags: [
        { label: "Elevação pesada", icon: Forklift },
        { label: "Fixe a carga", icon: ShieldCheck },
        { label: "Não vire", icon: Ban },
      ],
    },
    weight: "31,800 kg",
    eta: "06:00 AM",
    etaMeta: "Quinta-feira",
    status: "Agendado",
    progress: 14,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV COL-620",
  },
  {
    id: "SDA-21-2421",
    customer: customerAccounts.piedPiper,
    origin: {
      display: "Chiang Mai",
      country: "Tailândia",
      countryCode: "TH",
      coordinates: [98.9858802, 18.7882778],
    },
    destination: {
      display: "Bangkok",
      country: "Tailândia",
      countryCode: "TH",
      coordinates: [100.4935089, 13.7524938],
    },
    cargo: "Móveis",
    handling: {
      label: "Produtos frágeis e volumosos",
      note: "Use cobertura com blanket e evite empilhamento em superfícies acabadas.",
      tags: [
        { label: "Não empilhe", icon: Ban },
        { label: "Mantenha seco", icon: Droplets },
        { label: "Elevação de duas pessoas", icon: Truck },
      ],
    },
    weight: "5,240 kg",
    eta: "08:20 AM",
    etaMeta: "Amanhã",
    status: "Em Trânsito",
    progress: 58,
    mode: "land",
    routeType: "road",
    transportNumber: "กท 8842",
  },
  {
    id: "SDA-22-2422",
    customer: customerAccounts.techCorp,
    origin: {
      display: "KIX Airport",
      country: "Japão",
      countryCode: "JP",
      coordinates: [135.222523, 34.4342045],
    },
    destination: {
      display: "TPE Airport",
      country: "Taiwan",
      countryCode: "TW",
      coordinates: [121.2345977, 25.0793174],
    },
    cargo: "Ferramentas de Precisão",
    handling: {
      label: "Carga de alto valor",
      note: "Mantenha o estojo trancado lacrado até a liberação de segurança.",
      tags: [
        { label: "Retenção de segurança", icon: ShieldCheck },
        { label: "Selo intacto", icon: ShieldCheck },
        { label: "Assinatura necessária", icon: PenLine },
      ],
    },
    weight: "430 kg",
    eta: "Pending",
    etaMeta: "Segurança",
    status: "Em Espera",
    progress: 29,
    mode: "air",
    routeType: "flight",
    transportNumber: "BR-129",
  },
  {
    id: "SDA-23-2423",
    customer: customerAccounts.maersk,
    origin: {
      display: "Port of Singapore",
      country: "Singapura",
      countryCode: "SG",
      coordinates: [103.7566, 1.2788],
    },
    destination: {
      display: "Port Klang",
      country: "Malásia",
      countryCode: "MY",
      coordinates: [101.3913589, 2.9996963],
    },
    cargo: "Químicos",
    handling: {
      label: "Revisão de materiais perigosos",
      note: "Retenha até a revisão de materiais perigosos e liberação portuária.",
      tags: [
        { label: "Revisão de materiais perigosos", icon: Flame },
        { label: "Mantenha na vertical", icon: ArrowUp },
        { label: "Manuseio restrito", icon: ShieldCheck },
      ],
    },
    weight: "18,600 kg",
    eta: "Departing",
    etaMeta: "02:50 PM",
    status: "Agendado",
    progress: 19,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV PKG-315",
  },
  {
    id: "SDA-24-2424",
    customer: customerAccounts.shippingEasy,
    origin: {
      display: "Bandar Lampung",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [105.2643742, -5.4460713],
    },
    destination: {
      display: "Jakarta",
      country: "Indonésia",
      countryCode: "ID",
      coordinates: [106.827168, -6.1754049],
    },
    cargo: "Produtos Frescos",
    handling: {
      label: "Produtos perecíveis",
      note: "Priorize a entrega no mesmo dia e mantenha os produtos ventilados.",
      tags: [
        { label: "Perecível", icon: Thermometer },
        { label: "Porão ventilado", icon: PackageCheck },
        { label: "Inspecione na chegada", icon: CheckCircle2 },
      ],
    },
    weight: "970 kg",
    eta: "06:20 PM",
    etaMeta: "Entregue Hoje",
    status: "Entregue",
    progress: 100,
    mode: "land",
    routeType: "road",
    transportNumber: "BE 1745 YU",
  },
];
