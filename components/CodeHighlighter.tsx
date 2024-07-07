"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

// components
import { Button } from "@/components/ui/button";

// icons
import { Clipboard } from "lucide-react";
import { ClipboardCheck } from "lucide-react";

interface CodeHighlighterProps {
  language: string;
  children: string;
}

const CodeHighlighter = ({ language, children }: CodeHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        })
        .catch((err) => {
          console.error("Something went wrong");
        });
    }
  };
  return (
    <div className="my-2 overflow-hidden w-full">
      <div className="rounded-t-lg flex items-center justify-between p-4">
        <span className="font-semibold">{language}</span>
        <Button
          variant="ghost"
          onClick={() => copyToClipboard(children)}
          disabled={copied}
        >
          {copied ? (
            <ClipboardCheck className="w-4 h-4" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
        </Button>
      </div>
      <div className="mt-1">
        <SyntaxHighlighter style={xonokai} language={language}>
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeHighlighter;
