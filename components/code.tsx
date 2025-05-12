import { promises as fs } from "fs";
import { BundledLanguage, codeToHtml } from "shiki";
import path from "path";

export async function Code({
  path: filePath,
  lang,
  sub,
}: {
  path: string;
  sub?: [number, number];
  lang?: BundledLanguage;
}) {
  if (!lang) {
    lang = "tsx";
  }

  // Remove leading slash if present to make path relative
  const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
  const absolutePath = path.join(process.cwd(), relativePath);

  const content = await fs.readFile(absolutePath, "utf-8");
  const lines = content.split("\n");
  const subContent = lines.slice(sub?.[0], sub?.[1]).join("\n");
  const out = await codeToHtml(subContent, {
    lang,
    theme: "github-light",
  });

  return (
    <div className="flex flex-col m-4">
      <div
        dangerouslySetInnerHTML={{ __html: out }}
        className="p-4 border rounded-md"
      />
      <h4 className="text-sm italic font-light mt-2">
        {filePath} {sub ? `(lines ${sub[0] + 1}-${sub[1] + 1})` : ""}
      </h4>
    </div>
  );
}
