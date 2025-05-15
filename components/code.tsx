import { promises as fs } from "fs";
import { BundledLanguage, codeToHtml } from "shiki";
import path from "path";

type CodeProps = {
  path: string;
  sub?: [number, number];
  lang?: BundledLanguage;
};

export async function Code({ path: filePath, lang, sub }: CodeProps) {
  if (!lang) {
    lang = "tsx";
  }

  const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
  const absolutePath = path.join(process.cwd(), relativePath);
  const content = await fs.readFile(absolutePath, "utf-8");
  const subContent = content.split("\n").slice(sub?.[0], sub?.[1]).join("\n");

  const out = await codeToHtml(subContent, {
    lang,
    theme: "github-light",
  });

  return (
    <div className="flex flex-col m-4">
      <h4 className="text-sm italic font-light ml-2 mb-1">
        {filePath} {sub ? `(lines ${sub[0] + 1}-${sub[1] + 1})` : ""}
      </h4>
      <div
        dangerouslySetInnerHTML={{ __html: out }}
        className="p-4 border rounded-md"
      />
    </div>
  );
}
