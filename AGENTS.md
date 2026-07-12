This codebase uses the [errore.org](https://errore.org/) convention.
ALWAYS read `.agents/skills/errore/SKILL.md` before editing any TypeScript.
Cursor rule: `.cursor/rules/errore.mdc`

## Toolchain (mise)

Use [mise](https://mise.jdx.dev/) for Bun and Go:

```bash
mise install   # bun + go from mise.toml
mise exec -- bun install
mise exec -- bun run dev
```

- **Bun** — package manager and scripts (`dev`, `build`, `lint`)
- **Go** — compiles lintcn rules (`lintcn lint`)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
