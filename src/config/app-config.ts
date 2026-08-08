import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Studio Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    title: "Studio Admin - Modelo Inicial de Dashboard Next.js Moderno",
    description:
      "Studio Admin é um modelo inicial de dashboard moderno e de código aberto, construído com Next.js 16, Tailwind CSS v4 e shadcn/ui. Perfeito para aplicativos SaaS, painéis de administração e ferramentas internas - totalmente personalizável e pronto para produção.",
  },
};
