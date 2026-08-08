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
    const versionMatch = line.match(/^## \[(.+?)\]\s*(?:-\s*(\d{4}-\d{2}-\d{2}))?/);
    if (versionMatch) {
      if (current) {
        entries.push(current);
      }
      current = {
        version: versionMatch[1],
        date: versionMatch[2] || "Em desenvolvimento",
        content: "",
      };
      continue;
    }

    if (current && !line.startsWith("# Changelog") && !line.startsWith("---")) {
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
