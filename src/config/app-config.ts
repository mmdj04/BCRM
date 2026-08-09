import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "BCRM",
  version: packageJson.version,
  copyright: `© ${currentYear}, BCRM.`,
  meta: {
    title: "BCRM - Painel de Administração",
    description:
      "BCRM é um painel de administração completo e moderno, construído com Next.js 16, Tailwind CSS v4 e shadcn/ui. Perfeito para aplicativos SaaS, painéis de administração e ferramentas internas - totalmente personalizável e pronto para produção.",
  },
};
