import { File, FileArchive, FileChartColumn, FileImage, FileText } from "lucide-react";

export type FileKind = "document" | "spreadsheet" | "design" | "pdf" | "archive";
export type FileManagerView = "grid" | "list";

export const fileIcons = {
  archive: FileArchive,
  design: FileImage,
  document: FileText,
  pdf: File,
  spreadsheet: FileChartColumn,
} satisfies Record<FileKind, typeof File>;

export const fileKindLabels: Record<FileKind, string> = {
  archive: "Arquivo",
  design: "Design",
  document: "Documento",
  pdf: "PDF",
  spreadsheet: "Planilha",
};

export interface FileManagerFolder {
  id: string;
  name: string;
  fileCount: number;
  size: string;
  updatedAt: string;
}

export interface FileManagerFile {
  id: string;
  name: string;
  kind: FileKind;
  size: string;
  owner: string;
  ownerInitials: string;
  modifiedAt: string;
  shared: boolean;
  starred: boolean;
}

export const folders: FileManagerFolder[] = [
  {
    id: "brand-assets",
    name: "Ativos da marca",
    fileCount: 24,
    size: "1.8 GB",
    updatedAt: "há 12 min",
  },
  {
    id: "product-design",
    name: "Design do produto",
    fileCount: 38,
    size: "4.6 GB",
    updatedAt: "Ontem",
  },
  {
    id: "legal-documents",
    name: "Documentos jurídicos",
    fileCount: 16,
    size: "840 MB",
    updatedAt: "29 de jul.",
  },
  {
    id: "research",
    name: "Pesquisa",
    fileCount: 11,
    size: "620 MB",
    updatedAt: "27 de jul.",
  },
  {
    id: "marketing",
    name: "Marketing",
    fileCount: 29,
    size: "2.3 GB",
    updatedAt: "25 de jul.",
  },
  {
    id: "team-resources",
    name: "Recursos da equipe",
    fileCount: 18,
    size: "1.2 GB",
    updatedAt: "22 de jul.",
  },
];

export const files: FileManagerFile[] = [
  {
    id: "product-roadmap",
    name: "Roteiro do produto 2027.pdf",
    kind: "pdf",
    size: "8.4 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "há 5 minutos",
    shared: true,
    starred: true,
  },
  {
    id: "design-system",
    name: "Fundamentos do sistema de design.fig",
    kind: "design",
    size: "24.1 MB",
    owner: "Aiy",
    ownerInitials: "AY",
    modifiedAt: "há 2 horas",
    shared: true,
    starred: false,
  },
  {
    id: "campaign-performance",
    name: "Desempenho da campanha.xlsx",
    kind: "spreadsheet",
    size: "2.7 MB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "Ontem",
    shared: false,
    starred: false,
  },
  {
    id: "research-notes",
    name: "Notas de pesquisa do cliente.docx",
    kind: "document",
    size: "1.2 MB",
    owner: "Aiy",
    ownerInitials: "AY",
    modifiedAt: "29 de jul. de 2026",
    shared: true,
    starred: true,
  },
  {
    id: "release-assets",
    name: "Ativos do lançamento.zip",
    kind: "archive",
    size: "186 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "28 de jul. de 2026",
    shared: false,
    starred: false,
  },
  {
    id: "handoff-checklist",
    name: "Lista de verificação de entrega.pdf",
    kind: "pdf",
    size: "940 KB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "26 de jul. de 2026",
    shared: true,
    starred: false,
  },
  {
    id: "quarterly-budget",
    name: "Previsão orçamentária trimestral.xlsx",
    kind: "spreadsheet",
    size: "3.8 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "24 de jul. de 2026",
    shared: true,
    starred: false,
  },
  {
    id: "mobile-app-prototype",
    name: "Protótipo do aplicativo móvel.fig",
    kind: "design",
    size: "18.6 MB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "23 de jul. de 2026",
    shared: true,
    starred: true,
  },
  {
    id: "partnership-agreement",
    name: "Contrato de parceria.docx",
    kind: "document",
    size: "620 KB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "21 de jul. de 2026",
    shared: false,
    starred: false,
  },
  {
    id: "product-launch-brief",
    name: "Briefing do lançamento do produto.pdf",
    kind: "pdf",
    size: "4.2 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "19 de jul. de 2026",
    shared: true,
    starred: false,
  },
  {
    id: "brand-exports",
    name: "Exportações da marca.zip",
    kind: "archive",
    size: "72 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "17 de jul. de 2026",
    shared: false,
    starred: false,
  },
];
