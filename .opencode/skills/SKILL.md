---
name: bcrm-project
description: BCRM admin dashboard — Next.js 16, React 19, shadcn/ui, Tailwind CSS v4, TypeScript. Use this skill for all work on the BCRM project including components, pages, themes, auth, database, Capacitor mobile, and deployment.
license: MIT
compatibility: opencode
metadata:
  framework: nextjs-16
  ui: shadcn-ui
  css: tailwind-v4
  language: typescript
  database: prisma-sqlite-postgresql
  mobile: capacitor
---

# BCRM Project Skill

Complete reference for working on the BCRM admin dashboard project.

## Project Overview

BCRM is a responsive admin dashboard built with **Next.js 16** (App Router), **React 19**, **TypeScript 5.9**, **Tailwind CSS v4**, and **shadcn/ui** (style: `radix-nova`). It supports local-first SQLite for mobile/desktop via Capacitor, PostgreSQL on Vercel for web, and Supabase for auth/subscription sync.

**Original template**: [arhamkhnz/next-shadcn-admin-dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, React Compiler enabled) |
| React | React 19 + React DOM 19 |
| Language | TypeScript 5.9 (strict mode) |
| CSS | Tailwind CSS v4 (`@tailwindcss/postcss`, no config file) |
| UI Library | shadcn/ui (`radix-nova` style, `radix` base) |
| Primitives | Radix UI v1.6.7 |
| Validation | Zod v4 |
| Forms | React Hook Form v7 + `@hookform/resolvers` |
| State | Zustand v5 (vanilla stores) |
| Tables | TanStack Table v9 |
| Charts | Recharts v3 |
| Icons | Lucide React + Simple Icons |
| Themes | next-themes + custom CSS variable presets (OKLCH) |
| DnD | @dnd-kit/react |
| Calendar | @fullcalendar/react |
| Drawer | Vaul |
| Toasts | Sonner |
| Date | date-fns + Temporal polyfill |
| Fonts | Geist (default) + 17 Google Fonts via `next/font/google` |
| Linting | Biome v2.5 (replaces ESLint + Prettier) |
| Git Hooks | Husky + lint-staged |
| Database | Prisma v7.9 (PostgreSQL via `@prisma/adapter-pg`) |
| Local DB | better-sqlite3 (Capacitor mobile/desktop) |
| Auth | jose (JWT) + bcryptjs |
| Payments | Stripe |
| Email | Resend |
| Mobile | Capacitor v8 (15+ plugins) |
| Analytics | @vercel/analytics |

## File Structure

```
BCRM/
├── src/
│   ├── app/
│   │   ├── (external)/          # Pages WITHOUT sidebar shell
│   │   │   └── page.tsx
│   │   ├── (main)/              # Pages WITH sidebar shell
│   │   │   ├── auth/            # Auth screens (v1/v2 login/register)
│   │   │   │   └── _components/ # Colocated auth components
│   │   │   ├── chat/
│   │   │   ├── dashboard/       # Main dashboard area
│   │   │   │   ├── _components/ # Shared dashboard components
│   │   │   │   │   ├── header/  # account-switcher, theme-switcher, layout-controls, search-dialog
│   │   │   │   │   └── sidebar/ # app-sidebar, nav-main, nav-user, support-card
│   │   │   │   ├── default/     # Default dashboard
│   │   │   │   ├── crm/         # CRM dashboard
│   │   │   │   ├── finance/     # Finance dashboard
│   │   │   │   ├── analytics/   # Analytics dashboard
│   │   │   │   ├── productivity/
│   │   │   │   ├── ecommerce/
│   │   │   │   ├── academy/
│   │   │   │   ├── logistics/
│   │   │   │   ├── infrastructure/
│   │   │   │   ├── file-manager/
│   │   │   │   ├── patient-monitoring/
│   │   │   │   ├── invoice/
│   │   │   │   ├── kanban/
│   │   │   │   ├── tasks/
│   │   │   │   ├── mail/
│   │   │   │   ├── users/
│   │   │   │   ├── roles/
│   │   │   │   ├── billing/
│   │   │   │   ├── notifications/
│   │   │   │   ├── profile/
│   │   │   │   ├── account/
│   │   │   │   ├── changelog/
│   │   │   │   ├── coming-soon/
│   │   │   │   ├── (legacy)/    # V1 dashboard variants
│   │   │   │   ├── layout.tsx   # Dashboard layout (sidebar + header)
│   │   │   │   └── page.tsx     # /dashboard root (redirects)
│   │   │   ├── mail/
│   │   │   ├── setup/           # Onboarding setup wizard
│   │   │   └── unauthorized/    # 403 page
│   │   ├── activate/            # Account activation (license key)
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # login, register, verify, demo
│   │   │   ├── license/         # activate
│   │   │   ├── payments/
│   │   │   ├── stripe/
│   │   │   ├── sync/
│   │   │   └── user/
│   │   ├── auth/                # OAuth callbacks
│   │   ├── globals.css          # Global styles + theme system
│   │   ├── layout.tsx           # Root layout
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                  # 61 shadcn/ui components (DO NOT MODIFY)
│   │   ├── calendar/            # Calendar components (DO NOT MODIFY)
│   │   ├── providers/
│   │   ├── capacitor-provider.tsx
│   │   ├── setup-guard.tsx
│   │   ├── loading-screen*.tsx
│   │   ├── payment-form.tsx
│   │   ├── stripe-provider.tsx
│   │   └── ...
│   ├── config/
│   │   ├── app-config.ts
│   │   └── demo-config.ts
│   ├── contexts/
│   │   └── setup-context.tsx
│   ├── hooks/                   # Custom hooks
│   ├── lib/
│   │   ├── auth/                # JWT, password, auth-context
│   │   ├── database/            # Prisma client, SQLite, migrations
│   │   ├── fonts/               # 17 Google Fonts registry
│   │   ├── license/             # License key validation
│   │   ├── preferences/         # Theme/layout preference system
│   │   ├── stripe/              # Stripe billing
│   │   ├── supabase/
│   │   ├── sync/                # Offline sync
│   │   └── utils.ts             # cn(), getInitials(), formatCurrency()
│   ├── middleware.ts            # Route protection
│   ├── navigation/
│   │   └── sidebar/
│   │       └── sidebar-items.ts # Navigation definition
│   ├── scripts/
│   │   ├── generate-theme-presets.ts
│   │   └── theme-boot.tsx
│   ├── stores/
│   │   └── preferences/
│   │       ├── preferences-store.ts
│   │       └── preferences-provider.tsx
│   └── styles/
│       └── presets/             # Theme preset CSS files
│           ├── brutalist.css
│           ├── soft-pop.css
│           └── tangerine.css
├── prisma/
│   └── schema.prisma            # 26+ models
├── android/                     # Capacitor Android project
├── www/                         # Web output for Capacitor
└── [config files]
```

## Theme System

### How It Works

Colors use **OKLCH** color space. Themes are controlled via `data-*` attributes on `<html>`:
- `data-theme-mode`: `light` | `dark` | `system`
- `data-theme-preset`: `default` | `brutalist` | `soft-pop` | `tangerine`
- `data-font`: 18 font keys (default: `geist`)
- `data-content-layout`: `centered` | `full-width`
- `data-navbar-style`: `sticky` | `scroll`
- `data-sidebar-variant`: `sidebar` | `inset` | `floating`
- `data-sidebar-collapsible`: `icon` | `offcanvas`

Dark mode uses `.dark` class toggled on `<html>`.

### Core CSS Tokens

```css
:root {
  --background, --foreground, --card, --primary, --secondary,
  --muted, --accent, --destructive, --border, --input, --ring
  --chart-1 through --chart-5
  --sidebar, --sidebar-foreground, --sidebar-primary, --sidebar-accent
}
```

### Theme Presets

Each preset is a CSS file in `src/styles/presets/` that overrides CSS variables:
- **Default**: Monochrome neutral, radius `0.625rem`
- **Brutalist**: High-contrast, zero border-radius, hard box-shadows
- **Soft Pop**: Rounded (`1rem`), colorful (purple primary, teal secondary)
- **Tangerine**: Warm orange primary, blue-tinted backgrounds

### Flash Prevention

`ThemeBootScript` in `src/scripts/theme-boot.tsx` runs in `<head>` before React hydration. It reads cookies and sets `data-*` attributes on `<html>` to prevent FOUC.

### Preference Persistence

- Layout-critical prefs (sidebar variant, collapsible): server-side cookies (SSR compatible)
- Theme mode, preset, font: client cookies
- Zustand vanilla store manages in-memory state

## Navigation / Sidebar

### Data Model

Defined in `src/navigation/sidebar/sidebar-items.ts`:

```typescript
interface NavGroup {
  id: number;
  label?: string;        // Section heading
  items: NavMainItem[];  // Links or parent items with subItems
}

type NavMainItem = NavMainLinkItem | NavMainParentItem;
// NavMainLinkItem: { id, title, url, icon?, badge?, disabled?, newTab? }
// NavMainParentItem: { id, title, icon?, subItems: NavSubItem[] }
```

### Sidebar Groups

1. **Paineis** (Dashboards) — 11 items
2. **Paginas** (Pages) — 10 items (Email, Chat, Calendar, Kanban, Tasks, Invoice, Billing, Users, Roles, Auth)
3. **Legado** (Legacy) — 4 V1 variants
4. **Diversos** (Misc) — Coming Soon

### Sidebar Components

- `app-sidebar.tsx` — Main wrapper using shadcn `Sidebar` primitives
- `nav-main.tsx` — Renders groups/items with collapsible parents
- `nav-user.tsx` — User profile dropdown at bottom
- `support-card.tsx` — WhatsApp contact card

## Auth Implementation

### JWT System (`src/lib/auth/jwt.ts`)

- Library: `jose` (standards-compliant)
- Algorithm: HS256
- Expiry: 7 days
- Payload: `{ userId, email, name, role }`
- Token stored in cookie: `bcrm_token`

### Password System (`src/lib/auth/password.ts`)

- Hashing: bcryptjs (12 salt rounds)
- Validation: 8+ chars, uppercase, lowercase, digit, special char

### Auth Context (`src/lib/auth/auth-context.tsx`)

React Context providing: `user`, `session`, `loading`, `isDemo`, `signIn`, `signUp`, `signOut`

### Account Status Flow

- `pending` → Requires activation (`/activate`)
- `active` → Normal access
- `grace_period` → 90-day grace after subscription expiry
- Expired grace → Account deleted

### Demo Mode

- Login: `admin@bcrm.com` / `10092004m`
- License key: `BCRM-DEMO-DEMO-DEMO-DEMO`
- Auto-filled in activation page

### Middleware (`src/middleware.ts`)

Protected paths: `/dashboard`, `/chat`, `/mail`
- Checks JWT in `Authorization` header or `bcrm_token` cookie
- Also checks `bcrm_demo_session` cookie
- Sets `x-user-*` headers for downstream use

## Database Pattern

### Prisma Schema

- 26+ models with sync fields (`supabaseId`, `isDirty`, `syncVersion`, `deletedAt`)
- PostgreSQL for Vercel, SQLite for Capacitor
- Lazy client initialization via Proxy pattern

### Key Models

User, Project, Team, Role, Permission, Contact, Deal, Task, Activity, Invoice, Product, Category, Transaction, Subscription, LicenseKey, etc.

## Layout Pattern

### Root Layout (`src/app/layout.tsx`)

```
<html data-theme-mode data-theme-preset data-content-layout data-navbar-style
      data-sidebar-variant data-sidebar-collapsible data-font>
  <head>ThemeBootScript</head>
  <body>
    LoadingScreen → CapacitorProvider → TooltipProvider → AuthProvider
      → PreferencesStoreProvider → {children} → Toaster → Analytics
```

### Dashboard Layout (`src/app/(main)/dashboard/layout.tsx`)

```
SetupGuard → SidebarProvider → AppSidebar + SidebarInset
  → <header> (SidebarTrigger + SearchDialog + LayoutControls + ThemeSwitcher + AccountSwitcher)
  → <div> (content area)
```

## Creating/Extending Screens

1. Inspect the nearest existing screen (Finance, Infrastructure, CRM, Analytics are good references)
2. Follow the visual direction closely from screenshots/images
3. Use existing components and theme tokens (never raw hex/RGB/OKLCH values)
4. Split into focused components in `_components/` directory
5. Keep `page.tsx` as Server Component by default
6. Add to `src/navigation/sidebar/sidebar-items.ts` for sidebar navigation
7. Use `@container/main` queries for responsive card layouts
8. Use `xl:grid-cols-12` grid system
9. Handle loading, empty, error, disabled, overflow states
10. Maintain accessibility (semantic HTML, keyboard, focus, ARIA)

## Code Conventions

- **TypeScript**: Strict mode, precise types, no `any`
- **Imports**: Use `@/` aliases
- **Biome**: Double quotes, semicolons, 2-space indent, 120-char line width
- **Commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- **Portuguese**: ALWAYS use proper diacritics (ç, á, é, ê, í, ó, ú, ã, õ)
- **Components**: Never modify `src/components/ui/` or `src/components/calendar/`
- **Git Push**: NEVER push unless user explicitly requests

## Available Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Biome lint
npm run format       # Biome format
npm run check        # Biome check
npm run check:fix    # Biome check + fix
npm run generate:presets  # Generate theme presets
```

## MCP Servers Configured

- **playwright**: Browser automation for testing
- **context7**: Documentation search
- **supabase**: Database management (disabled by default)
- **memory**: Persistent memory between sessions
- **fetch**: HTTP requests
- **sequential-thinking**: Step-by-step reasoning

## Capacitor Mobile

- 15+ plugins: Network, Camera, Filesystem, Preferences, Device, Share, Clipboard, Dialog, Haptics, StatusBar, Keyboard, SplashScreen, LocalNotifications, App, SQLite
- `CapacitorProvider` wraps entire app with native integrations
- Build: `npx cap sync android && cd android && ./gradlew assembleDebug`
- APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Important Rules

### DO NOT
- Modify files in `src/components/ui/` or `src/components/calendar/`
- Use raw hex, RGB, HSL, or OKLCH color values (use theme tokens or Tailwind named colors)
- Push to GitHub without explicit user request
- Assume libraries are available (check imports first)
- Add comments unless asked

### ALWAYS
- Inspect local component source before using it
- Use theme tokens for light/dark mode support
- Follow the co-location pattern (keep code near its route)
- Run `npm run check` after changes if requested
- Use proper Portuguese diacritics in UI text
