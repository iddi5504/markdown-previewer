"use client";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import { MDXProvider } from "@mdx-js/react";

const components = { Button, Callout, Alert };

export default function MDXDemo() {
  const mdxContent = `
# Welcome to MDX Vibe Demo

<Callout type="info">
You can embed React components in your Markdown!
</Callout>

<Button onClick={() => alert('Vibe Mode!')}>Click me!</Button>

<Alert type="success">
This is a success alert inside MDX.
</Alert>
  `;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <MDXProvider components={components}>
        <div className="prose prose-lg">{mdxContent}</div>
      </MDXProvider>
    </div>
  );
}
