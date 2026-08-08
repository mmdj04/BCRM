import { ChangelogList } from "./_components/changelog-list";
import fs from "node:fs";
import path from "node:path";

function getChangelog(): string {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  return fs.readFileSync(filePath, "utf-8");
}

function parseChangelog(markdown: string) {
  const lines = markdown.split("\n");
  const entries: { version: string; date: string; content: string }[] = [];
  let current: { version: string; date: string; content: string } | null = null;

  for (const line of lines) {
    // Match "## Versão 1.0.0 — BCRM: ..." or "## Versão Agosto de 2026"
    const versionMatch = line.match(/^## Versão\s+(.+)/);
    if (versionMatch) {
      if (current) {
        entries.push(current);
      }
      const raw = versionMatch[1].trim();
      // Extract date if present (e.g. "Agosto de 2026" or "1.0.0 — BCRM: ...")
      const dateMatch = raw.match(/(\w+ de \d{4})/);
      current = {
        version: raw,
        date: dateMatch?.[1] || "Versão atual",
        content: "",
      };
      continue;
    }

    if (current && !line.startsWith("# ") && line !== "---") {
      current.content += `${line}\n`;
    }
  }

  if (current) {
    entries.push(current);
  }

  return entries.map((e) => ({
    ...e,
    content: e.content.trim(),
  }));
}

export default function ChangelogPage() {
  const markdown = getChangelog();
  const entries = parseChangelog(markdown);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Registro de Alterações</h1>
        <p className="text-muted-foreground text-sm">
          Todas as alterações notáveis neste projeto são documentadas aqui.
        </p>
      </div>

      <ChangelogList entries={entries} />
    </div>
  );
}
