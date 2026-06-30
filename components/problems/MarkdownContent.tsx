"use client";

interface Props {
  content: string;
}

function convertMath(expr: string): string {
  return expr
    .replace(/\\leq\b/g, "≤")
    .replace(/\\geq\b/g, "≥")
    .replace(/\\neq\b/g, "≠")
    .replace(/\\cdot\b/g, "·")
    .replace(/\\times\b/g, "×")
    .replace(/\\infty\b/g, "∞")
    .replace(/\\ /g, " ")
    .replace(/\^{([^}]+)}/g, "<sup>$1</sup>")
    .replace(/_{([^}]+)}/g, "<sub>$1</sub>")
    .replace(/\^([0-9])/g, "<sup>$1</sup>")
    .replace(/_([a-zA-Z0-9])/g, "<sub>$1</sub>");
}

export function MarkdownContent({ content }: Props) {
  const html = content
    // Code blocks first (before other replacements)
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Inline math $...$ — convert LaTeX operators then wrap in styled span
    .replace(/\$([^$\n]+)\$/g, (_, expr) => `<span class="math-inline">${convertMath(expr)}</span>`)
    // Display math $$...$$
    .replace(/\$\$([^$]+)\$\$/g, (_, expr) => `<span class="math-display">${convertMath(expr)}</span>`)
    // Headings
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // Bold, inline code
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n/g, "</p><p>");

  return (
    <div
      className="prose-dark"
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
}
