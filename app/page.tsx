"use client";

import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { getStaticFileContent } from "@/lib/file-system";
import Image from "next/image";

export default function Home() {
  const [markdown, setMarkdown] = useState(
    `# Hello World\n\nType Markdown here...`
  );
  const [htmlPreview, setHtmlPreview] = useState("");

  useEffect(() => {
    handlePreview();
  }, [markdown]);

  const handlePreview = async () => {
    const processed = await remark().use(html).process(markdown);
    setHtmlPreview(processed.toString());
  };

  const handleDownload = () => {
    const blob = new Blob([htmlPreview], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preview.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        MDX Editor
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-slate-950">
            Markdown Editor
          </h2>
          <textarea
            className="flex-1 w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-50 text-gray-800 font-mono"
            value={markdown}
            rows={14}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Download HTML
            </button>
            <button
              onClick={() => {
                setMarkdown("");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-slate-950">
            Preview
          </h2>
          <div
            className="flex-1 overflow-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-slate-900 prose max-w-full"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      </div>

      {/* use my github readme.md button*/}
      <button
        onClick={async () => {
          const content = await getStaticFileContent(
            "/markdown_pages/github-readme.md"
          );
          setMarkdown(content);
        }}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-purple-600 transition mt-5"
      >
        <Image
          src="/icons/github.png"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="inline mx-2 invert mb-1"
        />
        Use my GitHub README.md
      </button>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        MDX Editor • Built with Next.js & Tailwind
      </footer>
    </div>
  );
}
