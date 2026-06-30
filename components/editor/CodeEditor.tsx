"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="h-full rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      <MonacoEditor
        height="100%"
        language="cpp"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          roundedSelection: true,
          automaticLayout: true,
          tabSize: 4,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}
