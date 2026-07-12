import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs leading-relaxed",
        className,
      )}
    >
      {code}
    </pre>
  );
}
